import { describe, it, expect } from "vitest";
import {
  PALETTE_COLORS,
  PROGRAM_PRESETS,
  PALETTE_SCENE_TYPES,
  hexToRgb,
  isLightColor,
  oklabComplement,
  hslComplement,
  pickNearestColor,
  fillToFive,
  getPresetByName,
  getPresetForProgram,
  getPaletteForProgram,
  getProgramsBySceneType,
  retrievePresets,
  compilePresetContext,
} from "@/lib/paletteLibrary";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

describe("色库数据完整性", () => {
  it("包含 853 个传统色与 70 套节目方案", () => {
    expect(PALETTE_COLORS.length).toBe(853);
    expect(PROGRAM_PRESETS.length).toBe(70);
  });

  it("所有色值均为合法 6 位 HEX,且无乱码色名", () => {
    for (const c of PALETTE_COLORS) {
      expect(c.hex, `色 ${c.name_zh} HEX 非法`).toMatch(HEX_RE);
      expect(c.name_zh.includes("\uFFFD"), `色名乱码: ${c.name_zh}`).toBe(false);
    }
  });

  it("每套节目方案至少 2 色,且字段完整(不足 5 色由 fillToFive 补全)", () => {
    for (const p of PROGRAM_PRESETS) {
      expect(p.palette.length, `方案 ${p.name} 色数不足`).toBeGreaterThanOrEqual(2);
      expect(p.base_hex).toMatch(HEX_RE);
      expect(p.scene_type.length).toBeGreaterThan(0);
      for (const c of p.palette) {
        expect(c.hex, `方案 ${p.name} 中 ${c.name_zh} HEX 非法`).toMatch(HEX_RE);
      }
    }
  });
});

describe("色彩算法", () => {
  it("hexToRgb 解析常见格式并拒绝非法值", () => {
    expect(hexToRgb("#FF0000")).toEqual([255, 0, 0]);
    expect(hexToRgb("0f0")).toEqual([0, 255, 0]);
    expect(hexToRgb("#12345678")).toEqual([0x12, 0x34, 0x56]);
    expect(hexToRgb("not-a-color")).toBeNull();
  });

  it("isLightColor 深浅判断正确", () => {
    expect(isLightColor("#FFFFFF")).toBe(true);
    expect(isLightColor("#000000")).toBe(false);
  });

  it("互补色输出合法 HEX", () => {
    expect(oklabComplement("#C41E3A")).toMatch(HEX_RE);
    expect(hslComplement("#C41E3A")).toMatch(HEX_RE);
  });

  it("pickNearestColor 返回按距离升序的候选", () => {
    const near = pickNearestColor("#C41E3A", 5);
    expect(near.length).toBe(5);
    for (let i = 1; i < near.length; i++) {
      expect(near[i].delta! >= near[i - 1].delta!).toBe(true);
    }
  });

  it("fillToFive 把短调色板补足 5 色", () => {
    const filled = fillToFive([
      { role: "主色", name_zh: "青瓷", hex: "#5E8C79" },
      { role: "辅色", name_zh: "烫金", hex: "#B8860B" },
      { role: "点缀", name_zh: "朱砂", hex: "#C41E3A" },
    ]);
    expect(filled.length).toBe(5);
    for (const c of filled) expect(c.hex).toMatch(HEX_RE);
  });
});

describe("节目方案检索", () => {
  it("getPresetForProgram 对主要节目类型都能命中", () => {
    for (const t of ["合唱", "舞蹈", "朗诵", "戏剧", "器乐", "chorus", "dance"]) {
      const p = getPresetForProgram(t);
      expect(p, `节目类型 ${t} 未命中方案`).not.toBeNull();
    }
  });

  it("getPaletteForProgram 恒返回 5 色", () => {
    expect(getPaletteForProgram("合唱").length).toBe(5);
    expect(getPaletteForProgram("舞蹈").length).toBe(5);
  });

  it("getPresetByName 精确命中", () => {
    const first = PROGRAM_PRESETS[0];
    expect(getPresetByName(first.name)?.name).toBe(first.name);
    expect(getPresetByName("不存在的方案名")).toBeNull();
  });

  it("getProgramsBySceneType 对全部场景类型均有返回", () => {
    for (const scene of PALETTE_SCENE_TYPES) {
      expect(
        getProgramsBySceneType(scene).length,
        `场景 ${scene} 无任何方案`,
      ).toBeGreaterThan(0);
    }
  });

  it("retrievePresets 按主题关键词提升相关方案", () => {
    const hits = retrievePresets("合唱", "国风 古诗", 3);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.length).toBeLessThanOrEqual(3);
  });

  it("compilePresetContext 生成含色名与 HEX 的中文语料", () => {
    const ctx = compilePresetContext(retrievePresets("合唱", "", 2));
    expect(ctx).toContain("配色参考");
    expect(ctx).toMatch(/#[0-9a-fA-F]{6}/);
  });
});
