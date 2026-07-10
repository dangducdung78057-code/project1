# 架构决策

## 单仓库、单领域模型、三种渲染模式

```text
统一 StageEditorState
├── dot-sketch   免费 Canvas 黑点草图
├── stage-2.5d   会员 PixiJS 2.5D
└── stage-3d     会员 R3F/Three.js
```

三种模式共用：

- performers
- groups
- positions
- appearance
- formation
- stage
- keyframes
- schedule
- projectVersion

## 权益

免费：
- 黑点草图
- 4 个基础模板
- 一个当前快照
- 基础倒排计划
- 黑点 PNG

会员：
- 完整 2.5D
- 3D 验证
- 人物、服装、色卡、台阶、灯光、道具
- 关键帧和走位
- 遮挡、安全和冲突诊断
- 多版本与高清导出
- 高级倒排计划

定制：
- 更高人数
- 省级及以上人工服务
- 专属素材与方案审定
