// StageOS 色库 · 通用包装层 v1.4
// ============================================
// 853 个中国传统色 + 70 套节目配色方案(palette-data.ts 内联数据)。
// 算法:OKLab / HSL / sRGB 互转、最近色名检索、5 色补全、按节目/场景/风格检索。
// 纯 TS、零依赖,前端(Vite)与边缘函数(Deno)共用,保持单一事实来源。
// 前端请通过 src/lib/paletteLibrary.ts 引入。

import { PALETTE_DATA } from "./palette-data.ts";

// =================== 类型 ===================

export type PaletteLibraryColor = {
  name_zh: string;
  hex: string;
  hue_group: string;
  source: string;
};

export type PaletteColorEntry = {
  role: string;
  name_zh: string;
  hex: string;
};

export type PaletteFormula = {
  name_zh: string;
  [key: string]: unknown;
};

export type ProgramPreset = {
  name: string;
  formula: string;
  formula_name_zh: string;
  base_name: string;
  base_hex: string;
  scene_type: string;
  style_tags: string[];
  color_source: string;
  hint: string;
  palette: PaletteColorEntry[];
};

export type ExtendedPaletteColor = PaletteColorEntry & {
  /** OKLab 距离(仅 pickNearestColor 返回时使用) */
  delta?: number;
  hue_group?: string;
  source?: string;
};

export type RGB = [number, number, number];
export type OKLab = [number, number, number]; // [L, a, b]
export type HSL = [number, number, number]; // [h (0-360), s (0-1), l (0-1)]

// =================== 数据导出 ===================

export const PALETTE_COLORS = PALETTE_DATA.colors as PaletteLibraryColor[];
export const PROGRAM_PRESETS = PALETTE_DATA.presets as ProgramPreset[];
export const PALETTE_FORMULAS = PALETTE_DATA.formulas as Record<string, PaletteFormula>;
export const PALETTE_SCENE_TYPES = PALETTE_DATA.scene_types as string[];
export const PALETTE_STYLE_TAGS = PALETTE_DATA.style_tags as string[];
export const PALETTE_COLOR_SOURCES = PALETTE_DATA.color_sources as string[];
export const PALETTE_DISCLAIMER = PALETTE_DATA.disclaimer as string;
export const PALETTE_VERSION = PALETTE_DATA.version as string;

// =================== HEX 解析 ===================

/** HEX → RGB。支持 #RGB / #RRGGBB / #RRGGBBAA,带不带 # 都行。非法返回 null。 */
export function hexToRgb(hex: string): RGB | null {
  if (!hex) return null;
  let h = String(hex).trim().replace(/^#/, "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  if (h.length === 8) h = h.slice(0, 6);
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const v = Math.max(0, Math.min(255, Math.round(n)));
    return v.toString(16).padStart(2, "0");
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
}

// =================== sRGB ↔ Linear ===================

function srgbToLinear(c: number): number {
  c = c / 255;
  return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
}

function linearToSrgb(c: number): number {
  c = Math.max(0, Math.min(1, c));
  return c > 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
}

// =================== RGB ↔ OKLab ===================

/** RGB (0-255) → OKLab [L, a, b] */
export function rgbToOklab(r: number, g: number, b: number): OKLab {
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);
  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ];
}

/** OKLab [L, a, b] → HEX */
export function oklabToHex(oklab: OKLab): string {
  const [L, a, b] = oklab;
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return rgbToHex(linearToSrgb(r) * 255, linearToSrgb(g) * 255, linearToSrgb(bb) * 255);
}

/** OKLab 距离(越小越近) */
export function deltaE(ok1: OKLab, ok2: OKLab): number {
  const dL = ok1[0] - ok2[0];
  const da = ok1[1] - ok2[1];
  const db = ok1[2] - ok2[2];
  return Math.sqrt(dL * dL + da * da + db * db);
}

/** OKLab 互补色(a/b 取反,L 保持) */
export function oklabComplement(hex: string): string | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const oklab = rgbToOklab(rgb[0], rgb[1], rgb[2]);
  return oklabToHex([oklab[0], -oklab[1], -oklab[2]]);
}

// =================== RGB ↔ HSL ===================

/** RGB (0-255) → HSL [h (0-360), s (0-1), l (0-1)] */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

/** HSL [h (0-360), s (0-1), l (0-1)] → HEX */
export function hslToHex(h: number, s: number, l: number): string {
  h = (((h % 360) + 360) % 360) / 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return rgbToHex(r * 255, g * 255, b * 255);
}

/** HSL 互补色(h+180°) */
export function hslComplement(hex: string): string | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  return hslToHex(h + 180, s, l);
}

// =================== YIQ 亮度(文字色自适应) ===================

/** 是否浅色(YIQ > 160)。浅背景配深字,深背景配浅字。 */
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  return yiq > 160;
}

// =================== 查色库最近色名 ===================

/** HEX → 色库里最接近的 N 个色名(按 OKLab 距离排序) */
export function pickNearestColor(
  hex: string,
  topN = 5,
  colorList: Array<{ name_zh: string; hex: string }> = PALETTE_COLORS,
): ExtendedPaletteColor[] {
  const targetRgb = hexToRgb(hex);
  if (!targetRgb) return [];
  const targetOk = rgbToOklab(targetRgb[0], targetRgb[1], targetRgb[2]);

  const candidates: ExtendedPaletteColor[] = [];
  for (const c of colorList) {
    const cRgb = hexToRgb(c.hex);
    if (!cRgb) continue;
    const cOk = rgbToOklab(cRgb[0], cRgb[1], cRgb[2]);
    candidates.push({
      role: "候选色",
      ...c,
      delta: deltaE(targetOk, cOk),
    });
  }
  return candidates
    .sort((a, b) => (a.delta ?? 0) - (b.delta ?? 0))
    .slice(0, topN);
}

// =================== 5 色补全 ===================

/**
 * 把任意长度调色板补到 5 色。
 * OKLab L=0.85 / L=0.25 生成浅深中性色,a/b 用原调色板色相的 10% 弱化。
 */
export function fillToFive(palette: PaletteColorEntry[]): PaletteColorEntry[] {
  if (palette.length >= 5) return palette.slice(0, 5);

  // 计算原调色板的色相平均值(用于中性色染色)
  let avgA = 0,
    avgB = 0,
    count = 0;
  for (const c of palette) {
    const rgb = hexToRgb(c.hex);
    if (rgb) {
      const ok = rgbToOklab(rgb[0], rgb[1], rgb[2]);
      avgA += ok[1];
      avgB += ok[2];
      count++;
    }
  }
  if (count > 0) {
    avgA /= count;
    avgB /= count;
  }
  // 弱化到 10%
  avgA *= 0.1;
  avgB *= 0.1;

  const lightNeutral = oklabToHex([0.85, avgA, avgB]);
  const darkNeutral = oklabToHex([0.25, avgA, avgB]);

  const result = [...palette];
  while (result.length < 5) {
    if (result.length === 3) {
      result.push({ role: "中性色", name_zh: "浅中性", hex: lightNeutral });
    } else if (result.length === 4) {
      result.push({ role: "中性色", name_zh: "深中性", hex: darkNeutral });
    } else {
      result.push({ role: "辅色", name_zh: "补充", hex: lightNeutral });
    }
  }
  return result.slice(0, 5);
}

// =================== StageOS 专用检索 API ===================

/** 根据方案名精确查预设。找不到返回 null。 */
export function getPresetByName(name: string): ProgramPreset | null {
  return PROGRAM_PRESETS.find((p) => p.name === name) || null;
}

// 节目类型 → 检索关键词(项目 PROGRAM_TYPES value 与中文名都覆盖)
const PROGRAM_KEYWORDS: Record<string, string[]> = {
  朗诵: ["朗诵", "recitation", "诗", "演讲"],
  合唱: ["合唱", "chorus"],
  舞蹈: ["群舞", "舞蹈", "dance", "艺术节"],
  戏剧: ["戏剧", "课本剧", "情景剧", "drama"],
  啦啦: ["啦啦", "cheer"],
  器乐: ["器乐", "管弦", "乐器", "instrument", "orchestra"],
};

/**
 * 根据节目类型(value 或中文名)查推荐预设。
 * 优先级:关键词匹配 > 兜底返回第一个。
 */
export function getPresetForProgram(programType: string): ProgramPreset | null {
  if (!programType) return null;
  const t = programType.toLowerCase();

  for (const preset of PROGRAM_PRESETS) {
    for (const [tag, words] of Object.entries(PROGRAM_KEYWORDS)) {
      if (t.includes(tag.toLowerCase()) || words.some((w) => t.includes(w.toLowerCase()))) {
        if (
          preset.scene_type.includes(tag) ||
          preset.style_tags.some((s) => words.some((w) => s.toLowerCase().includes(w.toLowerCase()))) ||
          preset.name.toLowerCase().includes(tag.toLowerCase())
        ) {
          return preset;
        }
      }
    }
  }

  return PROGRAM_PRESETS[0] || null;
}

/** 根据节目类型直接拿 5 色调色板(fillToFive 后)。 */
export function getPaletteForProgram(programType: string): PaletteColorEntry[] {
  const preset = getPresetForProgram(programType);
  if (!preset) return [];
  return fillToFive(preset.palette);
}

/** 根据场景类型查推荐节目方案列表。 */
export function getProgramsBySceneType(sceneType: string): ProgramPreset[] {
  return PROGRAM_PRESETS.filter((p) => p.scene_type.includes(sceneType));
}

/** 根据风格标签查推荐节目方案列表。 */
export function getProgramsByStyleTag(tag: string): ProgramPreset[] {
  return PROGRAM_PRESETS.filter((p) => p.style_tags.some((s) => s.includes(tag)));
}

/**
 * 综合检索:按节目类型 + 主题关键词返回 topN 套方案(按匹配分排序)。
 * 供前端配色候选列表与 AI prompt 语料注入使用。
 */
export function retrievePresets(
  programType: string,
  themeKeywords = "",
  topN = 3,
): ProgramPreset[] {
  const t = (programType || "").toLowerCase();
  const kw = (themeKeywords || "").toLowerCase();

  const scored = PROGRAM_PRESETS.map((preset) => {
    let score = 0;
    for (const [tag, words] of Object.entries(PROGRAM_KEYWORDS)) {
      const typeHit = t.includes(tag.toLowerCase()) || words.some((w) => t.includes(w.toLowerCase()));
      if (!typeHit) continue;
      if (preset.scene_type.includes(tag)) score += 5;
      if (preset.name.toLowerCase().includes(tag.toLowerCase())) score += 3;
      if (preset.style_tags.some((s) => words.some((w) => s.toLowerCase().includes(w.toLowerCase())))) score += 2;
    }
    if (kw) {
      for (const token of kw.split(/[\s,、,/]+/).filter(Boolean)) {
        if (preset.name.toLowerCase().includes(token)) score += 4;
        if (preset.hint.toLowerCase().includes(token)) score += 2;
        if (preset.style_tags.some((s) => s.toLowerCase().includes(token))) score += 3;
        if (preset.scene_type.toLowerCase().includes(token)) score += 2;
      }
    }
    return { preset, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((s) => s.preset);
}

/** 把预设方案压缩成 AI prompt 可读的一段中文描述。 */
export function compilePresetContext(presets: ProgramPreset[]): string {
  if (!presets.length) return "";
  const lines = presets.map((p, i) => {
    const colors = p.palette.map((c) => `${c.role}${c.name_zh}(${c.hex})`).join("、");
    return `${i + 1}. 「${p.name}」(${p.formula_name_zh},基色${p.base_name}${p.base_hex}):${colors}。${p.hint}`;
  });
  return `【中国传统色节目配色参考(共 ${PROGRAM_PRESETS.length} 套,以下为最相关 ${presets.length} 套)】\n${lines.join("\n")}`;
}
