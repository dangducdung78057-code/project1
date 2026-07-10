// 舞台设计知识面板:将四路知识模块(队形/约束/传统色/LED 场景规则)
// 以只读洞察卡的形式呈现在项目详情页。纯前端检索,不含任何 PII,无需确认解锁。
import { useMemo } from "react";
import { retrieveStageKnowledge } from "@/lib/stageKnowledge";
import { retrieveConstraints } from "@/lib/stageConstraints";
import { retrievePresets } from "@/lib/paletteLibrary";
import { retrieveSceneRules } from "@/lib/stageSceneRules";
import { ToneBadge } from "@/components/StatusBadge";
import type { StageInputData } from "@/lib/stageos";
import { Users, Ban, AlertTriangle, Palette, MonitorPlay, Grid3x3 } from "lucide-react";

export function StageDesignInsights({ input }: { input: StageInputData | null }) {
  const programType = input?.programType ?? "";
  const programTheme = input?.programTheme ?? "";
  const schoolStage = input?.schoolStage ?? "";
  const performerCount = input?.performerCount ?? 0;

  const knowledge = useMemo(
    () => retrieveStageKnowledge({ programType, programTheme, performerCount: performerCount || undefined }),
    [programType, programTheme, performerCount],
  );
  const constraints = useMemo(
    () => retrieveConstraints({ schoolStage, programType, programTheme }),
    [schoolStage, programType, programTheme],
  );
  const presets = useMemo(
    () => retrievePresets(programType, programTheme, 3),
    [programType, programTheme],
  );
  const scene = useMemo(
    () => retrieveSceneRules(programType, programTheme, performerCount),
    [programType, programTheme, performerCount],
  );

  if (!input) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        暂无项目输入数据。请先在编辑器中填写节目类型、学段等信息。
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground text-pretty">
        以下洞察由内置舞台知识库实时检索(原型:{knowledge.archetype};命中:{knowledge.matchedBy.join("、") || "默认"}),
        与 AI 生成排产使用同一套语料,可作为人工排产与审核参考。
      </p>

      {/* 约束规则 */}
      {(constraints.hardBlocks.length > 0 || constraints.softWarns.length > 0) && (
        <section className="panel" aria-labelledby="insights-constraints">
          <div className="panel-header">
            <h3 id="insights-constraints" className="text-sm font-semibold flex items-center gap-1.5">
              <Ban className="h-4 w-4 text-destructive" aria-hidden="true" />学段约束检查
            </h3>
            <ToneBadge tone={constraints.hardBlocks.length > 0 ? "destructive" : "warning"}>
              {constraints.hardBlocks.length} 硬禁止 / {constraints.softWarns.length} 软约束
            </ToneBadge>
          </div>
          <div className="panel-body space-y-2">
            {constraints.hardBlocks.map((r) => (
              <div key={r.rule_id} className="flex gap-2 text-xs">
                <Ban className="h-3.5 w-3.5 shrink-0 mt-0.5 text-destructive" aria-hidden="true" />
                <div>
                  <span className="font-medium">{r.blocked_items.join("、") || r.reason}</span>
                  {r.blocked_items.length > 0 && <span className="text-muted-foreground"> — {r.reason}</span>}
                  {r.alternative && <span className="text-muted-foreground">(替代:{r.alternative})</span>}
                </div>
              </div>
            ))}
            {constraints.softWarns.map((r) => (
              <div key={r.rule_id} className="flex gap-2 text-xs">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-warning" aria-hidden="true" />
                <div>
                  <span className="font-medium">{r.blocked_items.join("、") || r.reason}</span>
                  {r.blocked_items.length > 0 && <span className="text-muted-foreground"> — {r.reason}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 队形推荐 */}
        <section className="panel" aria-labelledby="insights-formations">
          <div className="panel-header">
            <h3 id="insights-formations" className="text-sm font-semibold flex items-center gap-1.5">
              <Grid3x3 className="h-4 w-4 text-primary" aria-hidden="true" />队形推荐
            </h3>
            <ToneBadge tone="info">{knowledge.formations.length} 套</ToneBadge>
          </div>
          <div className="panel-body space-y-2.5">
            {knowledge.formations.slice(0, 5).map((f) => (
              <div key={f.name} className="rounded border border-border p-2.5 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold">{f.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                    <Users className="h-3 w-3 inline mr-0.5" aria-hidden="true" />
                    {f.countRange[0]}-{f.countRange[1]} 人 · {f.rows} 排
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-pretty">{f.summary};{f.spacingRule}</p>
                <p className="text-[11px] text-muted-foreground text-pretty">{f.tips}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LED 场景规则 */}
        <section className="panel" aria-labelledby="insights-scene">
          <div className="panel-header">
            <h3 id="insights-scene" className="text-sm font-semibold flex items-center gap-1.5">
              <MonitorPlay className="h-4 w-4 text-primary" aria-hidden="true" />LED 大屏与场景安全
            </h3>
            {scene.formationRule && (
              <ToneBadge tone={performerCount > scene.formationRule.maxCount ? "warning" : "success"}>
                {performerCount > 0 ? `${performerCount} 人` : "人数未填"}
              </ToneBadge>
            )}
          </div>
          <div className="panel-body space-y-2.5 text-xs">
            {scene.ledRule ? (
              <div className="space-y-1">
                <div className="font-medium">{scene.ledRule.label} · LED 背景规则</div>
                <p className="text-muted-foreground text-pretty">动态:{scene.ledRule.dynamicMode}</p>
                <p className="text-muted-foreground text-pretty">色调:{scene.ledRule.colorAdvice}</p>
                <p className="text-muted-foreground text-pretty">内容:{scene.ledRule.contentAdvice}</p>
                <p className="text-destructive/80 text-pretty">禁止:{scene.ledRule.forbidden}</p>
                {scene.ledRule.special && <p className="text-muted-foreground text-pretty">特别:{scene.ledRule.special}</p>}
              </div>
            ) : (
              <p className="text-muted-foreground">未匹配到该节目类型的专属 LED 规则,适用通用规则。</p>
            )}
            {scene.formationRule && (
              <div className="space-y-1 border-t border-border pt-2">
                <div className="font-medium">人数与队形安全</div>
                <p className="text-muted-foreground">
                  最佳 {scene.formationRule.bestCount[0]}-{scene.formationRule.bestCount[1]} 人,上限 {scene.formationRule.maxCount} 人;
                  超限:{scene.formationRule.overflowStrategy}
                </p>
                {scene.formationRule.safety.map((s) => (
                  <p key={s} className="text-muted-foreground text-pretty">· {s}</p>
                ))}
              </div>
            )}
            {scene.crowdNotes.length > 0 && (
              <div className="space-y-1 border-t border-border pt-2">
                {scene.crowdNotes.map((n) => (
                  <p key={n} className="text-warning text-pretty">{n}</p>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 传统色方案 */}
      <section className="panel" aria-labelledby="insights-palettes">
        <div className="panel-header">
          <h3 id="insights-palettes" className="text-sm font-semibold flex items-center gap-1.5">
            <Palette className="h-4 w-4 text-primary" aria-hidden="true" />中国传统色方案(853 色库)
          </h3>
          <ToneBadge tone="info">{presets.length} 套</ToneBadge>
        </div>
        <div className="panel-body grid grid-cols-1 md:grid-cols-3 gap-3">
          {presets.map((p) => (
            <div key={p.name} className="rounded border border-border p-2.5 space-y-1.5">
              <div className="text-xs font-semibold">{p.name}</div>
              <div className="flex h-6 rounded overflow-hidden" role="img" aria-label={`${p.name} 配色条`}>
                {p.palette.map((c, i) => (
                  <div key={`${c.hex}-${i}`} className="flex-1" style={{ backgroundColor: c.hex }} title={`${c.name_zh} ${c.hex}`} />
                ))}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {p.palette.map((c) => c.name_zh).join(" · ")}
              </div>
              {p.formula && <div className="text-[11px] text-muted-foreground text-pretty">公式:{p.formula}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
