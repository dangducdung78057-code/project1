import type { StageInputData } from "@/lib/stageos";
import { generateMockPlan } from "@/lib/mockPlan";
import { retrieveStageKnowledge } from "@/lib/stageKnowledge";
import { retrieveConstraints } from "@/lib/stageConstraints";
import { getPaletteForProgram, PALETTE_VERSION } from "@/lib/paletteLibrary";
import { stageInputSchema } from "@/domain/stageos/schemas";
import type { ConstraintNotice, GeneratedStagePlan, VisualPlan } from "@/domain/stageos/plan";

const PLAN_SCHEMA_VERSION = "1.0.0";
const KNOWLEDGE_VERSION = "stage-knowledge-embedded-2026-07";
const CONSTRAINT_VERSION = "stage-constraints-65";

function toConstraintNotices(input: StageInputData): ConstraintNotice[] {
  const result = retrieveConstraints({
    schoolStage: input.schoolStage,
    programType: input.programType,
    programTheme: input.programTheme,
    stageDescription: input.venueType,
  });

  return [...result.hardBlocks, ...result.softWarns, ...result.infoNotes].map((rule) => ({
    ruleId: rule.rule_id,
    level: rule.level,
    scope: rule.scope,
    reason: rule.reason,
    alternative: rule.alternative ?? undefined,
  }));
}

function buildVisualPlan(input: StageInputData): VisualPlan {
  const knowledge = retrieveStageKnowledge({
    programType: input.programType,
    performerCount: input.performerCount,
    screenThemeColor: input.screenThemeColor,
    programTheme: input.programTheme,
  });
  const fallbackFormation = knowledge.formations[0];
  const formation = input.confirmedFormation
    ? {
        name: input.confirmedFormation.layoutName || fallbackFormation.name,
        summary: input.confirmedFormation.summary || fallbackFormation.summary,
        rows: input.confirmedFormation.rows || fallbackFormation.rows,
        spacingRule: input.confirmedFormation.spacingRule || fallbackFormation.spacingRule,
        tips: fallbackFormation.tips,
      }
    : {
        name: fallbackFormation.name,
        summary: fallbackFormation.summary,
        rows: fallbackFormation.rows,
        spacingRule: fallbackFormation.spacingRule,
        tips: fallbackFormation.tips,
      };

  const palette = getPaletteForProgram(input.programType ?? "");
  const venueType = input.venueType?.trim() || "室内舞台";
  const lightingStyle = input.lightingStyle?.trim() || "暖色正面光 + 低强度轮廓光";
  const screenThemeColor = input.screenThemeColor?.trim() || palette[0]?.hex || "#F5F1E8";
  const isLargeGroup = (input.performerCount ?? 0) >= 36;
  const isMotionHeavy = [
    "classical_dance",
    "folk_dance",
    "modern_jazz_street",
    "ballet",
    "cheerleading",
    "sports_opening_ceremony",
    "acrobatics_martial_arts",
  ].includes(input.programType ?? "");

  return {
    palette,
    formation,
    stage: {
      venueType,
      screenThemeColor,
      lightingStyle,
      backgroundGuidance: isLargeGroup
        ? "背景保持大色块、低密度纹理和清晰中轴，避免与多人队形争夺视觉焦点。"
        : "背景保留足够留白，主视觉与人物轮廓形成明确层次。",
    },
    props: {
      strategy: isMotionHeavy ? "minimal" : "featured",
      guidance: isMotionHeavy
        ? ["道具数量从简，优先轻量、无锐角、单手可控。", "快速走位区域不得放置固定障碍物。"]
        : ["核心道具控制在 1–2 类。", "道具颜色从五色色卡的点缀色中选择。"],
    },
  };
}

/**
 * StageOS 默认方案引擎。
 *
 * 无任何第三方 Token 时也可运行：复用仓库已有的确定性知识检索、
 * 色库、物流倒排与服装预算逻辑，并补齐约束、队形、舞台和来源信息。
 * `generateMockPlan` 仅作为旧实现的迁移适配器，外部业务不得再直接调用它。
 */
export function generateLocalPlan(rawInput: StageInputData): GeneratedStagePlan {
  const parsed = stageInputSchema.safeParse(rawInput);
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.message).join("；");
    throw new Error(message || "项目输入不完整，无法生成方案。");
  }

  const input = parsed.data as StageInputData;
  const legacyPlan = generateMockPlan(input);
  const constraints = toConstraintNotices(input);
  const visualPlan = buildVisualPlan(input);

  const constraintRisks = constraints
    .filter((notice) => notice.level !== "info_note")
    .slice(0, 8)
    .map((notice) => ({
      level: notice.level === "hard_block" ? "high" as const : "medium" as const,
      title: notice.level === "hard_block" ? "硬性约束" : "软性约束",
      detail: `${notice.reason}${notice.alternative ? `；替代建议：${notice.alternative}` : ""}`,
    }));

  return {
    ...legacyPlan,
    visualPlan,
    constraints,
    risks: [...constraintRisks, ...legacyPlan.risks],
    metadata: {
      engine: "local_rules",
      generatedAt: new Date().toISOString(),
      schemaVersion: PLAN_SCHEMA_VERSION,
      knowledgeVersion: KNOWLEDGE_VERSION,
      constraintVersion: CONSTRAINT_VERSION,
      paletteVersion: PALETTE_VERSION,
      fallbackUsed: false,
    },
  };
}
