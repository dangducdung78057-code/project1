import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function fail(message) {
  return { ok: false, message };
}

export function verifySitemapRobots({ robotsText, sitemapText }) {
  const sitemapDirectives = [...robotsText.matchAll(/^\s*Sitemap:\s*(\S+)\s*$/gim)].map((match) => match[1]);
  if (sitemapDirectives.length === 0) return fail("robots.txt 缺少 `Sitemap:` 指令。");
  if (new Set(sitemapDirectives).size > 1) {
    return fail(`robots.txt 声明了多个不同的 Sitemap URL：${sitemapDirectives.join(", ")}`);
  }

  let robotsSitemap;
  try {
    robotsSitemap = new URL(sitemapDirectives[0]);
  } catch {
    return fail(`robots.txt 中的 Sitemap URL 非法：${sitemapDirectives[0]}`);
  }
  if (robotsSitemap.pathname !== "/sitemap.xml") {
    return fail(`robots.txt Sitemap 指向 ${robotsSitemap.pathname}，但项目中的 sitemap 位于 /sitemap.xml。`);
  }

  const uaBlocks = robotsText.split(/^\s*User-agent:/gim).slice(1);
  for (const block of uaBlocks) {
    const [firstLine, ...rest] = block.split("\n");
    if (firstLine.trim() === "*" && /^\s*Disallow:\s*\/\s*$/im.test(rest.join("\n"))) {
      return fail("robots.txt 对 `User-agent: *` 使用 `Disallow: /` 全站屏蔽，却同时声明了 Sitemap，配置自相矛盾。");
    }
  }

  const locs = [...sitemapText.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) => match[1]);
  if (locs.length === 0) return fail("sitemap.xml 未包含任何 <loc> 条目。");
  const mismatched = [];
  for (const loc of locs) {
    let url;
    try {
      url = new URL(loc);
    } catch {
      return fail(`sitemap.xml 中存在非法 URL：${loc}`);
    }
    if (url.origin !== robotsSitemap.origin) {
      mismatched.push(loc);
    }
  }
  if (mismatched.length > 0) {
    return fail(
      `sitemap.xml 中以下 URL 与 robots.txt Sitemap 域名 (${robotsSitemap.origin}) 不一致：\n${mismatched
        .map((loc) => `  - ${loc}`)
        .join("\n")}`,
    );
  }

  return { ok: true, message: "", count: locs.length, origin: robotsSitemap.origin };
}

function main() {
  const root = resolve(process.cwd());
  const robotsPath = resolve(root, "public/robots.txt");
  const sitemapPath = resolve(root, "public/sitemap.xml");
  const result = verifySitemapRobots({
    robotsText: readFileSync(robotsPath, "utf8"),
    sitemapText: readFileSync(sitemapPath, "utf8"),
  });
  if (!result.ok) {
    console.error(`[verify-sitemap-robots] ✗ ${result.message}`);
    process.exit(1);
  }
  console.log(`[verify-sitemap-robots] ✓ ${result.origin}，共 ${result.count} 条 URL。`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
