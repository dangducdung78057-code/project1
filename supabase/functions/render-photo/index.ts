// StageOS 舞台效果图渲染 — 直连 Google Gemini API 调用图像生成模型。
// 校验链与 ai-generate-plan 一致:登录 -> 项目归属 -> 隐私确认 -> 输入校验,
// 然后按四路知识(队形/约束/传统色/场景规则)组装中文视觉 prompt 生成舞台效果图。
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { retrieveStageKnowledge } from "../_shared/stage-knowledge.ts";
import { retrievePresets } from "../_shared/palette-library.ts";
import { retrieveSceneRules } from "../_shared/stage-scene-rules.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
function reject(code: string, message: string, status: number) {
  return json({ ok: false, code, message }, status);
}

type StageInputData = {
  schoolStage?: string;
  programType?: string;
  programTheme?: string;
  screenThemeColor?: string;
  performerCount?: number;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return reject("METHOD_NOT_ALLOWED", "仅支持 POST。", 405);

  try {
    const body = await req.json().catch(() => ({}));
    if (body?.healthcheck === true) return json({ ok: true, code: "RENDER_HEALTHCHECK_OK" });

    const projectId: string | undefined = body?.projectId;
    const UUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!projectId || !UUID_RE.test(projectId)) return reject("BAD_REQUEST", "projectId 必填且需为 uuid。", 400);

    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return reject("UNAUTHORIZED", "请先登录后再渲染。", 401);
    const jwt = authHeader.slice("Bearer ".length);

    const anon = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: userData, error: uErr } = await anon.auth.getUser(jwt);
    if (uErr || !userData?.user) return reject("UNAUTHORIZED", "登录已失效，请重新登录。", 401);
    const uid = userData.user.id;

    const svc = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: project, error: pErr } = await svc
      .from("projects").select("id, user_id, title").eq("id", projectId).maybeSingle();
    if (pErr) throw pErr;
    if (!project || project.user_id !== uid) return reject("FORBIDDEN", "无权访问该项目。", 403);

    const { data: confirmed, error: cErr } = await svc
      .from("confirmation_records").select("id").eq("project_id", projectId).eq("status", "confirmed")
      .order("confirmed_at", { ascending: false }).limit(1);
    if (cErr) throw cErr;
    if (!confirmed || confirmed.length === 0) {
      return reject("CONFIRMATION_REQUIRED", "请先完成用户确认后再渲染效果图。", 403);
    }

    const { data: si, error: siErr } = await svc.from("stage_inputs").select("data").eq("project_id", projectId).maybeSingle();
    if (siErr) throw siErr;
    const input = (si?.data ?? {}) as StageInputData;

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return reject("AI_NOT_CONFIGURED", "AI 接口未配置(缺少 GEMINI_API_KEY)。", 503);

    // 组装视觉 prompt:队形 + 传统色 + LED 场景规则(不含任何学生个人信息)
    const retrieval = retrieveStageKnowledge({
      programType: input.programType,
      performerCount: input.performerCount,
      screenThemeColor: input.screenThemeColor,
      programTheme: input.programTheme,
    });
    const formation = retrieval.formations[0];
    const preset = retrievePresets(input.programType ?? "", input.programTheme ?? "", 1)[0];
    const scene = retrieveSceneRules(input.programType ?? "", input.programTheme ?? "", input.performerCount ?? 0);
    const led = scene.ledRules[0];

    const paletteDesc = preset
      ? `配色采用中国传统色「${preset.name}」:${preset.colors.map((c) => `${c.name_zh}(${c.hex})`).join("、")}`
      : `主色调为 ${input.screenThemeColor ?? "暖金色"}`;
    const formationDesc = formation
      ? `${input.performerCount ?? 20} 名学生按「${formation.name}」队形站位(${formation.summary})`
      : `${input.performerCount ?? 20} 名学生整齐站位`;
    const ledDesc = led ? `LED 大屏显示${led.tone},${led.dynamicMode}` : "LED 大屏显示柔和渐变背景";

    const prompt = [
      `校园${input.programType ?? "文艺"}演出舞台效果图,室内剧场,暖木色舞台地板,主题「${input.programTheme ?? "青春"}」。`,
      formationDesc + "。",
      paletteDesc + "。",
      ledDesc + "。",
      "专业舞台灯光(面光+侧光+顶光),观众席视角,写实摄影风格,16:9 宽幅,无文字水印。",
    ].join(" ");

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
      {
        method: "POST",
        headers: { "x-goog-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
        }),
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("[render-photo] gemini error:", res.status, errText.slice(0, 300));
      if (res.status === 429) return reject("RATE_LIMITED", "渲染请求过于频繁，请稍后再试。", 429);
      if (res.status === 402 || res.status === 403) return reject("CREDITS_EXHAUSTED", "AI 额度不足或密钥无效。", 402);
      return reject("AI_ERROR", "图像生成失败，请稍后重试。", 502);
    }

    const data = await res.json();
    const parts: Array<{ inlineData?: { mimeType?: string; data?: string } }> =
      data?.candidates?.[0]?.content?.parts ?? [];
    const img = parts.find((p) => p.inlineData?.data);
    if (!img?.inlineData?.data) return reject("AI_EMPTY", "模型未返回图像，请重试。", 502);
    const imageUrl = `data:${img.inlineData.mimeType ?? "image/png"};base64,${img.inlineData.data}`;

    return json({ ok: true, image: imageUrl, prompt });
  } catch (e) {
    console.error("[render-photo] error:", e instanceof Error ? e.message : String(e));
    return reject("INTERNAL", "渲染服务异常，请稍后重试。", 500);
  }
});
