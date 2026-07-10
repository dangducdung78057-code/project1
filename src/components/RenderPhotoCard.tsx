import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

/** 舞台效果图 AI 渲染卡片:调用 render-photo 边缘函数生成写实效果图 */
export function RenderPhotoCard({ projectId }: { projectId: string }) {
  const [busy, setBusy] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const generate = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("render-photo", {
        body: { projectId },
      });
      if (error) {
        // FunctionsHttpError 时尝试解析后端返回的中文提示
        const ctx = (error as { context?: Response }).context;
        if (ctx && typeof ctx.json === "function") {
          const payload = await ctx.json().catch(() => null);
          if (payload?.message) { toast.error(payload.message); return; }
        }
        const msg = error.message ?? "";
        if (msg.includes("not found") || msg.includes("404")) {
          toast.error("渲染函数尚未部署：请先部署 render-photo 边缘函数");
        } else {
          toast.error("渲染失败，请稍后重试");
        }
        return;
      }
      if (!data?.ok || !data?.image) {
        toast.error(data?.message ?? "模型未返回图像，请重试");
        return;
      }
      setImage(data.image as string);
      toast.success("舞台效果图已生成");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      {image ? (
        <figure className="space-y-2">
          <img
            src={image || "/placeholder.svg"}
            alt="AI 生成的舞台效果图:按项目队形、传统色配色与 LED 背景规则渲染"
            className="w-full rounded border border-border"
          />
          <figcaption className="flex items-center justify-between gap-2">
            <span className="text-2xs text-muted-foreground">按项目队形 · 传统色 · LED 规则渲染</span>
            <span className="flex gap-1.5">
              <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" onClick={generate} disabled={busy}>
                {busy ? <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> : <RefreshCw className="h-3 w-3" aria-hidden="true" />}
                重新生成
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" asChild>
                <a href={image} download="stageos-render.png">
                  <Download className="h-3 w-3" aria-hidden="true" />下载
                </a>
              </Button>
            </span>
          </figcaption>
        </figure>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 rounded border border-dashed border-border py-8">
          <ImageIcon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
          <p className="text-xs text-muted-foreground text-center text-pretty px-4">
            基于项目的队形、传统色配色与 LED 场景规则，AI 生成写实舞台效果图
          </p>
          <Button size="sm" className="h-8 text-xs" onClick={generate} disabled={busy}>
            {busy ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />生成中（约 10-20 秒）</>
            ) : (
              <><ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />生成舞台效果图</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
