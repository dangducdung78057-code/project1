/**
 * One-off migration runner for the connected Supabase project.
 * Reads POSTGRES_URL_NON_POOLING from .env.development.local (v0/Vercel integration)
 * and applies supabase/migrations/*.sql in filename order.
 *
 * Each migration runs inside a transaction. Progress is tracked in
 * public._stageos_migrations so re-runs are idempotent.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

function loadEnv() {
  if (process.env.POSTGRES_URL_NON_POOLING) return process.env.POSTGRES_URL_NON_POOLING;
  const envText = readFileSync(resolve(process.cwd(), ".env.development.local"), "utf8");
  const match = envText.match(/^POSTGRES_URL_NON_POOLING="?([^"\n]+)"?$/m);
  if (!match) throw new Error("POSTGRES_URL_NON_POOLING not found");
  return match[1];
}

async function main() {
  const client = new pg.Client({ connectionString: loadEnv(), ssl: { rejectUnauthorized: false } });
  await client.connect();

  await client.query(`
    create table if not exists public._stageos_migrations (
      name text primary key,
      applied_at timestamptz not null default now(),
      status text not null default 'applied',
      note text
    );
  `);

  // Best-effort: enable extensions the migrations rely on.
  for (const ext of ["pgmq", "pg_cron", "pg_net"]) {
    try {
      await client.query(`create extension if not exists ${ext}`);
      console.log(`extension ${ext}: ok`);
    } catch (e) {
      console.log(`extension ${ext}: unavailable (${e.message.split("\n")[0]})`);
    }
  }

  const dir = resolve(process.cwd(), "supabase/migrations");
  const files = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
  const { rows } = await client.query("select name, status from public._stageos_migrations");
  const done = new Map(rows.map((r) => [r.name, r.status]));

  let applied = 0, skipped = 0, failed = 0;
  for (const file of files) {
    if (done.get(file) === "applied") { skipped++; continue; }
    const sql = readFileSync(resolve(dir, file), "utf8");
    try {
      await client.query("begin");
      await client.query(sql);
      await client.query(
        "insert into public._stageos_migrations(name,status) values($1,'applied') on conflict(name) do update set status='applied', note=null, applied_at=now()",
        [file],
      );
      await client.query("commit");
      console.log(`APPLIED  ${file}`);
      applied++;
    } catch (e) {
      await client.query("rollback");
      const note = e.message.split("\n")[0].slice(0, 300);
      await client.query(
        "insert into public._stageos_migrations(name,status,note) values($1,'failed',$2) on conflict(name) do update set status='failed', note=$2, applied_at=now()",
        [file, note],
      );
      console.log(`FAILED   ${file}\n         ${note}`);
      failed++;
    }
  }

  console.log(`\nSummary: ${applied} applied, ${skipped} skipped, ${failed} failed (of ${files.length})`);
  await client.end();
  process.exit(failed > 0 ? 2 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
