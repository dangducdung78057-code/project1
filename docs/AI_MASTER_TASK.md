# AI 开发总任务书

## 唯一目标

把 `/app` 改造成可上线的 StageOS / 艺演助手，而不是继续增加孤立页面和占位功能。

最终流程：

```text
新建项目
→ 录入演出资料
→ 隐私确认
→ 规则预检
→ 本地规则/AI增强生成完整方案
→ 免费黑点草图或会员 2.5D 编排
→ 会员 3D 空间验证
→ 服装、色卡、道具和背景
→ 保存不可变版本
→ 全版本倒排计划
→ 确认与导出
```

## 技术栈不可更换

- Vite + React + TypeScript
- Supabase Auth / PostgreSQL / Storage / Edge Functions
- Zustand
- Zod
- Canvas 2D：免费黑点草图
- PixiJS/WebGL：会员 2.5D
- React Three Fiber + Three.js：会员 3D
- Vitest + Playwright
- pnpm
- Vercel

## 第一阶段必须完成

1. 删除“mock 计划已生成”的正式文案与状态。
2. 统一 StageInput、StagePlan、Formation、Appearance、Schedule 和 Entitlements Schema。
3. 本地规则生成器成为无 Token 默认路径。
4. 免费版黑点草图可拖拽、保存、导出。
5. 会员版 2.5D 使用 PixiJS，不使用 SVG。
6. 2.5D/3D 共用米制 `{x,z,riserLevel}` 坐标。
7. 建立服装 Outfit/Sprite Manifest。
8. 建立全版本倒排计划，会员增加依赖、缓冲、甘特和自动重排。
9. 服务端验证会员权限，不能只隐藏按钮。
10. 建立 CI 和 Vercel 预览部署。

## 功能状态规则

- `implemented`: 页面、代码、数据库、测试、错误处理均存在。
- `partial`: 有真实代码但未完成完整路径。
- `planned`: 只有方案或占位。

禁止把接口名、按钮或静态卡片视为已实现功能。

## 隐私硬约束

- 学生仅用匿名编号、身高、性别、角色和分组。
- 上传资料、学生录入、生成预览和导出前必须显示隐私说明。
- 默认退出后删除上传资料，可由用户选择保留。
- 不展示学生真实面部。
- RLS 按 user_id 隔离。
