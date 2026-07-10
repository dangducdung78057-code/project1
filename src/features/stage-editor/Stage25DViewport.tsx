import { useEffect, useRef } from "react";
import { Application, Container, Graphics, Text, TextStyle } from "pixi.js";
import { useStageEditorStore } from "@/stores/useStageEditorStore";
import { getOutfit } from "@/domain/stageos/outfits";
import type { Performer, StageConfiguration } from "@/domain/stageos/types";

/**
 * 会员版 2.5D 舞台预览（PixiJS 程序化绘制）。
 * 与黑点草图共用统一米制坐标 {x, z, riserLevel}；投影仅发生在渲染层。
 */

const X_SCALE = 62;
const Z_SCALE = 45;
const RISER_LIFT = 24;

function project(performer: Performer, width: number, height: number, depthM: number) {
  const depth = Math.max(0, Math.min(1, performer.position.z / depthM));
  return {
    x: width / 2 + performer.position.x * X_SCALE * (1 - depth * 0.1),
    y: height * 0.8 - performer.position.z * Z_SCALE - (performer.position.riserLevel ?? 0) * RISER_LIFT,
    scale: 1 - depth * 0.18,
    depth: performer.position.z + (performer.position.riserLevel ?? 0) * 0.15,
  };
}

function hexToNum(hex: string): number {
  return Number.parseInt(hex.replace("#", ""), 16);
}

function createPerformerGraphic(performer: Performer, selected: boolean): Container {
  const container = new Container();
  container.label = performer.id;
  container.eventMode = "static";
  container.cursor = "grab";

  const shadow = new Graphics().ellipse(0, 5, 18, 5).fill({ color: 0x000000, alpha: 0.18 });
  container.addChild(shadow);

  if (selected) {
    const ring = new Graphics().ellipse(0, 3, 24, 9).stroke({ color: 0xe0b448, width: 3, alpha: 1 });
    container.addChild(ring);
  }

  const outfit = getOutfit(performer.appearance.outfitId);
  const upper = hexToNum(performer.appearance.upperColor);
  const lower = hexToNum(performer.appearance.lowerColor);
  const shoe = hexToNum(performer.appearance.footwearColor);
  const accent = hexToNum(performer.appearance.accentColor);

  const body = new Graphics();
  // 头部
  body.circle(0, -49, 10).fill({ color: 0xf0c5a4 });
  // 上装
  const upperPart = outfit.parts.find((p) => p.slot === "upper");
  if (upperPart?.partKind === "jacket") {
    body.roundRect(-12, -39, 24, 30, 5).fill({ color: upper });
    body.poly([-4, -39, 4, -39, 0, -22]).fill({ color: 0xf5f2ea });
  } else {
    body.roundRect(-11, -39, 22, 29, 7).fill({ color: upper });
  }
  // 下装（裙 / 裤）
  const lowerPart = outfit.parts.find((p) => p.slot === "lower");
  if (lowerPart?.partKind === "skirt" || (lowerPart == null && performer.gender === "female")) {
    body.poly([-12, -11, 12, -11, 17, 8, -17, 8]).fill({ color: lower });
  } else {
    body.rect(-10, -11, 8, 25).fill({ color: lower });
    body.rect(2, -11, 8, 25).fill({ color: lower });
  }
  // 腿与鞋
  body.rect(-9, 13, 7, 15).fill({ color: 0xf0c5a4 });
  body.rect(2, 13, 7, 15).fill({ color: 0xf0c5a4 });
  body.roundRect(-12, 26, 11, 5, 2).fill({ color: shoe });
  body.roundRect(1, 26, 11, 5, 2).fill({ color: shoe });
  // 配饰
  const accentPart = outfit.parts.find((p) => p.slot === "accent" || p.slot === "headwear");
  if (accentPart?.partKind === "bowtie") {
    body.poly([-4, -38, 4, -38, 0, -34]).fill({ color: accent });
  } else if (accentPart?.partKind === "sash") {
    body.roundRect(-11, -26, 22, 4, 2).fill({ color: accent });
  } else if (accentPart?.partKind === "beret") {
    body.ellipse(0, -58, 11, 4).fill({ color: accent });
  }
  // 头发
  body.roundRect(-10, -62, 20, 11, 6).fill({ color: 0x20252e });

  container.addChild(body);

  const label = new Text({
    text: `${performer.id} · ${performer.heightCm}cm`,
    style: new TextStyle({
      fill: 0xf8fafc,
      fontSize: 10,
      fontFamily: "system-ui",
      fontWeight: "600",
      stroke: { color: 0x111827, width: 3 },
    }),
  });
  label.anchor.set(0.5, 1);
  label.y = -69;
  container.addChild(label);

  return container;
}

function drawScene(
  app: Application,
  width: number,
  height: number,
  stage: StageConfiguration,
  performers: Performer[],
  selectedIds: string[],
  handlers: {
    onSelect: (id: string) => void;
    onDragMove: (x: number, y: number) => void;
    onDragEnd: () => void;
    dragId: { current: string | null };
  },
) {
  app.stage.removeChildren();

  const backdrop = new Graphics().rect(0, 0, width, height).fill({ color: 0x07111f });
  app.stage.addChild(backdrop);

  // LED 背景屏
  const led = new Graphics()
    .roundRect(width * 0.18, height * 0.08, width * 0.64, height * 0.25, 18)
    .fill({ color: hexToNum(stage.backgroundColor) })
    .stroke({ color: 0x8fb7a3, alpha: 0.5, width: 2 });
  app.stage.addChild(led);

  const ledTitle = new Text({
    text: stage.ledTitle,
    style: new TextStyle({
      fill: 0xf5f1e8,
      fontFamily: "system-ui",
      fontSize: Math.max(14, width / 44),
      fontWeight: "600",
    }),
  });
  ledTitle.anchor.set(0.5);
  ledTitle.position.set(width / 2, height * 0.205);
  app.stage.addChild(ledTitle);

  // 舞台地面（透视梯形）
  const floor = new Graphics()
    .poly([
      width * 0.08, height * 0.86,
      width * 0.92, height * 0.86,
      width * 0.78, height * 0.33,
      width * 0.22, height * 0.33,
    ])
    .fill({ color: 0x29313b })
    .stroke({ color: 0x69717c, alpha: 0.65, width: 2 });
  app.stage.addChild(floor);

  // 合唱台阶
  for (let level = stage.riserLevels - 1; level >= 0; level -= 1) {
    const top = height * 0.49 + level * 54;
    const inset = 90 + level * 38;
    const riser = new Graphics()
      .roundRect(inset, top, width - inset * 2, 42, 7)
      .fill({ color: 0x414c59 })
      .stroke({ color: 0x718096, width: 1.5, alpha: 0.8 });
    app.stage.addChild(riser);
  }

  // 演员层（按深度排序，远处先画）
  const peopleLayer = new Container();
  const projected = performers
    .map((performer) => ({ performer, projection: project(performer, width, height, stage.depthM) }))
    .sort((a, b) => b.projection.depth - a.projection.depth);

  for (const item of projected) {
    const figure = createPerformerGraphic(item.performer, selectedIds.includes(item.performer.id));
    figure.position.set(item.projection.x, item.projection.y);
    figure.scale.set(item.projection.scale);
    figure.on("pointerdown", (event) => {
      handlers.dragId.current = item.performer.id;
      handlers.onSelect(item.performer.id);
      event.stopPropagation();
    });
    peopleLayer.addChild(figure);
  }
  app.stage.addChild(peopleLayer);

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on("pointerup", handlers.onDragEnd);
  app.stage.on("pointerupoutside", handlers.onDragEnd);
  app.stage.on("pointermove", (event) => {
    if (!handlers.dragId.current) return;
    handlers.onDragMove(event.global.x, event.global.y);
  });

  const audience = new Text({
    text: "观众席 ↓",
    style: new TextStyle({ fill: 0x9fb3c8, fontSize: 13, fontFamily: "system-ui" }),
  });
  audience.anchor.set(0.5);
  audience.position.set(width / 2, height - 18);
  app.stage.addChild(audience);
}

export function Stage25DViewport() {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const readyRef = useRef(false);
  const performers = useStageEditorStore((s) => s.performers);
  const selectedIds = useStageEditorStore((s) => s.selectedIds);
  const stage = useStageEditorStore((s) => s.stage);
  const selectOnly = useStageEditorStore((s) => s.selectOnly);
  const updatePosition = useStageEditorStore((s) => s.updatePosition);
  const dragId = useRef<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const app = new Application();
    appRef.current = app;

    void app
      .init({
        resizeTo: host,
        antialias: true,
        backgroundColor: 0x07111f,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      })
      .then(() => {
        if (cancelled) {
          app.destroy(true, { children: true });
          return;
        }
        host.replaceChildren(app.canvas);
        app.canvas.style.width = "100%";
        app.canvas.style.height = "100%";
        readyRef.current = true;
        // 初始渲染
        renderScene();
      });

    return () => {
      cancelled = true;
      readyRef.current = false;
      if (app.renderer) app.destroy(true, { children: true });
      appRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderScene() {
    const app = appRef.current;
    const host = hostRef.current;
    if (!app || !host || !readyRef.current || !app.renderer) return;
    const width = host.clientWidth;
    const height = host.clientHeight;
    const halfWidth = stage.widthM / 2 - 0.5;
    drawScene(app, width, height, stage, performers, selectedIds, {
      onSelect: selectOnly,
      onDragMove: (gx, gy) => {
        if (!dragId.current) return;
        const x = (gx - width / 2) / X_SCALE;
        const z = (height * 0.8 - gy) / Z_SCALE;
        updatePosition(dragId.current, {
          x: Math.max(-halfWidth, Math.min(halfWidth, x)),
          z: Math.max(0.5, Math.min(stage.depthM - 0.5, z)),
          riserLevel: Math.max(0, Math.min(stage.riserLevels, Math.round((z - 1) / 1.25))),
        });
      },
      onDragEnd: () => {
        dragId.current = null;
      },
      dragId,
    });
  }

  useEffect(() => {
    renderScene();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [performers, selectedIds, stage]);

  return <div ref={hostRef} className="w-full h-full" role="application" aria-label="会员版 2.5D 舞台预览，拖拽人物调整站位" />;
}
