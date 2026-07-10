import { useEffect, useRef, type PointerEvent } from "react";
import { useStageEditorStore } from "@/stores/useStageEditorStore";

/**
 * 免费版黑点草图：米制坐标（x 向右、z 向舞台深处），画布仅作展示换算。
 * SCALE = 每米对应的像素数。
 */
const SCALE = 48;
const FRAME_PADDING = 22;
const FRONT_MARGIN = 58;

export function DotSketchCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const performers = useStageEditorStore((s) => s.performers);
  const selectedIds = useStageEditorStore((s) => s.selectedIds);
  const stage = useStageEditorStore((s) => s.stage);
  const selectOnly = useStageEditorStore((s) => s.selectOnly);
  const updatePosition = useStageEditorStore((s) => s.updatePosition);
  const dragging = useRef<string | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(rect.width * dpr)) {
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#f7f7f4";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // 一米网格
    ctx.strokeStyle = "#e0e0d8";
    ctx.lineWidth = 1;
    for (let x = ((rect.width / 2) % SCALE); x < rect.width; x += SCALE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = rect.height - FRONT_MARGIN; y > 0; y -= SCALE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // 舞台边框
    ctx.strokeStyle = "#7a7a75";
    ctx.lineWidth = 2;
    ctx.strokeRect(FRAME_PADDING, FRAME_PADDING, rect.width - FRAME_PADDING * 2, rect.height - FRAME_PADDING * 2);
    ctx.fillStyle = "#9a9a92";
    ctx.font = "11px system-ui";
    ctx.textAlign = "left";
    ctx.fillText(`舞台 ${stage.widthM}m x ${stage.depthM}m · 1 格 = 1 米`, FRAME_PADDING + 6, rect.height - 8);
    ctx.textAlign = "center";
    ctx.fillText("台口（观众方向）", rect.width / 2, rect.height - 8);

    for (const performer of performers) {
      const x = rect.width / 2 + performer.position.x * SCALE;
      const y = rect.height - FRONT_MARGIN - performer.position.z * SCALE;
      const selected = selectedIds.includes(performer.id);

      ctx.beginPath();
      ctx.arc(x, y, selected ? 10 : 7, 0, Math.PI * 2);
      ctx.fillStyle = "#111111";
      ctx.fill();

      if (selected) {
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = "#d8a93b";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.fillStyle = "#222";
      ctx.font = "11px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(performer.id, x, y - 13);
    }
  }, [performers, selectedIds, stage]);

  function pointerToStage(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = ref.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left - rect.width / 2) / SCALE,
      z: (rect.height - FRONT_MARGIN - (event.clientY - rect.top)) / SCALE,
    };
  }

  function hit(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = ref.current!;
    const rect = canvas.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    return [...performers].reverse().find((performer) => {
      const x = rect.width / 2 + performer.position.x * SCALE;
      const y = rect.height - FRONT_MARGIN - performer.position.z * SCALE;
      return Math.hypot(px - x, py - y) <= 18;
    });
  }

  const halfWidth = stage.widthM / 2 - 0.5;

  return (
    <canvas
      ref={ref}
      className="w-full h-full touch-none cursor-crosshair rounded-md"
      role="application"
      aria-label="黑点草图队形编辑画布，拖拽黑点调整演员站位"
      onPointerDown={(event) => {
        const performer = hit(event);
        dragging.current = performer?.id ?? null;
        selectOnly(performer?.id ?? null);
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragging.current) return;
        const next = pointerToStage(event);
        updatePosition(dragging.current, {
          x: Math.max(-halfWidth, Math.min(halfWidth, next.x)),
          z: Math.max(0.5, Math.min(stage.depthM - 0.5, next.z)),
          riserLevel: Math.max(0, Math.min(stage.riserLevels, Math.round((next.z - 1) / 1.25))),
        });
      }}
      onPointerUp={(event) => {
        dragging.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
    />
  );
}
