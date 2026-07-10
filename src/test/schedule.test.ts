import { describe, expect, it } from "vitest";
import { buildReverseSchedule, autoReschedule } from "@/domain/stageos/schedule";

const INPUT = { performanceDate: "2026-09-01", performerCount: 40, rehearsalFrequencyPerWeek: 3 };

describe("buildReverseSchedule", () => {
  it("免费版仅含核心任务，不含会员节点", () => {
    const tasks = buildReverseSchedule(INPUT, "free");
    expect(tasks.some((t) => t.memberOnly)).toBe(false);
    expect(tasks.length).toBe(12);
  });

  it("会员版包含会员专属节点", () => {
    const tasks = buildReverseSchedule(INPUT, "member");
    expect(tasks.filter((t) => t.memberOnly).length).toBe(4);
  });

  it("排练频率低时排练类任务提前（buffer）", () => {
    const low = buildReverseSchedule({ ...INPUT, rehearsalFrequencyPerWeek: 1 }, "free");
    const normal = buildReverseSchedule(INPUT, "free");
    const lowRehearsal = low.find((t) => t.title === "完成分段排练")!;
    const normalRehearsal = normal.find((t) => t.title === "完成分段排练")!;
    expect(lowRehearsal.daysBefore).toBeGreaterThan(normalRehearsal.daysBefore);
  });

  it("按 daysBefore 降序排列（越早的任务在前）", () => {
    const tasks = buildReverseSchedule(INPUT, "member");
    for (let i = 1; i < tasks.length; i++) {
      expect(tasks[i - 1].daysBefore).toBeGreaterThanOrEqual(tasks[i].daysBefore);
    }
  });
});

describe("autoReschedule", () => {
  it("无逾期任务时不做调整", () => {
    const tasks = buildReverseSchedule(INPUT, "member");
    const { adjustments } = autoReschedule(tasks, INPUT.performanceDate, new Date("2026-07-01T12:00:00"));
    expect(adjustments.length).toBe(0);
  });

  it("逾期未完成任务被顺延且不晚于演出日", () => {
    const tasks = buildReverseSchedule(INPUT, "member");
    const today = new Date("2026-08-20T12:00:00");
    const { tasks: next, adjustments } = autoReschedule(tasks, INPUT.performanceDate, today);
    expect(adjustments.length).toBeGreaterThan(0);
    for (const t of next) {
      expect(t.dueDate <= INPUT.performanceDate).toBe(true);
    }
  });

  it("下游任务不早于上游任务的新截止日", () => {
    const tasks = buildReverseSchedule(INPUT, "member");
    const today = new Date("2026-08-10T12:00:00");
    const { tasks: next } = autoReschedule(tasks, INPUT.performanceDate, today);
    const byTitle = new Map(next.map((t) => [t.title, t]));
    for (const t of next) {
      for (const dep of t.dependsOn ?? []) {
        const upstream = byTitle.get(dep);
        if (upstream) expect(t.dueDate >= upstream.dueDate).toBe(true);
      }
    }
  });

  it("已完成的逾期任务不被移动", () => {
    const tasks = buildReverseSchedule(INPUT, "member").map((t) =>
      t.title === "项目目标与节目内容确认" ? { ...t, completed: true } : t,
    );
    const original = tasks.find((t) => t.completed)!;
    const { tasks: next } = autoReschedule(tasks, INPUT.performanceDate, new Date("2026-08-20T12:00:00"));
    const moved = next.find((t) => t.title === original.title)!;
    expect(moved.dueDate).toBe(original.dueDate);
  });
});
