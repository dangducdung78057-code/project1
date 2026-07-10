// StageOS 舞台场景规则包(沉淀自调研资料 stageos_indoor_theater_led_warmwood_package)。
// 场景:室内剧场 LED 暖木礼堂舞台(indoor_theater_led_warmwood)——校园正式演出最常见场地。
// 覆盖:LED 大屏背景规则 × 队形安全规则 × 场景视觉风险,按节目类型 + 人数检索后注入 AI prompt。
// 纯 TS、零依赖,浏览器 / Node / Deno 通用。

export type LedRule = {
  programKey: string; // 匹配节目类型的关键词
  label: string;
  dynamicMode: string;
  colorAdvice: string;
  contentAdvice: string;
  forbidden: string;
  special?: string;
};

/** LED 大屏背景规则 × 节目类型(核心原则:人物永远是第一主体,LED 只托氛围) */
export const LED_RULES: LedRule[] = [
  {
    programKey: "合唱",
    label: "合唱类",
    dynamicMode: "静态或极慢动态(≤1次/分钟切换)",
    colorAdvice: "浅蓝、灰蓝、星空蓝、米白光影",
    contentAdvice: "星空、云雾、淡彩渐变、合唱主题文字",
    forbidden: "高频闪烁、多色快速切换、复杂动画",
  },
  {
    programKey: "舞蹈",
    label: "舞蹈类",
    dynamicMode: "慢动态(可与舞蹈节奏呼应,延迟≤2秒)",
    colorAdvice: "与服装色系互补或同系低饱和",
    contentAdvice: "抽象渐变、自然元素(云/水/光)、几何色块",
    forbidden: "写实风景照片、卡通素材、高饱和色块",
    special: "舞蹈高潮段可短暂提亮,但不超过 2 秒",
  },
  {
    programKey: "朗诵",
    label: "朗诵/情景朗诵",
    dynamicMode: "静态背景为主",
    colorAdvice: "暖灰、米白、淡蓝、灰金",
    contentAdvice: "主题相关的简洁文字/诗句/背景意象",
    forbidden: "与朗诵内容无关的动态画面",
    special: "可用极慢的文字淡入淡出",
  },
  {
    programKey: "器乐",
    label: "器乐合奏",
    dynamicMode: "完全静态",
    colorAdvice: "深蓝、墨绿、暗金、暖灰",
    contentAdvice: "音乐厅风格深色背景、乐器剪影",
    forbidden: "任何动态画面、文字弹幕",
  },
  {
    programKey: "思政|红色|爱国",
    label: "思政/红色主题",
    dynamicMode: "慢动态,画面过渡≥3秒",
    colorAdvice: "蓝天、红旗、山河、光束",
    contentAdvice: "国旗、山河、历史影像(静态)",
    forbidden: "大红满屏 + 大红服装同时出现",
    special: "服装以白色为主、红色为点缀",
  },
  {
    programKey: "儿童|童话|低段|学前",
    label: "儿童节目",
    dynamicMode: "慢动态,切换≥5秒",
    colorAdvice: "浅蓝天空、云朵、柔和渐变",
    contentAdvice: "童话元素、草地、星空、彩虹(低饱和)",
    forbidden: "高饱和卡通素材堆满屏、高频闪烁、高亮白屏",
  },
];

export type FormationSafetyRule = {
  programKey: string;
  label: string;
  bestCount: [number, number];
  maxCount: number;
  overflowStrategy: string;
  safety: string[];
};

/** 节目类型 × 人数 × 队形安全矩阵 */
export const FORMATION_SAFETY: FormationSafetyRule[] = [
  {
    programKey: "合唱",
    label: "合唱",
    bestCount: [30, 45],
    maxCount: 60,
    overflowStrategy: "分声部站位 + 合唱台",
    safety: ["合唱台每级高度差≥20cm", "前后排间距≥80cm", "钢琴位在舞台左前 1/4 处", "指挥位在 C 位正前方"],
  },
  {
    programKey: "舞蹈|街舞|啦啦",
    label: "舞蹈(群舞)",
    bestCount: [6, 28],
    maxCount: 42,
    overflowStrategy: "分组分区 + 安全通道",
    safety: ["C 位前方动作半径≥1.5m", "紧密型间距≥0.8m / 舒展型≥1.2m / 大幅度动作≥1.5m", "禁止俯视图案型队形(观众平视看不到)"],
  },
  {
    programKey: "朗诵",
    label: "朗诵/情景朗诵",
    bestCount: [8, 24],
    maxCount: 36,
    overflowStrategy: "前后分层 + 麦克风位",
    safety: ["麦克风位必须预留", "朗诵者面部朝向正面主机位", "背景人员不得有大幅度动作"],
  },
  {
    programKey: "器乐|乐器|合奏",
    label: "器乐合奏",
    bestCount: [8, 30],
    maxCount: 50,
    overflowStrategy: "分排 + 谱架间距",
    safety: ["谱架间距≥60cm 且不遮挡后排面部", "大型乐器(定音鼓/竖琴)固定后区", "独奏位移至前区时需预留通道"],
  },
  {
    programKey: "思政|红色|爱国",
    label: "思政类节目",
    bestCount: [12, 36],
    maxCount: 48,
    overflowStrategy: "左中右三分区",
    safety: ["红色主题服装避免大红配大红屏"],
  },
  {
    programKey: "情景剧|课本剧|戏剧|话剧",
    label: "情景剧/课本剧",
    bestCount: [6, 20],
    maxCount: 30,
    overflowStrategy: "分幕轮换",
    safety: ["道具不超过人体 1/3 大小"],
  },
];

/** 队形变换通用路径规则 */
export const TRANSITION_RULES = [
  "单次最大移动距离 ≤3m,超过需分步",
  "最短变换时间 ≥8 秒(含走位+定位)",
  "40 人以上必须保留 ≥1.2m 宽安全通道",
  "分组错峰 0.3-0.5 秒,避免路径交叉",
];

/** 室内剧场 LED 暖木礼堂场景通用约束(核心视觉风险防线) */
export const INDOOR_THEATER_CONSTRAINTS = [
  "人物永远是第一主体,LED 只负责托住氛围",
  "避免全黑、深蓝、深紫服装(会被黑色侧幕吞没)",
  "服装与 LED 背景必须形成明度差(背景更虚、人物更实)",
  "禁止大红衣配大红屏",
  "LED 亮度不得高于人物面光亮度(≤面光 80%)",
  "LED 白色面积超过 30% 时需警告",
  "队形必须服务正面观看,不依赖俯视图案",
  "反光地面会造成服装色差,浅色裙装慎选高反光面料",
];

export type SceneRuleRetrieval = {
  ledRule: LedRule | null;
  formationRule: FormationSafetyRule | null;
  constraints: string[];
  transitions: string[];
  crowdNotes: string[];
};

/** 按节目类型 + 主题 + 人数检索场景规则 */
export function retrieveSceneRules(
  programType: string,
  programTheme = "",
  performerCount = 0,
): SceneRuleRetrieval {
  const text = `${programType} ${programTheme}`;
  const matchKey = (key: string) => key.split("|").some((k) => text.includes(k));

  const ledRule = LED_RULES.find((r) => matchKey(r.programKey)) ?? null;
  const formationRule = FORMATION_SAFETY.find((r) => matchKey(r.programKey)) ?? null;

  const crowdNotes: string[] = [];
  if (performerCount >= 30) crowdNotes.push("30 人以上必须分层或分区");
  if (performerCount >= 40) crowdNotes.push("40 人以上必须保留左右安全通道(≥1.2m)");
  if (formationRule && performerCount > formationRule.maxCount) {
    crowdNotes.push(
      `人数 ${performerCount} 已超过${formationRule.label}上限 ${formationRule.maxCount},需${formationRule.overflowStrategy}`,
    );
  }

  return { ledRule, formationRule, constraints: INDOOR_THEATER_CONSTRAINTS, transitions: TRANSITION_RULES, crowdNotes };
}

/** 编译为可注入 AI prompt 的中文上下文 */
export function compileSceneRuleContext(r: SceneRuleRetrieval): string {
  const lines: string[] = ["【舞台场景规则:室内剧场 LED 礼堂(校园演出默认场景)】"];

  lines.push("■ 场景核心约束:");
  for (const c of r.constraints) lines.push(`- ${c}`);

  if (r.ledRule) {
    lines.push(`■ LED 大屏背景规则(${r.ledRule.label}):`);
    lines.push(`- 动态模式:${r.ledRule.dynamicMode}`);
    lines.push(`- 色调建议:${r.ledRule.colorAdvice}`);
    lines.push(`- 内容建议:${r.ledRule.contentAdvice}`);
    lines.push(`- 禁止:${r.ledRule.forbidden}`);
    if (r.ledRule.special) lines.push(`- 特殊:${r.ledRule.special}`);
  }

  if (r.formationRule) {
    const f = r.formationRule;
    lines.push(`■ 队形安全规则(${f.label}):`);
    lines.push(`- 最佳人数 ${f.bestCount[0]}-${f.bestCount[1]},上限 ${f.maxCount},超限:${f.overflowStrategy}`);
    for (const s of f.safety) lines.push(`- ${s}`);
  }

  if (r.crowdNotes.length > 0) {
    lines.push("■ 人数提醒:");
    for (const n of r.crowdNotes) lines.push(`- ${n}`);
  }

  return lines.join("\n");
}
