// 前端入口:StageOS 舞台场景规则(室内剧场 LED 礼堂)。
// 单一事实来源在 supabase/functions/_shared/stage-scene-rules.ts,
// 与 ai-generate-plan 边缘函数共用,保证 AI prompt 与前端展示同一套规则。
export {
  LED_RULES,
  FORMATION_SAFETY,
  TRANSITION_RULES,
  INDOOR_THEATER_CONSTRAINTS,
  retrieveSceneRules,
  compileSceneRuleContext,
} from "../../supabase/functions/_shared/stage-scene-rules";
export type {
  LedRule,
  FormationSafetyRule,
  SceneRuleRetrieval,
} from "../../supabase/functions/_shared/stage-scene-rules";
