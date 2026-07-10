import { describe, expect, it } from "vitest";
import {
  LED_RULES,
  FORMATION_SAFETY,
  retrieveSceneRules,
  compileSceneRuleContext,
} from "../../supabase/functions/_shared/stage-scene-rules";

describe("stage-scene-rules 场景规则包", () => {
  it("LED 规则与队形安全矩阵均非空且字段完整", () => {
    expect(LED_RULES.length).toBeGreaterThanOrEqual(6);
    for (const r of LED_RULES) {
      expect(r.dynamicMode.length).toBeGreaterThan(0);
      expect(r.forbidden.length).toBeGreaterThan(0);
    }
    expect(FORMATION_SAFETY.length).toBeGreaterThanOrEqual(6);
    for (const f of FORMATION_SAFETY) {
      expect(f.bestCount[0]).toBeLessThan(f.bestCount[1]);
      expect(f.maxCount).toBeGreaterThanOrEqual(f.bestCount[1]);
      expect(f.safety.length).toBeGreaterThan(0);
    }
  });

  it("合唱节目能命中合唱 LED 规则与队形规则", () => {
    const r = retrieveSceneRules("班级大合唱", "红色经典", 45);
    expect(r.ledRule?.label).toBe("合唱类");
    expect(r.formationRule?.label).toBe("合唱");
    expect(r.crowdNotes.some((n) => n.includes("30 人以上"))).toBe(true);
    expect(r.crowdNotes.some((n) => n.includes("40 人以上"))).toBe(true);
  });

  it("人数超限时给出超限处理提示", () => {
    const r = retrieveSceneRules("课本剧", "", 35);
    expect(r.formationRule?.label).toBe("情景剧/课本剧");
    expect(r.crowdNotes.some((n) => n.includes("超过"))).toBe(true);
  });

  it("编译上下文包含场景约束与 LED 禁止项", () => {
    const ctx = compileSceneRuleContext(retrieveSceneRules("舞蹈", "", 20));
    expect(ctx).toContain("舞台场景规则");
    expect(ctx).toContain("人物永远是第一主体");
    expect(ctx).toContain("LED 大屏背景规则");
    expect(ctx).toContain("禁止");
    expect(ctx).not.toContain("undefined");
  });

  it("未命中节目类型时仍返回通用场景约束", () => {
    const r = retrieveSceneRules("魔术表演", "", 5);
    expect(r.ledRule).toBeNull();
    expect(r.constraints.length).toBeGreaterThan(0);
    const ctx = compileSceneRuleContext(r);
    expect(ctx).toContain("场景核心约束");
  });
});
