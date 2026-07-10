import { describe, it, expect } from "vitest";
import {
  STAGE_CONSTRAINTS,
  retrieveConstraints,
  compileConstraintContext,
  inferEngineThemes,
  inferStageType,
} from "@/lib/stageConstraints";

describe("约束规则数据完整性", () => {
  it("共 65 条规则:25 硬禁止 + 28 软约束 + 12 提示", () => {
    expect(STAGE_CONSTRAINTS.length).toBe(65);
    expect(STAGE_CONSTRAINTS.filter((r) => r.level === "hard_block").length).toBe(25);
    expect(STAGE_CONSTRAINTS.filter((r) => r.level === "soft_warn").length).toBe(28);
    expect(STAGE_CONSTRAINTS.filter((r) => r.level === "info_note").length).toBe(12);
  });

  it("每条规则字段完整且无乱码", () => {
    const ids = new Set<string>();
    for (const r of STAGE_CONSTRAINTS) {
      expect(r.rule_id.length).toBeGreaterThan(0);
      expect(ids.has(r.rule_id), `rule_id 重复: ${r.rule_id}`).toBe(false);
      ids.add(r.rule_id);
      if (r.level !== "info_note") {
        expect(r.blocked_items.length, `非提示类规则缺禁用项: ${r.rule_id}`).toBeGreaterThan(0);
      }
      expect(r.reason.length).toBeGreaterThan(0);
      const text = JSON.stringify(r);
      expect(text.includes("\uFFFD"), `规则含乱码: ${r.rule_id}`).toBe(false);
    }
  });
});

describe("条件推断", () => {
  it("inferEngineThemes 命中主题关键词", () => {
    expect(inferEngineThemes("国风古诗《咏柳》")).toContain("poetry");
    expect(inferEngineThemes("童趣自然小动物")).toContain("child");
    expect(inferEngineThemes("爱国主旋律颂歌")).toContain("ceremony");
    expect(inferEngineThemes("")).toEqual([]);
  });

  it("inferStageType 判定室内外", () => {
    expect(inferStageType("学校操场露天演出")).toBe("outdoor");
    expect(inferStageType("市音乐厅剧场")).toBe("indoor");
    expect(inferStageType("未知场地")).toBeNull();
  });
});

describe("约束检索", () => {
  it("小学合唱能命中硬禁止规则,且不误报学前/成人专属规则", () => {
    const r = retrieveConstraints({ schoolStage: "primary", programType: "chorus", programTheme: "童趣" });
    expect(r.hardBlocks.length).toBeGreaterThan(0);
    const all = [...r.hardBlocks, ...r.softWarns, ...r.infoNotes];
    for (const rule of all) {
      if (rule.condition_grade) {
        expect(
          rule.condition_grade.some((g) => ["el", "em"].includes(g)),
          `误报非小学规则: ${rule.rule_id}`,
        ).toBe(true);
      }
    }
  });

  it("高中舞蹈与小学合唱命中的规则集合不同", () => {
    const a = retrieveConstraints({ schoolStage: "primary", programType: "chorus" });
    const b = retrieveConstraints({ schoolStage: "senior", programType: "classical_dance" });
    const idsA = new Set(a.hardBlocks.map((r) => r.rule_id));
    const idsB = new Set(b.hardBlocks.map((r) => r.rule_id));
    expect(idsA).not.toEqual(idsB);
  });

  it("未提供学段时跳过学段限定规则(保守不误报)", () => {
    const r = retrieveConstraints({ programType: "chorus" });
    const all = [...r.hardBlocks, ...r.softWarns, ...r.infoNotes];
    for (const rule of all) {
      expect(rule.condition_grade, `未知学段却命中学段规则: ${rule.rule_id}`).toBeNull();
    }
  });

  it("主题限定规则仅在主题命中时出现", () => {
    const noTheme = retrieveConstraints({ schoolStage: "junior", programType: "chorus" });
    for (const rule of [...noTheme.hardBlocks, ...noTheme.softWarns]) {
      expect(rule.condition_theme, `无主题却命中主题规则: ${rule.rule_id}`).toBeNull();
    }
  });
});

describe("prompt 语料编译", () => {
  it("compileConstraintContext 生成分级中文语料", () => {
    const r = retrieveConstraints({ schoolStage: "primary", programType: "chorus", programTheme: "童趣" });
    const ctx = compileConstraintContext(r);
    expect(ctx).toContain("硬性禁止");
    expect(ctx).toContain("原因:");
  });

  it("无命中时返回空字符串", () => {
    const empty = compileConstraintContext({
      hardBlocks: [],
      softWarns: [],
      infoNotes: [],
      matched: { grades: [], program: null, themes: [], stageType: null },
    });
    expect(empty).toBe("");
  });
});
