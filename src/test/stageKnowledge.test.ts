import { describe, it, expect } from "vitest";
import {
  STAGE_KNOWLEDGE,
  UNIVERSAL_FORMATIONS,
  retrieveStageKnowledge,
  compileKnowledgeContext,
  resolveColorHex,
} from "@/lib/stageKnowledge";
import { PROGRAM_TYPES } from "@/lib/stageos";
import { generateMockPlan } from "@/lib/mockPlan";

describe("STAGE_KNOWLEDGE 语料完整性", () => {
  it("覆盖 PROGRAM_TYPES 中的全部节目类型", () => {
    const covered = new Set(STAGE_KNOWLEDGE.flatMap((k) => k.programTypes));
    for (const p of PROGRAM_TYPES) {
      expect(covered.has(p.value), `节目类型 ${p.value} 未被知识库覆盖`).toBe(true);
    }
  });

  it("每个原型至少有 2 套队形、2 种款式、2 组配色", () => {
    for (const k of STAGE_KNOWLEDGE) {
      expect(k.formations.length).toBeGreaterThanOrEqual(2);
      expect(k.costumeStyles.length).toBeGreaterThanOrEqual(2);
      expect(k.palettes.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("所有配色的主/辅/点缀色都有合法 HEX 色值", () => {
    const HEX = /^#[0-9A-F]{6}$/;
    for (const k of STAGE_KNOWLEDGE) {
      for (const p of k.palettes) {
        expect(p.primaryHex, `${p.name} primaryHex`).toMatch(HEX);
        expect(p.secondaryHex, `${p.name} secondaryHex`).toMatch(HEX);
        expect(p.accentHex, `${p.name} accentHex`).toMatch(HEX);
      }
    }
  });
});

describe("resolveColorHex 颜色解析", () => {
  it("解析 HEX 输入(带/不带 #)并规范化", () => {
    expect(resolveColorHex("#1E3A8A")).toBe("#1E3A8A");
    expect(resolveColorHex("1e3a8a")).toBe("#1E3A8A");
    expect(resolveColorHex("主色 #c3272b 偏暖")).toBe("#C3272B");
  });

  it("解析知识库中文色名(取最长命中)", () => {
    expect(resolveColorHex("靛蓝")).toBe("#1F3C88");
    expect(resolveColorHex("屏幕用青瓷绿渐变")).toBe("#7FB8A4");
  });

  it("无法识别时返回 null", () => {
    expect(resolveColorHex("")).toBeNull();
    expect(resolveColorHex("五彩斑斓的黑")).not.toBeNull(); // 命中「黑」
    expect(resolveColorHex("不含任何颜色词汇")).toBeNull();
  });

  it("能解析 853 色库中的中国传统色名", () => {
    // 来自 palette-library 的传统色(非原型配色条目)
    expect(resolveColorHex("石榴红")).toMatch(/^#[0-9A-F]{6}$/);
    expect(resolveColorHex("主色用月白就很雅")).toMatch(/^#[0-9A-F]{6}$/);
  });
});

describe("retrieveStageKnowledge 检索", () => {
  it("按节目类型命中原型", () => {
    const r = retrieveStageKnowledge({ programType: "chorus" });
    expect(r.archetype).toBe("合唱");
    expect(r.matchedBy.join()).toContain("命中原型");
  });

  it("未知节目类型回退到兜底原型", () => {
    const r = retrieveStageKnowledge({ programType: "unknown_type" });
    expect(r.archetype).toBe("晚会/展演");
    expect(r.matchedBy.join()).toContain("回退");
  });

  it("人数过滤出适配队形", () => {
    const r = retrieveStageKnowledge({ programType: "chorus", performerCount: 12 });
    for (const f of r.formations) {
      expect(f.countRange[0]).toBeLessThanOrEqual(12);
      expect(f.countRange[1]).toBeGreaterThanOrEqual(12);
    }
  });

  it("主题色匹配的配色排在最前", () => {
    const r = retrieveStageKnowledge({ programType: "chorus", screenThemeColor: "靛蓝" });
    expect(r.palettes[0].family.some((f) => "靛蓝".includes(f))).toBe(true);
  });

  it("通用队形池标记完整且人数区间合法", () => {
    expect(UNIVERSAL_FORMATIONS.length).toBeGreaterThanOrEqual(8);
    for (const f of UNIVERSAL_FORMATIONS) {
      expect(f.universal, `${f.name} 缺少 universal 标记`).toBe(true);
      expect(f.countRange[0]).toBeLessThan(f.countRange[1]);
      expect(f.tags?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("检索结果合并了通用队形池(每种节目类型都能迁移复用)", () => {
    for (const k of STAGE_KNOWLEDGE) {
      const r = retrieveStageKnowledge({ programType: k.programTypes[0] });
      const universalHit = r.formations.filter((f) => f.universal);
      expect(universalHit.length, `原型「${k.archetype}」未合并通用队形`).toBeGreaterThan(0);
      // 同名去重:合并后不允许重复布局名
      const names = r.formations.map((f) => f.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("人数过滤同样作用于通用队形", () => {
    const r = retrieveStageKnowledge({ programType: "chorus", performerCount: 20 });
    for (const f of r.formations) {
      expect(f.countRange[0]).toBeLessThanOrEqual(20);
      expect(f.countRange[1]).toBeGreaterThanOrEqual(20);
    }
    expect(r.formations.some((f) => f.universal)).toBe(true);
  });

  it("主题关键词命中的队形排在最前,同分时原型专属优先", () => {
    const themed = retrieveStageKnowledge({ programType: "chorus", programTheme: "气势磅礴的压轴节目" });
    expect((themed.formations[0].tags ?? []).some((t) => "气势磅礴的压轴节目".includes(t))).toBe(true);
    const plain = retrieveStageKnowledge({ programType: "chorus" });
    expect(plain.formations[0].universal ?? false).toBe(false);
  });
});

describe("compileKnowledgeContext 输出", () => {
  it("包含队形/款式/配色三大板块与组合指令", () => {
    const ctx = compileKnowledgeContext(retrieveStageKnowledge({ programType: "folk_dance", performerCount: 20 }));
    expect(ctx).toContain("推荐队形模板");
    expect(ctx).toContain("可选服装款式方向");
    expect(ctx).toContain("可选配色方案");
    expect(ctx).toContain("组合");
    // 通用队形池条目带 [通用] 标注,且要求 AI 引用队形模板名
    expect(ctx).toContain("[通用]");
    expect(ctx).toContain("队形模板名称");
  });
});

describe("generateMockPlan 使用知识库", () => {
  it("方案描述体现知识库款式与配色名", () => {
    const { costumePlan } = generateMockPlan({
      programType: "cheerleading",
      performerCount: 20,
      maleCount: 8,
      femaleCount: 12,
      perPersonBudget: 150,
    });
    const allText = [...costumePlan.femalePlan, ...costumePlan.malePlan, ...costumePlan.accessories]
      .map((i) => i.description)
      .join("|");
    expect(allText).toContain("「");
    // 金额守恒
    const sum = [...costumePlan.femalePlan, ...costumePlan.malePlan, ...costumePlan.accessories]
      .reduce((s, i) => s + i.subtotal, 0);
    expect(costumePlan.totalEstimate).toBe(sum);
  });
});
