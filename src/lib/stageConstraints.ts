// 前端入口:StageOS 反向约束系统(单一事实来源在 supabase/functions/_shared/stage-constraints.ts,
// 与 ai-generate-plan 边缘函数共用,保证 AI prompt 与前端校验提示使用同一套 65 条规则)。
export {
  STAGE_CONSTRAINTS,
  retrieveConstraints,
  compileConstraintContext,
  inferEngineThemes,
  inferStageType,
} from "../../supabase/functions/_shared/stage-constraints";
export type {
  ConstraintLevel,
  ConstraintScope,
  ConstraintRule,
  ConstraintQuery,
  ConstraintRetrieval,
} from "../../supabase/functions/_shared/stage-constraints";
