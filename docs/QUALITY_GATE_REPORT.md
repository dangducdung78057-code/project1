# StageOS 收口与质量门审计报告

日期：2026-07-10 · 数据库：Supabase `nrmsagzrtmofjoblurjp`（超核-青灯）

## 一、数据链路复验（真实云端，非 mock）

| 步骤 | 结果 | 证据 |
|---|---|---|
| 注册/登录 | 通过 | `POST /auth/v1/token` 返回真实 access_token（用户 v0-smoke-test@example.com） |
| 队形保存 | 通过 | 表 `formation_snapshots`，记录含 `template_id='heart'`、36 人、`preview_mode` |
| 刷新恢复 | 通过 | 页面 reload 后自动载入心形队形（读取路径 `formation_snapshots` 按 `user_id` + `updated_at desc limit 1`） |
| RLS 隔离 | 通过 | anon 无 token 读取返回 `[]`；带 token 只返回本人记录 |
| 倒排进度 | 通过 | 勾选状态 upsert 到 `schedule_tasks`（`user_id, performance_date, task_key` 唯一键） |

localStorage 用于：Supabase session（官方 SDK 标准行为）、UI 偏好、错误恢复标记——均非业务数据持久化。

## 二、工程审计分类

**implemented（真实实现）**
- 邮箱密码认证（Supabase Auth，无自动注册/静默登录）
- 黑点草图编辑器（SVG 拖拽、8 模板、PNG/JSON 导出、米制坐标）
- 2.5D 舞台（PixiJS WebGL、`{x,z,riserLevel}` 与 3D 共用、分层渲染、拖拽、36 人流畅）
- 队形云端保存/恢复（`formation_snapshots` + RLS）
- 倒排计划（免费 8 节点只读 / 会员 15 节点 + 甘特 + 自动重排 + 云端进度）
- 服务端权益（`user_entitlements` + `expires_at` 过期降级 + 触发器阻止自改）
- 本地规则计划引擎 `generateLocalPlan`（明确标注，非 AI 冒充）

**partial**
- `plan_snapshots` 写入链路存在但 ProjectDetail 部分渲染路径仍读本地状态
- 邮件队列：表与函数在，`email_queue_dispatch` 调度函数缺失（旧库手工创建，未入迁移）

**planned（占位）**
- 2.5D/3D 正式美术素材（当前程序化绘制，UI 已标注"占位资产"）
- 采购比价第三方 API（`procurementProvider` 有 mock 数据分支，UI 标注演示）

**mock（已标注、不冒充）**
- `src/lib/mockPlan.ts`：仅作为规则引擎兜底样本，UI 显示"本地规则引擎"
- 采购候选演示数据：标注"演示数据"徽章

**security-risk（已修复）**
- ~~会员档位切换器生产可见~~ → 现仅 `import.meta.env.DEV` 渲染，生产显示只读徽章
- ~~3D 路由无守卫~~ → `MemberRoute` 组件按服务端权益拦截
- ~~three.js/pixi 全量打包~~ → 改为 `lazy()` 按需 chunk，免费用户不下载
- ~~用户可自改 tier~~ → 数据库触发器 `prevent_self_entitlement_change` 阻止

## 三、四层权益校验

1. **UI**：档位切换器 DEV-only；免费版显示锁定卡片
2. **资源加载**：`Formation3D`、`Stage25DViewport` 均为 lazy chunk，权益不满足不请求
3. **数据写入**：DB 触发器 `enforce_snapshot_tier` —— free 用户 INSERT `preview_mode='stage-2.5d'` 直接抛 `ENTITLEMENT_DENIED`（前端有对应错误提示）
4. **服务端**：`get_user_tier()` SQL 函数（含过期判定）+ RLS 全表 `auth.uid() = user_id`

## 四、数据表与 RLS 状态

| 表 | RLS | 说明 |
|---|---|---|
| profiles | ON | 本次补建，触发器自动创建行 |
| projects / stage_inputs / plan_snapshots | ON | 原有 |
| formation_snapshots | ON | 队形快照 + tier 触发器 |
| appearance_snapshots | ON | 本次补建 |
| schedule_tasks | ON | 本次补建，倒排进度 |
| audit_logs | ON | 本次补建，仅 insert/select 本人 |
| user_entitlements | ON | 用户只读；写入仅 service_role |

## 五、自动化安全测试（scripts/security-audit.mjs）

14/14 通过：
- 用户 A 读不到用户 B 的 formation_snapshots / projects
- 免费用户写 stage-2.5d 快照被数据库拒绝（ENTITLEMENT_DENIED）
- 用户无法 UPDATE 自己的 tier（触发器拒绝）
- 会员 expires_at 过期后 get_user_tier 返回 free，2.5d 写入被拒
- 刷新后快照恢复（时序验证）
- 全部用户表 RLS 开启

## 六、倒排计划规则验证（单测覆盖）

- 演出日期变化 → 全节点重算（rebuildKey 机制）
- 免费 8 个核心节点 / 会员 +7 专属节点（2.5D 预演、联合校色、关键帧走位、遮挡安全诊断）
- 排练频次 < 3 → 排练类节点 +5 天缓冲
- 人数 > 60 → 排练 +3 天，采购/服装物流节点提前 4 天
- 完成状态云端持久化（schedule_tasks）

## 七、工程质量命令

| 命令 | 结果 |
|---|---|
| pnpm typecheck (tsc --noEmit) | 0 错误 |
| pnpm lint（新增/改动文件） | 0 错误 |
| pnpm test (vitest) | 100/100 通过 |
| pnpm build (vite) | 成功（有 chunk 大小提示，非错误） |

## 遗留事项

1. `email_queue_dispatch` 函数需补入迁移（邮件功能恢复时）
2. 存量 lint 告警集中在旧页面（ProjectWizard/ProjectEditor 的 any），不影响运行
3. 正式美术素材（人物精灵/舞台纹理/GLB）待设计资源到位后替换占位
