// StageOS 安全与 RLS 自动化验收
// 运行：node --env-file-if-exists=.env.development.local scripts/security-audit.mjs
// 覆盖：跨用户隔离 / 免费档 2.5D 拒绝 / 权益表不可自改 / 会员过期降级 / 快照恢复

import { Client } from "pg";

const BASE = "https://nrmsagzrtmofjoblurjp.supabase.co";
const ANON = "sb_publishable_FzUu2qwzJWe2Q4n4NZu-qA_p6byWpdy"; // publishable key（公开安全）
const PG_URL = process.env.STAGEOS_POSTGRES_URL;
if (!PG_URL) {
  console.error("缺少 STAGEOS_POSTGRES_URL 环境变量");
  process.exit(1);
}

const PASSWORD = "RlsAudit123!";
const USER_A = "rls-audit-a@example.com";
const USER_B = "rls-audit-b@example.com";

let passed = 0;
let failed = 0;
function check(name, ok, detail = "") {
  if (ok) {
    passed += 1;
    console.log(`PASS  ${name}`);
  } else {
    failed += 1;
    console.log(`FAIL  ${name}${detail ? ` -- ${detail}` : ""}`);
  }
}

async function api(path, { method = "GET", token = ANON, body, headers = {} } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      apikey: ANON,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    /* empty body */
  }
  return { status: res.status, json };
}

async function ensureUser(email) {
  const login = await api("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: { email, password: PASSWORD },
  });
  if (login.json?.access_token) return login.json;
  const signup = await api("/auth/v1/signup", { method: "POST", body: { email, password: PASSWORD } });
  if (signup.json?.access_token) return signup.json;
  throw new Error(`无法登录/注册 ${email}: ${JSON.stringify(signup.json).slice(0, 120)}`);
}

const pg = new Client({ connectionString: PG_URL, ssl: { rejectUnauthorized: false } });
await pg.connect();

const a = await ensureUser(USER_A);
const b = await ensureUser(USER_B);
const aId = a.user.id;
const bId = b.user.id;

// 重置测试状态
await pg.query("delete from public.formation_snapshots where user_id in ($1,$2)", [aId, bId]);
await pg.query("delete from public.user_entitlements where user_id in ($1,$2)", [aId, bId]);
await pg.query("delete from public.schedule_tasks where user_id in ($1,$2)", [aId, bId]);

const perf = JSON.stringify([{ id: "S01", position: { x: 0, z: 2, riserLevel: 0 } }]);
const stage = JSON.stringify({ widthM: 12, depthM: 8, riserLevels: 2, ledTitle: "RLS 审计", backgroundColor: "#123456" });

// 1) B 写入一条快照；A 不能读到
const insB = await api("/rest/v1/formation_snapshots", {
  method: "POST",
  token: b.access_token,
  headers: { Prefer: "return=representation" },
  body: { user_id: bId, title: "B 的快照", preview_mode: "dot-sketch", stage: JSON.parse(stage), performers: JSON.parse(perf) },
});
check("用户 B 可写入自己的快照", insB.status === 201, `status=${insB.status} ${JSON.stringify(insB.json).slice(0, 100)}`);

const aReadsB = await api(`/rest/v1/formation_snapshots?select=id&user_id=eq.${bId}`, { token: a.access_token });
check("用户 A 看不到用户 B 的快照", Array.isArray(aReadsB.json) && aReadsB.json.length === 0, JSON.stringify(aReadsB.json).slice(0, 100));

// 2) 匿名读取被拒
const anonRead = await api("/rest/v1/formation_snapshots?select=id");
check("匿名无法读取任何快照", Array.isArray(anonRead.json) && anonRead.json.length === 0, JSON.stringify(anonRead.json).slice(0, 100));

// 3) 免费用户（A 无权益记录）写入 stage-2.5d 快照被服务端拒绝
const free25d = await api("/rest/v1/formation_snapshots", {
  method: "POST",
  token: a.access_token,
  body: { user_id: aId, title: "越权 2.5D", preview_mode: "stage-2.5d", stage: JSON.parse(stage), performers: JSON.parse(perf) },
});
check(
  "免费用户写入 stage-2.5d 被 ENTITLEMENT_DENIED 拒绝",
  free25d.status >= 400 && JSON.stringify(free25d.json).includes("ENTITLEMENT_DENIED"),
  `status=${free25d.status} ${JSON.stringify(free25d.json).slice(0, 120)}`,
);

// 4) 免费用户超出演员上限（41 人 > 40）被拒
const manyPerf = JSON.stringify(Array.from({ length: 41 }, (_, i) => ({ id: `S${i}`, position: { x: 0, z: 1, riserLevel: 0 } })));
const overLimit = await api("/rest/v1/formation_snapshots", {
  method: "POST",
  token: a.access_token,
  body: { user_id: aId, title: "超限", preview_mode: "dot-sketch", stage: JSON.parse(stage), performers: JSON.parse(manyPerf) },
});
check(
  "免费用户超出演员上限被拒",
  overLimit.status >= 400 && JSON.stringify(overLimit.json).includes("ENTITLEMENT_DENIED"),
  `status=${overLimit.status}`,
);

// 5) 用户不可自改会员档位（user_entitlements 无 insert/update 策略）
const selfUpgradeIns = await api("/rest/v1/user_entitlements", {
  method: "POST",
  token: a.access_token,
  body: { user_id: aId, tier: "custom", max_performers: 300 },
});
check("用户无法为自己插入权益记录", selfUpgradeIns.status >= 400, `status=${selfUpgradeIns.status}`);

await pg.query(
  "insert into public.user_entitlements (user_id, tier, max_performers) values ($1, 'member', 120) on conflict (user_id) do update set tier='member', max_performers=120, expires_at=null",
  [aId],
);
const selfUpgradeUpd = await api(`/rest/v1/user_entitlements?user_id=eq.${aId}`, {
  method: "PATCH",
  token: a.access_token,
  headers: { Prefer: "return=representation" },
  body: { tier: "custom" },
});
const updBlocked = selfUpgradeUpd.status >= 400 || (Array.isArray(selfUpgradeUpd.json) && selfUpgradeUpd.json.length === 0);
check("用户无法修改自己的会员档位", updBlocked, `status=${selfUpgradeUpd.status} ${JSON.stringify(selfUpgradeUpd.json).slice(0, 80)}`);

// 6) 会员可写入 stage-2.5d
const member25d = await api("/rest/v1/formation_snapshots", {
  method: "POST",
  token: a.access_token,
  headers: { Prefer: "return=representation" },
  body: { user_id: aId, title: "会员 2.5D", preview_mode: "stage-2.5d", stage: JSON.parse(stage), performers: JSON.parse(perf) },
});
check("会员可写入 stage-2.5d 快照", member25d.status === 201, `status=${member25d.status} ${JSON.stringify(member25d.json).slice(0, 100)}`);

// 7) 会员过期立即降级：expires_at 置为过去 → 再写 2.5d 被拒
await pg.query("update public.user_entitlements set expires_at = now() - interval '1 day' where user_id = $1", [aId]);
const expired25d = await api("/rest/v1/formation_snapshots", {
  method: "POST",
  token: a.access_token,
  body: { user_id: aId, title: "过期后 2.5D", preview_mode: "stage-2.5d", stage: JSON.parse(stage), performers: JSON.parse(perf) },
});
check(
  "会员过期后写入 stage-2.5d 立即被拒（服务端降级）",
  expired25d.status >= 400 && JSON.stringify(expired25d.json).includes("ENTITLEMENT_DENIED"),
  `status=${expired25d.status}`,
);

// 8) 快照恢复：A 读回自己的会员快照
const aRestore = await api(`/rest/v1/formation_snapshots?select=title,preview_mode,performers&user_id=eq.${aId}&order=created_at.desc&limit=1`, {
  token: a.access_token,
});
const row = Array.isArray(aRestore.json) ? aRestore.json[0] : null;
check(
  "刷新/重登后快照可恢复（读回内容一致）",
  row?.title === "会员 2.5D" && row?.preview_mode === "stage-2.5d" && Array.isArray(row?.performers) && row.performers.length === 1,
  JSON.stringify(row).slice(0, 120),
);

// 9) schedule_tasks 跨用户隔离
const schedIns = await api("/rest/v1/schedule_tasks", {
  method: "POST",
  token: b.access_token,
  body: { user_id: bId, performance_date: "2026-08-30", task_key: "正式演出", title: "正式演出", due_date: "2026-08-30", completed: true },
});
check("用户 B 可写入自己的倒排任务状态", schedIns.status === 201, `status=${schedIns.status}`);
const aReadsSched = await api(`/rest/v1/schedule_tasks?select=id&user_id=eq.${bId}`, { token: a.access_token });
check("用户 A 看不到用户 B 的倒排任务", Array.isArray(aReadsSched.json) && aReadsSched.json.length === 0);

// 10) audit_logs 不可篡改（无 update 策略）
const audIns = await api("/rest/v1/audit_logs", {
  method: "POST",
  token: a.access_token,
  headers: { Prefer: "return=representation" },
  body: { user_id: aId, action: "security-audit", detail: { by: "scripts/security-audit.mjs" } },
});
check("审计日志可写入", audIns.status === 201, `status=${audIns.status}`);
const audId = Array.isArray(audIns.json) ? audIns.json[0]?.id : null;
if (audId) {
  const audUpd = await api(`/rest/v1/audit_logs?id=eq.${audId}`, {
    method: "PATCH",
    token: a.access_token,
    headers: { Prefer: "return=representation" },
    body: { action: "tampered" },
  });
  const tamperBlocked = audUpd.status >= 400 || (Array.isArray(audUpd.json) && audUpd.json.length === 0);
  check("审计日志不可被用户篡改", tamperBlocked, `status=${audUpd.status}`);
}

// 清理权益，恢复 A 为免费档
await pg.query("delete from public.user_entitlements where user_id = $1", [aId]);
await pg.end();

console.log(`\n结果：${passed} 通过 / ${failed} 失败`);
process.exit(failed > 0 ? 1 : 0);
