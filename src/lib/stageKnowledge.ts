// 前端入口:StageOS 内置舞台知识库(单一事实来源在 supabase/functions/_shared/stage-knowledge.ts,
// 与 ai-generate-plan 边缘函数共用,保证 AI prompt 与 mock 兜底、队形快选使用同一套语料)。
export {
  STAGE_KNOWLEDGE,
  UNIVERSAL_FORMATIONS,
  retrieveStageKnowledge,
  compileKnowledgeContext,
  resolveColorHex,
  COLOR_NAME_HEX,
} from "../../supabase/functions/_shared/stage-knowledge";
export type {
  FormationTemplate,
  CostumeStyle,
  ColorPalette,
  ProgramKnowledge,
  KnowledgeRetrieval,
} from "../../supabase/functions/_shared/stage-knowledge";
