"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Circle, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { MembershipTier } from "@/domain/stageos/types";
import {
  buildReverseSchedule,
  autoReschedule,
  type ReverseScheduleTask,
  type ScheduleBuildInput,
} from "@/domain/stageos/schedule";

// schedule_tasks 尚未纳入生成的 Supabase 类型；bind 保留 this，避免方法剥离丢失客户端实例
const fromTable = (supabase.from as (t: string) => ReturnType<typeof supabase.from>).bind(supabase);

const CATEGORY_COLORS: Record<string, string> = {
  策划: "bg-primary/80",
  方案: "bg-primary/65",
  队形: "bg-primary/50",
  服装: "bg-foreground/60",
  采购: "bg-foreground/45",
  舞台: "bg-muted-foreground/60",
  排练: "bg-muted-foreground/45",
  现场: "bg-destructive/60",
  演出: "bg-primary",
  预演: "bg-primary/40",
  视觉: "bg-foreground/30",
  走位: "bg-muted-foreground/35",
  安全: "bg-destructive/45",
};

type Props = {
  input: ScheduleBuildInput;
  tier: MembershipTier;
};

export function ReverseSchedulePanel({ input, tier }: Props) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ReverseScheduleTask[]>(() => buildReverseSchedule(input, tier));
  const [view, setView] = useState<"list" | "gantt">("list");
  const isMember = tier !== "free";

  // tier / input 变化时重建
  const rebuildKey = `${tier}-${input.performanceDate}-${input.performerCount}-${input.rehearsalFrequencyPerWeek}`;
  const [lastKey, setLastKey] = useState(rebuildKey);
  if (rebuildKey !== lastKey) {
    setLastKey(rebuildKey);
    setTasks(buildReverseSchedule(input, tier));
    if (view === "gantt" && tier === "free") setView("list");
  }

  // 登录后从云端恢复本演出日期下的完成状态（RLS 仅本人可读）
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await fromTable("schedule_tasks")
        .select("task_key, completed")
        .eq("user_id", user.id)
        .eq("performance_date", input.performanceDate);
      if (cancelled || error || !data) return;
      const done = new Map((data as unknown as { task_key: string; completed: boolean }[]).map((r) => [r.task_key, r.completed]));
      if (done.size > 0) {
        setTasks((prev) => prev.map((t) => (done.has(t.title) ? { ...t, completed: done.get(t.title)! } : t)));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, input.performanceDate, lastKey]);

  const toggleTask = (id: string) => {
    if (!isMember) {
      toast.info("免费版倒排计划为只读清单，升级会员可勾选进度与自动重排。");
      return;
    }
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    const nextCompleted = !target.completed;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t)));

    // 云端持久化（未登录仅本地生效）
    if (user) {
      void fromTable("schedule_tasks")
        .upsert(
          {
            user_id: user.id,
            performance_date: input.performanceDate,
            task_key: target.title,
            title: target.title,
            due_date: target.dueDate,
            completed: nextCompleted,
            completed_at: nextCompleted ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,performance_date,task_key" },
        )
        .then(({ error }) => {
          if (error) toast.error("进度同步失败", { description: error.message });
        });
    }
  };

  const handleReschedule = () => {
    const { tasks: next, adjustments } = autoReschedule(tasks, input.performanceDate);
    setTasks(next);
    if (adjustments.length === 0) {
      toast.success("所有任务均在计划内，无需调整。");
    } else {
      toast.success(`已自动重排 ${adjustments.length} 项任务`, {
        description: adjustments.slice(0, 3).join("；") + (adjustments.length > 3 ? " 等" : ""),
      });
    }
  };

  // 甘特图范围
  const gantt = useMemo(() => {
    if (tasks.length === 0) return null;
    const maxDays = Math.max(...tasks.map((t) => t.daysBefore + t.durationDays));
    return { maxDays: Math.max(maxDays, 1) };
  }, [tasks]);

  return (
    <section className="rounded-lg border bg-card" aria-label="倒排计划">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" aria-hidden />
          <h3 className="text-sm font-semibold">倒排计划</h3>
          <Badge variant="outline">{tier === "free" ? "免费版 · 只读" : "会员版"}</Badge>
        </div>
        <div className="flex items-center gap-2">
          {isMember && (
            <Button size="sm" variant="outline" onClick={handleReschedule}>
              <RefreshCw className="h-3.5 w-3.5 mr-1" aria-hidden />
              自动重排
            </Button>
          )}
          <Tabs value={view} onValueChange={(v) => setView(v as "list" | "gantt")}>
            <TabsList aria-label="倒排视图切换">
              <TabsTrigger value="list">清单</TabsTrigger>
              <TabsTrigger value="gantt" disabled={!isMember}>
                {!isMember && <Lock className="h-3 w-3 mr-1" aria-hidden />}
                甘特图
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {view === "list" ? (
        <ul className="divide-y">
          {tasks.map((task) => (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-muted/50 transition-colors"
                aria-pressed={task.completed}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                )}
                <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{task.dueDate}</span>
                <span className="flex-1 min-w-0">
                  <span className={`block text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                    {task.memberOnly && (
                      <Badge variant="secondary" className="ml-2 text-[10px]">
                        会员
                      </Badge>
                    )}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {task.category} · {task.owner} · D-{task.daysBefore}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        gantt && (
          <div className="overflow-x-auto p-4" role="img" aria-label="倒排计划甘特图">
            <div className="min-w-[560px] space-y-1.5">
              {tasks.map((task) => {
                const startPct = (1 - (task.daysBefore + task.durationDays) / (gantt.maxDays + 2)) * 100;
                const widthPct = Math.max((task.durationDays / (gantt.maxDays + 2)) * 100, 2);
                return (
                  <div key={task.id} className="flex items-center gap-2">
                    <span className="w-44 shrink-0 truncate text-xs" title={task.title}>
                      {task.title}
                    </span>
                    <div className="relative h-5 flex-1 rounded bg-muted/60">
                      <div
                        className={`absolute top-0 h-full rounded ${CATEGORY_COLORS[task.category] ?? "bg-primary/70"} ${task.completed ? "opacity-45" : ""}`}
                        style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                        title={`${task.dueDate} · ${task.durationDays} 天`}
                      />
                    </div>
                    <span className="w-20 shrink-0 font-mono text-[10px] text-muted-foreground">{task.dueDate}</span>
                  </div>
                );
              })}
              <p className="pt-2 text-[10px] text-muted-foreground">
                横轴：距演出日剩余时间（右端为演出日 {input.performanceDate}）；条块长度为任务工期。
              </p>
            </div>
          </div>
        )
      )}
    </section>
  );
}
