// StageOS 反向约束系统 · 通用包装层
// ============================================
// 65 条学段×主题×节目×舞台约束规则(stage-constraints-data.ts 内联数据)。
// 三级约束:hard_block(硬禁止,必须遵守)/ soft_warn(软约束,尽量避免)/ info_note(提示)。
// 前端(Vite)与边缘函数(Deno)共用,保持单一事实来源。
// 前端请通过 src/lib/stageConstraints.ts 引入。

import { STAGE_CONSTRAINT_RULES } from "./stage-constraints-data.ts";

// =================== 类型 ===================

export type ConstraintLevel = "hard_block" | "soft_warn" | "info_note";
export type ConstraintScope = "all" | "motion" | "costume" | "formation" | "props" | "bg" | "color";

export type ConstraintRule = {
  rule_id: string;
  level: ConstraintLevel;
  scope: ConstraintScope;
  /** 源引擎学段 value:pre/el/em/mid/high/adult。null = 不限 */
  condition_grade: string[] | null;
  /** 源引擎主题 value:poetry/folk/child/ceremony/modern/ethnic/trad/intl。null = 不限 */
  condition_theme: string[] | null;
  /** 源引擎节目 value:choir/dance/drama/recitation/instrumental。null = 不限 */
  condition_program: string[] | null;
  /** 舞台类型:indoor/outdoor。null = 不限 */
  condition_stage: string[] | null;
  blocked_items: string[];
  reason: string;
  alternative: string | null;
};

export const STAGE_CONSTRAINTS = STAGE_CONSTRAINT_RULES as ConstraintRule[];

// =================== 项目字段 → 源引擎枚举映射 ===================

/** 项目 SCHOOL_STAGES value → 源引擎学段 value 列表 */
const SCHOOL_STAGE_TO_GRADES: Record<string, string[]> = {
  primary: ["el", "em"],
  junior: ["mid"],
  senior: ["high"],
};

/** 项目 PROGRAM_TYPES value → 源引擎节目 value */
const PROGRAM_TYPE_TO_ENGINE: Record<string, string> = {
  chorus: "choir",
  mixed_chorus: "choir",
  recitation: "recitation",
  host: "recitation",
  drama: "drama",
  classical_dance: "dance",
  folk_dance: "dance",
  modern_jazz_street: "dance",
  ballet: "dance",
  cheerleading: "dance",
  acrobatics_martial_arts: "dance",
  western_orchestra: "instrumental",
  folk_orchestra: "instrumental",
  instrument: "instrumental",
};

/** 主题关键词 → 源引擎主题 value(programTheme 自由文本匹配) */
const THEME_KEYWORDS: Array<[string, string[]]> = [
  ["poetry", ["古诗", "诗词", "国风", "词牌", "水墨", "山水", "唐诗", "宋词"]],
  ["trad", ["戏曲", "京剧", "昆曲", "戏剧脸谱", "水袖", "国粹"]],
  ["ethnic", ["民族文化", "民族风", "苗族", "藏族", "彝族", "蒙古", "维吾尔", "少数民族"]],
  ["folk", ["民谣", "民歌", "乡土", "田园", "江南"]],
  ["child", ["童趣", "童谣", "动物", "自然", "小动物", "童话", "卡通"]],
  ["ceremony", ["爱国", "主旋律", "仪式", "红色", "颂歌", "国庆", "建党", "队歌", "升旗"]],
  ["intl", ["国际", "世界", "环球", "英文", "外语", "friendship"]],
  ["modern", ["现代", "流行", "青春", "校园歌曲", "爵士", "街舞"]],
];

/** 舞台类型关键词(自由文本判定 indoor/outdoor) */
const OUTDOOR_KEYWORDS = ["室外", "户外", "操场", "广场", "草地", "露天", "田径场"];
const INDOOR_KEYWORDS = ["室内", "剧场", "音乐厅", "礼堂", "报告厅", "体育馆"];

/** 从自由文本推断源引擎主题 value(可命中多个) */
export function inferEngineThemes(themeText?: string): string[] {
  if (!themeText) return [];
  const t = themeText.toLowerCase();
  const hits: string[] = [];
  for (const [value, words] of THEME_KEYWORDS) {
    if (words.some((w) => t.includes(w.toLowerCase()))) hits.push(value);
  }
  return hits;
}

/** 从自由文本推断舞台类型。无法判断时返回 null */
export function inferStageType(text?: string): "indoor" | "outdoor" | null {
  if (!text) return null;
  const t = text.toLowerCase();
  if (OUTDOOR_KEYWORDS.some((w) => t.includes(w))) return "outdoor";
  if (INDOOR_KEYWORDS.some((w) => t.includes(w))) return "indoor";
  return null;
}

// =================== 约束检索 ===================

export type ConstraintQuery = {
  /** 项目学段 value:primary/junior/senior */
  schoolStage?: string;
  /** 项目节目类型 value:chorus/classical_dance/... */
  programType?: string;
  /** 节目主题自由文本(如"国风古诗《咏柳》") */
  programTheme?: string;
  /** 舞台/场地描述自由文本,可选 */
  stageDescription?: string;
};

export type ConstraintRetrieval = {
  hardBlocks: ConstraintRule[];
  softWarns: ConstraintRule[];
  infoNotes: ConstraintRule[];
  /** 命中的源引擎条件(便于调试与测试) */
  matched: { grades: string[]; program: string | null; themes: string[]; stageType: string | null };
};

/**
 * 按项目输入检索适用的约束规则。
 * 条件为 null 的规则视为"不限"(恒匹配该维度);
 * 学段/节目为必要过滤维度,主题/舞台仅在能推断出时参与过滤。
 */
export function retrieveConstraints(query: ConstraintQuery): ConstraintRetrieval {
  const grades = SCHOOL_STAGE_TO_GRADES[query.schoolStage ?? ""] ?? [];
  const program = PROGRAM_TYPE_TO_ENGINE[query.programType ?? ""] ?? null;
  const themes = inferEngineThemes(query.programTheme);
  const stageType = inferStageType(query.stageDescription ?? query.programTheme);

  const matches = STAGE_CONSTRAINTS.filter((rule) => {
    // 学段:规则限定学段且与项目学段无交集 → 不适用
    if (rule.condition_grade && grades.length > 0 && !rule.condition_grade.some((g) => grades.includes(g))) {
      return false;
    }
    // 学段限定但项目未提供学段 → 保守跳过(避免误报学前规则)
    if (rule.condition_grade && grades.length === 0) return false;
    // 节目类型
    if (rule.condition_program) {
      if (!program || !rule.condition_program.includes(program)) return false;
    }
    // 主题:规则限定主题时,仅当推断出主题且相交才适用
    if (rule.condition_theme) {
      if (themes.length === 0 || !rule.condition_theme.some((t) => themes.includes(t))) return false;
    }
    // 舞台类型:规则限定时,仅当能推断出且匹配才适用
    if (rule.condition_stage) {
      if (!stageType || !rule.condition_stage.includes(stageType)) return false;
    }
    return true;
  });

  return {
    hardBlocks: matches.filter((r) => r.level === "hard_block"),
    softWarns: matches.filter((r) => r.level === "soft_warn"),
    infoNotes: matches.filter((r) => r.level === "info_note"),
    matched: { grades, program, themes, stageType },
  };
}

// =================== AI prompt 语料编译 ===================

const SCOPE_LABELS: Record<ConstraintScope, string> = {
  all: "整体",
  motion: "动作",
  costume: "服装",
  formation: "队形",
  props: "道具",
  bg: "背景",
  color: "配色",
};

function formatRule(rule: ConstraintRule, index: number): string {
  const scope = SCOPE_LABELS[rule.scope] ?? rule.scope;
  const alt = rule.alternative ? ` 替代方案:${rule.alternative}` : "";
  if (rule.blocked_items.length === 0) {
    // 纯提示类规则(无禁用项)
    return `${index + 1}. [${scope}] ${rule.reason}。${alt}`;
  }
  const blocked = rule.blocked_items.join("、");
  return `${index + 1}. [${scope}] 禁用/避免:${blocked}。原因:${rule.reason}。${alt}`;
}

/**
 * 把约束检索结果压缩成 AI prompt 可读的中文语料。
 * 硬禁止规则要求 AI 必须遵守;软约束尽量避免;提示仅作参考。
 */
export function compileConstraintContext(retrieval: ConstraintRetrieval, maxPerLevel = 10): string {
  const parts: string[] = [];
  if (retrieval.hardBlocks.length > 0) {
    const lines = retrieval.hardBlocks.slice(0, maxPerLevel).map(formatRule);
    parts.push(`【硬性禁止(生成方案必须遵守,违反即为错误方案)】\n${lines.join("\n")}`);
  }
  if (retrieval.softWarns.length > 0) {
    const lines = retrieval.softWarns.slice(0, maxPerLevel).map(formatRule);
    parts.push(`【软性约束(尽量避免,若使用需给出理由)】\n${lines.join("\n")}`);
  }
  if (retrieval.infoNotes.length > 0) {
    const lines = retrieval.infoNotes.slice(0, Math.min(maxPerLevel, 5)).map(formatRule);
    parts.push(`【经验提示(参考)】\n${lines.join("\n")}`);
  }
  if (parts.length === 0) return "";
  return `【舞台约束规则(基于 31 个真实演出视频的跨学段分析)】\n${parts.join("\n\n")}`;
}
