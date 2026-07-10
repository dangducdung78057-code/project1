# StageOS 功能状态表

> 状态标注：`implemented` 已实现并验证 / `partial` 部分实现 / `planned` 已规划未实现
> 更新日期：2026-07-10

## 第一阶段（10 项）

| # | 功能 | 状态 | 说明 |
|---|------|------|------|
| 1 | 迁入 /app 主线并可构建运行 | implemented | typecheck / 100 测试 / build 全绿，预览可用 |
| 2 | 去 mock 化文案 | implemented | 全部 "mock" 用户可见文案替换为"本地规则引擎"，快照 mode 显示统一走 `formatPlanMode` |
| 3 | 统一 Zod Schema | implemented | `src/domain/stageos/schemas.ts`：米制坐标 / 队形 / 外观 / 倒排 / 权益 Schema 全量补齐 |
| 4 | 本地规则生成默认路径 | implemented | `generateLocalPlan` 替代 `generateMockPlan` 成为默认生成引擎，AI 失败自动回退 |
| 5 | 黑点草图编辑器 | implemented | `/stage-editor`：拖拽站位、8 套模板（含 4 套会员锁定）、PNG/JSON 导出、云端保存 |
| 6 | PixiJS 2.5D 舞台视图 | partial | 视图 / LED 屏 / 台阶 / 程序化人形精灵 / 匿名编号+身高标注已实现；正式服装精灵素材待美术资产（用程序化绘制代替） |
| 7 | 米制坐标统一 | implemented | `StagePosition {x, z, riserLevel}` 贯穿黑点草图与 2.5D，同一 store 共享 |
| 8 | Outfit Manifest | implemented | `src/domain/stageos/outfits.ts`：套装清单 + 颜色槽位 + 按性别/角色分配规则 |
| 9 | 倒排计划 | implemented | 免费只读清单 + 会员甘特图 / 自动重排（依赖约束 + 缓冲日），13 条标准任务链 |
| 10 | 服务端权益校验 | partial | `user_entitlements` 表（RLS 本人只读、仅 service_role 可写）+ 前端 `useEntitlements` 同步已实现；迁移因 Supabase 项目不可访问尚未执行 |

## 基础设施

| 项 | 状态 | 说明 |
|----|------|------|
| Supabase 迁移（18+2 个） | planned | 原项目已不可访问（DNS 解析失败），等待重连新项目后执行 `node scripts/run-migrations.mjs` |
| Edge Functions 部署 | planned | 代码齐备（ai-generate-plan / plan-precheck / 邮件队列等），需 Supabase CLI 部署 |
| CI 检查 | implemented | `pnpm check`（typecheck + lint + test + build）本地全绿；新增代码 lint 零错误（存量代码遗留约 290 个历史 lint 问题，不阻塞构建） |
| 隐私硬约束 | implemented | 匿名编号（S01…）、不采集姓名/照片、页面隐私说明、per-user RLS 设计 |

## 待办（Supabase 重连后）

1. 在 v0 设置中重新连接可用的 Supabase 项目
2. 运行 `node scripts/run-migrations.mjs` 执行全部迁移（含 formation_snapshots 与 user_entitlements）
3. 用 Supabase CLI 部署 Edge Functions
4. 验证登录 → 保存队形 → 服务端权益读取全链路
