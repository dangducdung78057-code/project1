import type { MembershipTier } from "./types";

export type ReverseScheduleTask = {
  id: string;
  title: string;
  category: string;
  daysBefore: number;
  dueDate: string;
  owner: string;
  completed: boolean;
  memberOnly?: boolean;
  dependsOn?: string[];
  durationDays: number;
};

export type ScheduleBuildInput = {
  performanceDate: string;
  performerCount: number;
  rehearsalFrequencyPerWeek: number;
};

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function due(performanceDate: string, daysBefore: number): string {
  const date = new Date(`${performanceDate}T12:00:00`);
  date.setDate(date.getDate() - daysBefore);
  return isoDate(date);
}

type TaskSeed = Omit<ReverseScheduleTask, "id" | "dueDate" | "completed">;

const CORE_TASKS: TaskSeed[] = [
  { title: "项目目标与节目内容确认", category: "策划", daysBefore: 45, owner: "项目负责人", durationDays: 5 },
  { title: "完成第一版整体方案", category: "方案", daysBefore: 38, owner: "带队教师", durationDays: 5 },
  { title: "完成队形草图", category: "队形", daysBefore: 32, owner: "编导/教师", durationDays: 4 },
  { title: "服装方向与预算确认", category: "服装", daysBefore: 30, owner: "服装负责人", durationDays: 3 },
  { title: "样衣或样品确认", category: "采购", daysBefore: 24, owner: "采购负责人", durationDays: 5 },
  { title: "背景、道具和音乐文件定稿", category: "舞台", daysBefore: 18, owner: "舞台负责人", durationDays: 4 },
  { title: "完成分段排练", category: "排练", daysBefore: 14, owner: "带队教师", durationDays: 6 },
  { title: "服装到货与试穿", category: "服装", daysBefore: 8, owner: "服装负责人", durationDays: 2 },
  { title: "完成第一次合成排练", category: "排练", daysBefore: 7, owner: "全体", durationDays: 2 },
  { title: "完成技术彩排", category: "现场", daysBefore: 3, owner: "技术负责人", durationDays: 1 },
  { title: "终检与应急包封装", category: "现场", daysBefore: 1, owner: "项目负责人", durationDays: 1 },
  { title: "正式演出", category: "演出", daysBefore: 0, owner: "全体", durationDays: 1 },
];

const MEMBER_TASKS: TaskSeed[] = [
  {
    title: "完成 2.5D 队形与舞台预演",
    category: "预演",
    daysBefore: 28,
    owner: "编导/教师",
    memberOnly: true,
    dependsOn: ["完成第一版整体方案"],
    durationDays: 3,
  },
  {
    title: "完成服装、灯光和背景联合校色",
    category: "视觉",
    daysBefore: 16,
    owner: "视觉负责人",
    memberOnly: true,
    dependsOn: ["样衣或样品确认", "背景、道具和音乐文件定稿"],
    durationDays: 2,
  },
  {
    title: "完成关键帧与走位冲突检查",
    category: "走位",
    daysBefore: 10,
    owner: "编导/教师",
    memberOnly: true,
    dependsOn: ["完成 2.5D 队形与舞台预演"],
    durationDays: 2,
  },
  {
    title: "完成遮挡与安全诊断",
    category: "安全",
    daysBefore: 6,
    owner: "安全负责人",
    memberOnly: true,
    dependsOn: ["完成第一次合成排练"],
    durationDays: 1,
  },
];

/** 根据演出信息生成倒排任务清单。免费版仅核心任务；会员/定制含专属节点。 */
export function buildReverseSchedule(input: ScheduleBuildInput, tier: MembershipTier): ReverseScheduleTask[] {
  const seeds = tier === "free" ? CORE_TASKS : [...CORE_TASKS, ...MEMBER_TASKS];
  const rehearsalBuffer = input.rehearsalFrequencyPerWeek < 3 ? 5 : input.performerCount > 60 ? 3 : 0;

  return seeds
    .map((task, index) => {
      const adjustedDays =
        task.category === "排练" || task.category === "走位" ? task.daysBefore + rehearsalBuffer : task.daysBefore;
      return {
        ...task,
        id: `schedule-${index + 1}`,
        daysBefore: adjustedDays,
        dueDate: due(input.performanceDate, adjustedDays),
        completed: false,
      };
    })
    .sort((a, b) => b.daysBefore - a.daysBefore);
}

/**
 * 会员版自动重排：当某任务逾期未完成时，将其与所有依赖它的下游任务
 * 顺延到可行日期，同时保证不晚于演出日。返回新数组与调整说明。
 */
export function autoReschedule(
  tasks: ReverseScheduleTask[],
  performanceDate: string,
  today = new Date(),
): { tasks: ReverseScheduleTask[]; adjustments: string[] } {
  const adjustments: string[] = [];
  const todayIso = isoDate(today);
  const byTitle = new Map(tasks.map((t) => [t.title, t]));
  const newDueByTitle = new Map<string, string>();

  const resolveDue = (task: ReverseScheduleTask): string => {
    if (newDueByTitle.has(task.title)) return newDueByTitle.get(task.title)!;
    let dueDate = task.dueDate;

    // 逾期未完成 → 顺延到今天之后
    if (!task.completed && dueDate < todayIso && task.daysBefore > 0) {
      const shifted = new Date(`${todayIso}T12:00:00`);
      shifted.setDate(shifted.getDate() + Math.max(1, Math.ceil(task.durationDays / 2)));
      dueDate = isoDate(shifted);
    }

    // 依赖约束：不得早于任何上游任务的新截止日（截止日即完成点）
    for (const depTitle of task.dependsOn ?? []) {
      const dep = byTitle.get(depTitle);
      if (!dep) continue;
      const depDue = resolveDue(dep);
      if (dueDate < depDue) dueDate = depDue;
    }

    // 硬上限：不得晚于演出日
    if (dueDate > performanceDate) dueDate = performanceDate;

    if (dueDate !== task.dueDate) {
      adjustments.push(`「${task.title}」由 ${task.dueDate} 顺延至 ${dueDate}`);
    }
    newDueByTitle.set(task.title, dueDate);
    return dueDate;
  };

  const next = tasks.map((task) => {
    const dueDate = resolveDue(task);
    const perf = new Date(`${performanceDate}T12:00:00`);
    const d = new Date(`${dueDate}T12:00:00`);
    const daysBefore = Math.max(0, Math.round((perf.getTime() - d.getTime()) / 86_400_000));
    return { ...task, dueDate, daysBefore };
  });

  return { tasks: next.sort((a, b) => b.daysBefore - a.daysBefore), adjustments };
}
