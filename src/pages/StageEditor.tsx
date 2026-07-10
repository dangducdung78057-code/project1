import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Lock, Save, Download, ImageDown, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useStageEditorStore } from "@/stores/useStageEditorStore";
import { DotSketchCanvas } from "@/features/stage-editor/DotSketchCanvas";
import { Stage25DViewport } from "@/features/stage-editor/Stage25DViewport";
import { FORMATIONS } from "@/domain/stageos/formations";
import { getEntitlements, canUsePreview } from "@/domain/stageos/entitlements";
import { ReverseSchedulePanel } from "@/features/schedule/ReverseSchedulePanel";
import { useEntitlements } from "@/hooks/useEntitlements";
import type { MembershipTier, PreviewMode } from "@/domain/stageos/types";

function defaultPerformanceDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 45);
  return d.toISOString().slice(0, 10);
}

export default function StageEditor() {
  const { user } = useAuth();
  const tier = useStageEditorStore((s) => s.tier);
  const setTier = useStageEditorStore((s) => s.setTier);
  const stage = useStageEditorStore((s) => s.stage);
  const performers = useStageEditorStore((s) => s.performers);
  const applyTemplate = useStageEditorStore((s) => s.applyTemplate);
  const activeTemplateId = useStageEditorStore((s) => s.activeTemplateId);
  const setPerformerCount = useStageEditorStore((s) => s.setPerformerCount);
  const dirty = useStageEditorStore((s) => s.dirty);
  const markSaved = useStageEditorStore((s) => s.markSaved);
  const loadFormation = useStageEditorStore((s) => s.loadFormation);
  const setLedTitle = useStageEditorStore((s) => s.setLedTitle);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("dot-sketch");
  const [performanceDate, setPerformanceDate] = useState<string>(defaultPerformanceDate);

  // 免费版切回黑点草图（前端权益门控；服务端校验在保存/导出时兜底）
  useEffect(() => {
    if (!canUsePreview(tier, previewMode)) setPreviewMode("dot-sketch");
  }, [tier, previewMode]);

  // 登录后以服务端权益为准（user_entitlements 表，仅 service_role 可写）
  const serverEnt = useEntitlements();
  useEffect(() => {
    if (serverEnt.fromServer) setTier(serverEnt.tier);
  }, [serverEnt.fromServer, serverEnt.tier, setTier]);

  const ent = getEntitlements(tier);
  const visibleTemplates = FORMATIONS.filter((f) => !f.memberOnly || tier !== "free");
  const lockedTemplates = FORMATIONS.filter((f) => f.memberOnly && tier === "free");

  // 载入本人最近一次保存的队形（per-user RLS 保证只读到自己的数据）
  useEffect(() => {
    if (!user || loaded) return;
    (async () => {
      const { data, error } = await supabase
        .from("formation_snapshots" as any)
        .select("stage, performers, template_id")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error && data) {
        loadFormation({
          stage: (data as any).stage,
          performers: (data as any).performers,
          activeTemplateId: (data as any).template_id ?? null,
        });
        toast.info("已载入上次保存的队形");
      }
      setLoaded(true);
    })();
  }, [user, loaded, loadFormation]);

  const handleSave = useCallback(async () => {
    if (!user) {
      toast.error("请先登录后再保存队形");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.from("formation_snapshots" as any).insert({
        user_id: user.id,
        title: stage.ledTitle || "未命名队形",
        preview_mode: previewMode,
        template_id: activeTemplateId,
        stage: stage as any,
        performers: performers as any,
      });
      if (error) throw error;
      markSaved();
      toast.success("队形已保存到云端");
    } catch (e: any) {
      const msg: string = e?.message ?? "";
      if (msg.includes("ENTITLEMENT_DENIED")) {
        toast.error("服务端权益校验拒绝", { description: msg.replace(/^.*ENTITLEMENT_DENIED:\s*/, "") });
      } else {
        toast.error("保存失败", { description: msg || "数据库暂不可用，请稍后重试" });
      }
    } finally {
      setSaving(false);
    }
  }, [user, stage, performers, activeTemplateId, markSaved, previewMode]);

  const handleExportJson = useCallback(() => {
    const payload = {
      exportedAt: new Date().toISOString(),
      previewMode: "dot-sketch",
      templateId: activeTemplateId,
      stage,
      performers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stageos-formation-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("已导出队形 JSON");
  }, [stage, performers, activeTemplateId]);

  const handleExportPng = useCallback(() => {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas[role='application']");
    if (!canvas) {
      toast.error("画布未就绪");
      return;
    }
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `stageos-formation-${Date.now()}.png`;
    a.click();
    toast.success("已导出站位草图 PNG");
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 max-w-7xl mx-auto w-full">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-balance">队形编辑器</h1>
          <p className="text-sm text-muted-foreground">
            拖拽调整站位 · 统一米制坐标 · 匿名编号保护隐私
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as PreviewMode)}>
            <TabsList aria-label="预览模式切换">
              <TabsTrigger value="dot-sketch">黑点草图</TabsTrigger>
              <TabsTrigger value="stage-2.5d" disabled={!canUsePreview(tier, "stage-2.5d")}>
                {!canUsePreview(tier, "stage-2.5d") && <Lock className="h-3 w-3 mr-1" aria-hidden />}
                2.5D 舞台
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={tier} onValueChange={(v) => setTier(v as MembershipTier)}>
            <TabsList aria-label="会员档位切换（开发预览）">
              <TabsTrigger value="free">免费版</TabsTrigger>
              <TabsTrigger value="member">会员版</TabsTrigger>
              <TabsTrigger value="custom">定制版</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        <aside className="flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">队形模板</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {visibleTemplates.map((f) => (
                <Button
                  key={f.id}
                  variant={activeTemplateId === f.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => applyTemplate(f.id)}
                >
                  {f.name}
                  {f.memberOnly && <Badge variant="secondary" className="ml-auto text-[10px]">会员</Badge>}
                </Button>
              ))}
              {lockedTemplates.map((f) => (
                <Button key={f.id} variant="ghost" size="sm" className="justify-start opacity-60" disabled>
                  <Lock className="h-3 w-3 mr-1" aria-hidden />
                  {f.name}
                  <Badge variant="outline" className="ml-auto text-[10px]">会员解锁</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">演员人数</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
              <Input
                type="number"
                min={1}
                max={ent.maxPerformers}
                value={performers.length}
                onChange={(e) => setPerformerCount(Number(e.target.value) || 1)}
                aria-label="演员人数"
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">/ {ent.maxPerformers}</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">操作</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button size="sm" onClick={handleSave} disabled={saving || !dirty}>
                {saving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" aria-hidden /> : <Save className="h-4 w-4 mr-1" aria-hidden />}
                {dirty ? "保存到云端" : "已保存"}
              </Button>
              <Button size="sm" variant="outline" onClick={handleExportPng}>
                <ImageDown className="h-4 w-4 mr-1" aria-hidden />
                导出 PNG 草图
              </Button>
              <Button size="sm" variant="outline" onClick={handleExportJson}>
                <Download className="h-4 w-4 mr-1" aria-hidden />
                导出 JSON
              </Button>
              {tier !== "free" && (
                <Button size="sm" variant="secondary" asChild>
                  <Link to="/formation-3d">打开 3D 队形编辑器</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">演出日期</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="date"
                value={performanceDate}
                onChange={(e) => e.target.value && setPerformanceDate(e.target.value)}
                aria-label="演出日期"
              />
            </CardContent>
          </Card>

          <p className="text-[11px] leading-relaxed text-muted-foreground px-1">
            隐私说明：所有演员均使用匿名编号（S01…），本工具不采集姓名、照片等个人身份信息。数据仅保存在你自己的账号下。
          </p>
        </aside>

        <main className="min-h-[520px] rounded-lg border bg-card overflow-hidden" aria-label="队形画布区域">
          {previewMode === "stage-2.5d" && (
            <div className="flex items-center gap-2 border-b px-3 py-2">
              <label htmlFor="led-title" className="text-xs text-muted-foreground whitespace-nowrap">LED 屏标题</label>
              <Input
                id="led-title"
                value={stage.ledTitle}
                onChange={(e) => setLedTitle(e.target.value)}
                className="h-8 max-w-xs"
              />
            </div>
          )}
          <div className="h-[560px]">
            {previewMode === "stage-2.5d" ? <Stage25DViewport /> : <DotSketchCanvas />}
          </div>
        </main>
      </div>

      <ReverseSchedulePanel
        input={{
          performanceDate: performanceDate,
          performerCount: performers.length,
          rehearsalFrequencyPerWeek: 3,
        }}
        tier={tier}
      />
    </div>
  );
}
