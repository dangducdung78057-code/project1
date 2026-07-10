// 3D 队形编辑器:深色 UI + 3D 舞台网格 + 可拖拽人物代理。
// 功能:点击选中、拖拽移动(自动吸附网格)、一键应用队形预设(方阵/弧形/圆形/V字/金字塔)、
// 实时视线遮挡推演(评委视点 Occlusion Simulation)、关键帧时间轴动线推演(贝塞尔避让 + Ghost Trails)。
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useThree, useFrame, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Grid, Html, Line } from "@react-three/drei";
import { StageLighting, type LightMode } from "@/components/StageLighting";
import { OutdoorFieldScene, type FieldType } from "@/components/OutdoorFieldScene";
import { StudentGlbModel } from "@/components/StudentGlbModel";
import { UNIVERSAL_FORMATIONS, STAGE_KNOWLEDGE } from "@/lib/stageKnowledge";
import type { ColorPalette } from "@/lib/stageKnowledge";
import { FORMATION_COMPUTES, gridPositions, type FormationCompute } from "@/lib/formationLayouts";
import * as THREE from "three";
import { create } from "zustand";
import {
  LayoutGrid,
  Circle as CircleIcon,
  Spline,
  ChevronsDown,
  Triangle,
  Users,
  Magnet,
  RotateCcw,
  MoveHorizontal,
  Play,
  Pause,
  Plus,
  Trash2,
  Eye,
  Terminal,
  Lamp,
  MonitorPlay,
  Sun,
  ChevronsUp,
  Diamond,
  MoveUpRight,
  Columns2,
  Rows3,
  Shirt,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------- 数据 ----------

type Performer = {
  id: string;
  gender: "male" | "female";
  heightCm: number;
  /** 舞台坐标(米):x 横向,z 纵向(正值朝观众) */
  x: number;
  z: number;
};

const MALE_COLOR = "#5b8fd4";

/** HEX 颜色明度调整(amount 为 -1~1,负值加深) */
function shadeHex(hex: string, amount: number): string {
  const v = hex.replace("#", "");
  const num = parseInt(v.length === 3 ? v.split("").map((c) => c + c).join("") : v, 16);
  const adj = (ch: number) => Math.max(0, Math.min(255, Math.round(amount < 0 ? ch * (1 + amount) : ch + (255 - ch) * amount)));
  const r = adj((num >> 16) & 255);
  const g = adj((num >> 8) & 255);
  const b = adj(num & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
const FEMALE_COLOR = "#e88ba0";
const ACCENT = "#3aa89e";
const STAGE_W = 20; // 米
const STAGE_D = 12;
const BOUND_X = STAGE_W / 2 - 1;
const BOUND_Z = STAGE_D / 2 - 0.6;

function pseudoHeight(i: number): number {
  return 143 + ((i * 37 + 11) % 11);
}

/** 当前名单人数配置(可由嵌入方按项目真实数据覆盖) */
let rosterConfig = { males: 16, females: 20 };

/** 生成名单(默认 16 男 / 20 女),高个在后 */
function buildRoster(): Omit<Performer, "x" | "z">[] {
  const list: Omit<Performer, "x" | "z">[] = [];
  let males = rosterConfig.males;
  let females = rosterConfig.females;
  const total = males + females;
  for (let i = 0; i < total; i++) {
    let gender: "male" | "female";
    if (males <= 0) gender = "female";
    else if (females <= 0) gender = "male";
    else gender = i % 2 === 0 ? "male" : "female";
    if (gender === "male") males--;
    else females--;
    list.push({ id: `S${String(i + 1).padStart(2, "0")}`, gender, heightCm: pseudoHeight(i) });
  }
  list.sort((a, b) => b.heightCm - a.heightCm);
  return list.map((p, i) => ({ ...p, id: `S${String(i + 1).padStart(2, "0")}` }));
}

// ---------- 队形预设(来自知识库 UNIVERSAL_FORMATIONS,全部 18 种) ----------

type Preset = { id: string; name: string; icon: React.ReactNode; summary: string; compute: FormationCompute };

/** 按队形名关键词匹配图标 */
function presetIcon(name: string): React.ReactNode {
  if (name.includes("方阵")) return <LayoutGrid size={16} />;
  if (name.includes("倒V")) return <ChevronsUp size={16} />;
  if (name.includes("V字")) return <ChevronsDown size={16} />;
  if (name.includes("扇形")) return <Spline size={16} />;
  if (name.includes("菱形")) return <Diamond size={16} />;
  if (name.includes("圆") || name.includes("环")) return <CircleIcon size={16} />;
  if (name.includes("斜线")) return <MoveUpRight size={16} />;
  if (name.includes("十字")) return <Plus size={16} />;
  if (name.includes("金字塔") || name.includes("梯形")) return <Triangle size={16} />;
  if (name.includes("弧形")) return <Spline size={16} />;
  if (name.includes("分组") || name.includes("分区") || name.includes("三区")) return <Columns2 size={16} />;
  return <Rows3 size={16} />;
}

const PRESETS: Preset[] = UNIVERSAL_FORMATIONS.map((f) => ({
  id: f.name,
  name: f.name,
  icon: presetIcon(f.name),
  summary: f.summary,
  compute: FORMATION_COMPUTES[f.name] ?? gridPositions,
}));

// ---------- 时间轴关键帧(动线推演) ----------

const DURATION = 30; // 秒

type Keyframe = { time: number; positions: Record<string, [number, number]> };

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** 二次贝塞尔插值:中点垂直偏移形成弧线动线,奇偶分流避免舞台中央穿模碰撞 */
function samplePos(kfs: Keyframe[], id: string, t: number): [number, number] {
  if (kfs.length === 0) return [0, 0];
  if (t <= kfs[0].time) return kfs[0].positions[id] ?? [0, 0];
  const last = kfs[kfs.length - 1];
  if (t >= last.time) return last.positions[id] ?? [0, 0];
  let i = 0;
  while (i + 1 < kfs.length - 1 && kfs[i + 1].time <= t) i++;
  const a = kfs[i];
  const b = kfs[i + 1];
  const u0 = (t - a.time) / (b.time - a.time);
  const u = u0 * u0 * (3 - 2 * u0); // smoothstep 缓动
  const p0 = a.positions[id] ?? [0, 0];
  const p1 = b.positions[id] ?? p0;
  const dx = p1[0] - p0[0];
  const dz = p1[1] - p0[1];
  const len = Math.hypot(dx, dz);
  if (len < 0.01) return p0;
  // 控制点:中点 + 垂直方向偏移(按 id 哈希分左右两侧绕行)
  const side = hashId(id) % 2 === 0 ? 1 : -1;
  const amp = Math.min(1.6, len * 0.28);
  const cx = (p0[0] + p1[0]) / 2 + (-dz / len) * amp * side;
  const cz = (p0[1] + p1[1]) / 2 + (dx / len) * amp * side;
  const s = 1 - u;
  const x = s * s * p0[0] + 2 * s * u * cx + u * u * p1[0];
  const z = s * s * p0[1] + 2 * s * u * cz + u * u * p1[1];
  return [Math.max(-BOUND_X, Math.min(BOUND_X, x)), Math.max(-BOUND_Z, Math.min(BOUND_Z, z))];
}

// ---------- 实时视线遮挡推演引擎(Occlusion Simulation, THREE.Raycaster) ----------

/** 虚拟评委/主摄像机:舞台正前方 10m 外、视线高 1.2m(坐姿评委) */
const JUDGE = { x: 0, y: 1.2, z: STAGE_D / 2 + 10 };
/** 每个学生占据半径 0.3 米的物理判定空间 */
const BODY_RADIUS = 0.3;

/** 演员实际身高(米):heightCm 按 150cm 基准映射到舞台比例 */
function performerHeightM(p: Performer): number {
  return (p.heightCm / 150) * 1.7;
}

// 模块级复用对象,避免每帧推演重复分配
const _raycaster = new THREE.Raycaster();
const _judgeVector = new THREE.Vector3();
const _faceVector = new THREE.Vector3();
const _direction = new THREE.Vector3();

/**
 * 实时视线遮挡推演:在内存中快速构建"虚拟判定圆柱体"(极低开销,不走 GPU 渲染),
 * 从评委视点向每个学生的脸部(身高 90% 处,眼睛/脸部而非头顶)发射射线;
 * 若射线击中的第一个人不是目标本身,且在目标之前(0.1m 容差防圆柱半径自身误判),判定被遮挡。
 */
function computeOcclusions(perfs: Performer[]): Map<string, string> {
  const res = new Map<string, string>();
  if (perfs.length === 0) return res;

  _judgeVector.set(JUDGE.x, JUDGE.y, JUDGE.z);

  // 1. 构建虚拟判定圆柱体(圆柱原点在中心,Y 上移一半高度使脚底贴地)
  const colliders = perfs.map((p) => {
    const heightInMeters = performerHeightM(p);
    const geometry = new THREE.CylinderGeometry(BODY_RADIUS, BODY_RADIUS, heightInMeters, 8);
    const mesh = new THREE.Mesh(geometry);
    mesh.position.set(p.x, heightInMeters / 2, p.z);
    mesh.updateMatrixWorld();
    // 绑定数据,供射线击中时读取
    mesh.userData = { id: p.id };
    return mesh;
  });

  // 2. 遍历检测:从评委视线看向每一个学生的脸部
  for (const target of perfs) {
    const targetHeight = performerHeightM(target);
    // 目标靶点:取身高的 90% 处(大约是眼睛/脸部的位置)
    _faceVector.set(target.x, targetHeight * 0.9, target.z);
    _direction.subVectors(_faceVector, _judgeVector).normalize();
    _raycaster.set(_judgeVector, _direction);

    // 发射射线,检测穿透了内存中的哪些圆柱体(intersects 按距离由近到远排序)
    const intersects = _raycaster.intersectObjects(colliders, false);
    if (intersects.length > 0) {
      const firstHit = intersects[0];
      // 击中的第一个人不是目标本身,说明被前面的人挡住了
      if (firstHit.object.userData.id !== target.id) {
        // 容差判断:确保障碍物真的在目标之前(防止圆柱半径引起的自身误判)
        const distanceToTarget = _judgeVector.distanceTo(_faceVector);
        if (firstHit.distance < distanceToTarget - 0.1) {
          res.set(target.id, firstHit.object.userData.id as string);
        }
      }
    }
  }

  // 3. 内存清理,防止几何体泄漏
  for (const mesh of colliders) mesh.geometry.dispose();

  return res;
}

// ---------- 状态 ----------

type EditorState = {
  performers: Performer[];
  /** 遮挡报警列表:被挡者 id → 遮挡者 id(站位每次变化即同步重算) */
  occlusions: Map<string, string>;
  selectedId: string | null;
  draggingId: string | null;
  snap: boolean;
  spacing: number;
  activePreset: string;
  keyframes: Keyframe[];
  currentTime: number;
  playing: boolean;
  select: (id: string | null) => void;
  setDragging: (id: string | null) => void;
  move: (id: string, x: number, z: number) => void;
  setSnap: (v: boolean) => void;
  setSpacing: (v: number) => void;
  applyPreset: (presetId: string) => void;
  setTime: (t: number) => void;
  tick: (dt: number) => void;
  togglePlay: () => void;
  captureKeyframe: () => void;
  removeKeyframe: (time: number) => void;
  setRoster: (males: number, females: number) => void;
  lightMode: LightMode;
  themeColor: string;
  setLightMode: (m: LightMode) => void;
  setThemeColor: (c: string) => void;
  costume: ColorPalette | null;
  setCostume: (p: ColorPalette | null) => void;
  /** 室外场地类型(草地/跑道) */
  fieldType: FieldType;
  /** 室外模拟时间(0-24 小时) */
  timeOfDay: number;
  setFieldType: (f: FieldType) => void;
  setTimeOfDay: (t: number) => void;
};

function clampSnap(v: number, bound: number, snap: boolean): number {
  const c = Math.max(-bound, Math.min(bound, v));
  return snap ? Math.round(c * 2) / 2 : Math.round(c * 100) / 100;
}

function withPreset(presetId: string, spacing: number): Performer[] {
  const roster = buildRoster();
  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const pos = preset.compute(roster.length, spacing);
  return roster.map((p, i) => ({
    ...p,
    x: clampSnap(pos[i]?.[0] ?? 0, BOUND_X, true),
    z: clampSnap(pos[i]?.[1] ?? 0, BOUND_Z, true),
  }));
}

/** 将 performers 数组转为关键帧 positions 映射 */
function capturePositions(perfs: Performer[]): Record<string, [number, number]> {
  return Object.fromEntries(perfs.map((p) => [p.id, [p.x, p.z] as [number, number]]));
}

/** 初始时间轴:0s 直线方阵 → 15s 同心圆 → 30s V 字纵深 */
function initialKeyframes(spacing: number): Keyframe[] {
  return [
    { time: 0, positions: capturePositions(withPreset("标准方阵式", spacing)) },
    { time: 15, positions: capturePositions(withPreset("同心圆环式", spacing)) },
    { time: 30, positions: capturePositions(withPreset("V字展开式", spacing)) },
  ];
}

/** 按时间轴插值出所有人的站位 */
function performersAt(perfs: Performer[], kfs: Keyframe[], t: number): Performer[] {
  return perfs.map((p) => {
    const [x, z] = samplePos(kfs, p.id, t);
    return { ...p, x, z };
  });
}

/** 站位变化时同步产出新站位 + 遮挡警告(内存纯数学计算,瞬间完成,不会卡顿) */
function withOcclusions(performers: Performer[]): { performers: Performer[]; occlusions: Map<string, string> } {
  return { performers, occlusions: computeOcclusions(performers) };
}

const INITIAL_PERFORMERS = withPreset("标准方阵式", 1.8);

const useEditorStore = create<EditorState>((set, get) => ({
  performers: INITIAL_PERFORMERS,
  occlusions: computeOcclusions(INITIAL_PERFORMERS),
  selectedId: null,
  draggingId: null,
  snap: true,
  spacing: 1.8,
  activePreset: "标准方阵式",
  keyframes: initialKeyframes(1.8),
  currentTime: 0,
  playing: false,
  select: (id) => set({ selectedId: id }),
  setDragging: (id) => set({ draggingId: id }),
  // 拖拽改变坐标时:1. 更新该人坐标 2. 坐标一更新立刻重算遮挡警告
  move: (id, x, z) =>
    set((s) =>
      withOcclusions(
        s.performers.map((p) =>
          p.id === id ? { ...p, x: clampSnap(x, BOUND_X, s.snap), z: clampSnap(z, BOUND_Z, s.snap) } : p,
        ),
      ),
    ),
  setSnap: (v) => set({ snap: v }),
  setSpacing: (v) => set({ spacing: v, ...withOcclusions(withPreset(get().activePreset, v)) }),
  applyPreset: (presetId) => set({ activePreset: presetId, ...withOcclusions(withPreset(presetId, get().spacing)) }),
  setTime: (t) => {
    const s = get();
    const ct = Math.max(0, Math.min(DURATION, t));
    set({ currentTime: ct, ...withOcclusions(performersAt(s.performers, s.keyframes, ct)) });
  },
  tick: (dt) => {
    const s = get();
    let nt = s.currentTime + dt;
    if (nt >= DURATION) nt -= DURATION; // 循环播放
    set({ currentTime: nt, ...withOcclusions(performersAt(s.performers, s.keyframes, nt)) });
  },
  togglePlay: () => {
    const s = get();
    if (!s.playing) {
      // 开始播放前先跳到当前时间点的插值站位
      set({ playing: true, ...withOcclusions(performersAt(s.performers, s.keyframes, s.currentTime)) });
    } else {
      set({ playing: false });
    }
  },
  captureKeyframe: () => {
    const s = get();
    const time = Math.round(s.currentTime * 2) / 2;
    const kf: Keyframe = { time, positions: capturePositions(s.performers) };
    const rest = s.keyframes.filter((k) => Math.abs(k.time - time) > 0.25);
    set({ keyframes: [...rest, kf].sort((a, b) => a.time - b.time) });
  },
  removeKeyframe: (time) => {
    const s = get();
    if (s.keyframes.length <= 2) return; // 至少保留两个关键帧
    set({ keyframes: s.keyframes.filter((k) => k.time !== time) });
  },
  lightMode: "indoor" as LightMode,
  themeColor: "#3aa89e",
  setLightMode: (m) => set({ lightMode: m }),
  setThemeColor: (c) => set({ themeColor: c }),
  costume: null,
  setCostume: (p) => set({ costume: p }),
  fieldType: "grass" as FieldType,
  timeOfDay: 14,
  setFieldType: (f) => set({ fieldType: f }),
  setTimeOfDay: (t) => set({ timeOfDay: Math.max(0, Math.min(24, t)) }),
  setRoster: (males, females) => {
    if (rosterConfig.males === males && rosterConfig.females === females) return;
    rosterConfig = { males: Math.max(0, males), females: Math.max(0, females) };
    const s = get();
    set({
      ...withOcclusions(withPreset(s.activePreset, s.spacing)),
      keyframes: initialKeyframes(s.spacing),
      selectedId: null,
      currentTime: 0,
      playing: false,
    });
  },
}));

// ---------- 3D 场景 ----------

const DRAG_PLANE = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

function PerformerFigure({ p, occludedBy }: { p: Performer; occludedBy?: string }) {
  const selectedId = useEditorStore((s) => s.selectedId);
  const select = useEditorStore((s) => s.select);
  const setDragging = useEditorStore((s) => s.setDragging);
  const move = useEditorStore((s) => s.move);
  const playing = useEditorStore((s) => s.playing);
  const { gl } = useThree();
  const dragging = useRef(false);
  const hitPoint = useRef(new THREE.Vector3());

  const isSelected = selectedId === p.id;
  const isOccluded = Boolean(occludedBy);
  const costume = useEditorStore((s) => s.costume);
  // 服装色系:女生着主色、男生着辅色(与知识库色板 primary/secondary 精确对应)
  const color = costume
    ? p.gender === "male"
      ? costume.secondaryHex
      : costume.primaryHex
    : p.gender === "male"
      ? MALE_COLOR
      : FEMALE_COLOR;
  // 男生下装:选择色系时用主色加深,默认深灰蓝
  const malePants = costume ? shadeHex(costume.primaryHex, -0.45) : "#4a5568";
  // 女生裙摆:点缀色
  const skirtColor = costume ? costume.accentHex : color;
  const h = (p.heightCm / 150) * 1.7; // 身高(米)

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    select(p.id);
    if (playing) return; // 播放中仅可选中,不可拖拽
    dragging.current = true;
    setDragging(p.id);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    gl.domElement.style.cursor = "grabbing";
  };
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    e.stopPropagation();
    if (e.ray.intersectPlane(DRAG_PLANE, hitPoint.current)) {
      move(p.id, hitPoint.current.x, hitPoint.current.z);
    }
  };
  const endDrag = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    e.stopPropagation();
    dragging.current = false;
    setDragging(null);
    gl.domElement.style.cursor = "auto";
  };

  return (
    <group position={[p.x, 0, p.z]}>
      {/* 选中光环 */}
      {isSelected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.42, 0.56, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.9} />
        </mesh>
      ) : null}
      {/* 遮挡警示光环(红色) */}
      {isOccluded ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[0.3, 0.4, 48]} />
          <meshBasicMaterial color="#e5484d" transparent opacity={0.95} />
        </mesh>
      ) : null}
      {/* 底座 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
        <circleGeometry args={[0.38, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.28} />
      </mesh>
      {/* 命中区(大范围,便于拖拽) */}
      <mesh
        position={[0, h / 2, 0]}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        visible={false}
      >
        <cylinderGeometry args={[0.5, 0.5, h + 0.4, 8]} />
      </mesh>
      {/* ---- 人物造型:.glb 卡通学生模型(useGLTF + SkeletonUtils.clone,真实身高比例) ---- */}
      <Suspense fallback={null}>
        <StudentGlbModel
          gender={p.gender}
          heightM={h}
          colors={{ top: color, bottom: malePants, accent: skirtColor }}
          selected={isSelected}
        />
      </Suspense>
      {/* 编号标签 */}
      <Html distanceFactor={11} position={[0, h + 0.42, 0]} center zIndexRange={[40, 0]}>
        <div
          className={cn(
            "pointer-events-none rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold whitespace-nowrap",
            isOccluded
              ? "bg-[#e5484d] text-white"
              : isSelected
                ? "bg-[#3aa89e] text-[#06211f]"
                : "bg-[#11141a]/85 text-[#9fb3c8]",
          )}
        >
          {p.id}
        </div>
      </Html>
    </group>
  );
}

/** 播放驱动:useFrame 逐帧推进时间轴 */
function TimelineDriver() {
  const playing = useEditorStore((s) => s.playing);
  const tick = useEditorStore((s) => s.tick);
  useFrame((_, dt) => {
    if (playing) tick(Math.min(dt, 0.1));
  });
  return null;
}

/** 选中人物的完整动线轨迹(Ghost Trail):沿贝塞尔路径采样画在地板上 */
function GhostTrail() {
  const selectedId = useEditorStore((s) => s.selectedId);
  const keyframes = useEditorStore((s) => s.keyframes);

  const points = useMemo(() => {
    if (!selectedId) return null;
    const pts: THREE.Vector3[] = [];
    for (let t = 0; t <= DURATION + 0.001; t += 0.25) {
      const [x, z] = samplePos(keyframes, selectedId, Math.min(t, DURATION));
      pts.push(new THREE.Vector3(x, 0.05, z));
    }
    return pts;
  }, [selectedId, keyframes]);

  const markers = useMemo(() => {
    if (!selectedId) return [];
    return keyframes.map((kf) => ({ time: kf.time, pos: kf.positions[selectedId] ?? ([0, 0] as [number, number]) }));
  }, [selectedId, keyframes]);

  if (!points) return null;
  return (
    <group>
      <Line points={points} color={ACCENT} lineWidth={2} dashed dashSize={0.35} gapSize={0.18} transparent opacity={0.85} />
      {markers.map((m) => (
        <mesh key={m.time} position={[m.pos[0], 0.06, m.pos[1]]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
          <planeGeometry args={[0.28, 0.28]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/** 虚拟评委席标记 + 到选中人物的视线(被遮挡时变红) */
function JudgeMarker({ occlusions }: { occlusions: Map<string, string> }) {
  const selectedId = useEditorStore((s) => s.selectedId);
  const performers = useEditorStore((s) => s.performers);
  const selected = performers.find((p) => p.id === selectedId);
  const blocked = selected ? occlusions.has(selected.id) : false;

  return (
    <group>
      {/* 评委席台 */}
      <mesh position={[JUDGE.x, 0.35, JUDGE.z]} castShadow>
        <boxGeometry args={[2.4, 0.7, 1]} />
        <meshStandardMaterial color="#2b303b" roughness={0.7} />
      </mesh>
      {/* 视点(眼睛高度) */}
      <mesh position={[JUDGE.x, JUDGE.y, JUDGE.z]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#f5c542" emissive="#f5c542" emissiveIntensity={0.6} />
      </mesh>
      <Html position={[JUDGE.x, JUDGE.y + 0.55, JUDGE.z]} center zIndexRange={[10, 0]}>
        <div className="pointer-events-none flex items-center gap-1.5 rounded-md bg-[#11141a]/85 px-2.5 py-1 text-[11px] whitespace-nowrap text-[#f5c542]">
          <Eye size={12} />
          评委视点
        </div>
      </Html>
      {/* 视线:评委 → 选中人物头部 */}
      {selected ? (
        <Line
          points={[
            new THREE.Vector3(JUDGE.x, JUDGE.y, JUDGE.z),
            new THREE.Vector3(selected.x, (selected.heightCm / 150) * 1.7, selected.z),
          ]}
          color={blocked ? "#e5484d" : "#f5c542"}
          lineWidth={1.5}
          dashed
          dashSize={0.3}
          gapSize={0.15}
          transparent
          opacity={0.75}
        />
      ) : null}
    </group>
  );
}

/** 各光照模式对应的场景背景/雾色 */
const MODE_BG: Record<LightMode, string> = {
  indoor: "#1f1c18",
  led: "#101318",
  outdoor: "#2a3240",
};

function StageScene() {
  const performers = useEditorStore((s) => s.performers);
  const draggingId = useEditorStore((s) => s.draggingId);
  const select = useEditorStore((s) => s.select);
  const lightMode = useEditorStore((s) => s.lightMode);
  const themeColor = useEditorStore((s) => s.themeColor);
  const fieldType = useEditorStore((s) => s.fieldType);
  const timeOfDay = useEditorStore((s) => s.timeOfDay);
  // 遮挡报警由 store 在站位变化时同步产出,这里直接订阅(单一数据源)
  const occlusions = useEditorStore((s) => s.occlusions);
  const isOutdoor = lightMode === "outdoor";
  const bg = MODE_BG[lightMode];

  return (
    <>
      {/* 室外模式由 Sky 天空穹顶接管背景,不设纯色背景与雾 */}
      {!isOutdoor ? (
        <>
          <color attach="background" args={[bg]} />
          <fog attach="fog" args={[bg, 26, 46]} />
        </>
      ) : null}
      <OrbitControls
        makeDefault
        enabled={!draggingId}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.15}
        minDistance={8}
        maxDistance={34}
        enablePan={false}
        target={[0, 0, 0]}
      />
      {isOutdoor ? (
        <OutdoorFieldScene fieldType={fieldType} timeOfDay={timeOfDay} />
      ) : (
        <StageLighting mode={lightMode} themeColor={themeColor} />
      )}

      {/* 室内/LED:深色舞台地面;室外:地表由 OutdoorFieldScene 渲染 */}
      {!isOutdoor ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow onPointerDown={() => select(null)}>
          <planeGeometry args={[STAGE_W + 6, STAGE_D + 6]} />
          <meshStandardMaterial color="#242830" roughness={0.92} />
        </mesh>
      ) : (
        /* 室外模式下仍需一块透明拾取平面,用于点击空白取消选中与拖拽投射 */
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} onPointerDown={() => select(null)}>
          <planeGeometry args={[STAGE_W + 6, STAGE_D + 6]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
      {/* 舞台边界描边 */}
      <lineSegments position={[0, 0.015, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(STAGE_W, 0.001, STAGE_D)]} />
        <lineBasicMaterial color={ACCENT} transparent opacity={isOutdoor ? 0.85 : 0.5} />
      </lineSegments>
      {!isOutdoor ? (
        <Grid
          position={[0, 0, 0]}
          args={[STAGE_W, STAGE_D]}
          cellSize={1}
          cellThickness={0.7}
          cellColor="#3a4150"
          sectionSize={5}
          sectionThickness={1.2}
          sectionColor="#4c5568"
          fadeDistance={38}
          fadeStrength={1}
          infiniteGrid
        />
      ) : null}
      {/* 观众方向指示 */}
      <Html position={[0, 0.02, STAGE_D / 2 + 1.6]} center zIndexRange={[10, 0]}>
        <div className="pointer-events-none rounded-md bg-[#11141a]/80 px-3 py-1 text-xs tracking-widest whitespace-nowrap text-[#9fb3c8]">
          观众席 ↓
        </div>
      </Html>

      {performers.map((p) => (
        <PerformerFigure key={p.id} p={p} occludedBy={occlusions.get(p.id)} />
      ))}

      <TimelineDriver />
      <GhostTrail />
      <JudgeMarker occlusions={occlusions} />
    </>
  );
}

// ---------- 2D UI ----------

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-[#2b303b] bg-[#1d2027]/95 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.35)] backdrop-blur", className)}>
      {children}
    </div>
  );
}

function FormationsPanel() {
  const activePreset = useEditorStore((s) => s.activePreset);
  const applyPreset = useEditorStore((s) => s.applyPreset);
  const spacing = useEditorStore((s) => s.spacing);
  const setSpacing = useEditorStore((s) => s.setSpacing);
  const performers = useEditorStore((s) => s.performers);
  const maleCount = performers.filter((p) => p.gender === "male").length;

  return (
    <Panel className="pointer-events-auto absolute top-6 bottom-40 left-6 z-10 flex w-72 flex-col overflow-hidden">
      <h2 className="mb-1 shrink-0 text-lg font-bold tracking-tight text-[#f0f3f6]">
        队形预设
        <span className="ml-2 align-middle font-mono text-[11px] font-normal text-[#6b7686]">{PRESETS.length} 种通用队形</span>
      </h2>
      {/* 当前选中队形标签 */}
      <div className="mb-3 flex shrink-0 items-center gap-1.5 text-xs text-[#9fb3c8]">
        <span>当前:</span>
        <span className="flex items-center gap-1 rounded-full bg-[#3aa89e]/15 px-2.5 py-0.5 font-medium text-[#7fd4cb]">
          <Check size={12} />
          {activePreset}
        </span>
      </div>
      {/* 整个面板内容统一滚动:队形网格 + 间距 + 服装 + 灯光,任何屏幕高度都不会互相遮挡 */}
      <div className="-mr-2 min-h-0 flex-1 overflow-y-auto pr-2">
        {/* 18 种队形两列网格,点击即实时切换预览 */}
        <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label="队形预设">
          {PRESETS.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => applyPreset(preset.id)}
                title={preset.summary}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-lg border px-1.5 py-2 text-center text-[11px] leading-tight font-medium transition-colors",
                  isActive
                    ? "border-[#3aa89e]/50 bg-[#3aa89e]/15 text-[#7fd4cb]"
                    : "border-[#2b303b] text-[#c7d2de] hover:bg-[#262b34]",
                )}
              >
                <span className={cn("rounded-md p-1", isActive ? "bg-[#3aa89e]/25 text-[#7fd4cb]" : "bg-[#262b34] text-[#9fb3c8]")}>
                  {preset.icon}
                </span>
                {preset.name}
                {isActive ? (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3aa89e] text-[#10201d]">
                    <Check size={11} strokeWidth={3} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="mt-4 border-t border-[#2b303b] pt-3">
          <label htmlFor="spacing" className="mb-2 flex items-center gap-2 text-xs font-medium text-[#9fb3c8]">
            <MoveHorizontal size={14} />
            间距 {spacing.toFixed(1)}m
          </label>
          <input
            id="spacing"
            type="range"
            min={1.2}
            max={2.6}
            step={0.1}
            value={spacing}
            onChange={(e) => setSpacing(Number(e.target.value))}
            className="w-full accent-[#3aa89e]"
          />
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-[#262b34] px-3 py-2 text-xs text-[#9fb3c8]">
          <Users size={15} />
          <span>
            共 {performers.length} 人 · 男 {maleCount} / 女 {performers.length - maleCount}
          </span>
        </div>
        <CostumeSection />
        <LightingSection />
      </div>
    </Panel>
  );
}

/** 全部知识库服装色系(按名称去重) */
const COSTUME_PALETTES: ColorPalette[] = (() => {
  const seen = new Set<string>();
  const out: ColorPalette[] = [];
  for (const prog of STAGE_KNOWLEDGE) {
    for (const pal of prog.palettes) {
      if (seen.has(pal.name)) continue;
      seen.add(pal.name);
      out.push(pal);
    }
  }
  return out;
})();

/** 服装色系选择:女生着主色、男生着辅色、裙摆点缀色 */
function CostumeSection() {
  const costume = useEditorStore((s) => s.costume);
  const setCostume = useEditorStore((s) => s.setCostume);

  return (
    <div className="mt-4 border-t border-[#2b303b] pt-3">
      <span className="mb-2 flex items-center gap-2 text-xs font-medium text-[#9fb3c8]">
        <Shirt size={14} />
        服装色系
        {costume ? <span className="ml-auto font-mono text-[10px] text-[#7fd4cb]">{costume.name}</span> : null}
      </span>
      <div className="-mr-1 flex max-h-32 flex-col gap-1 overflow-y-auto pr-1">
        <button
          type="button"
          onClick={() => setCostume(null)}
          aria-pressed={!costume}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-[12px] transition-colors",
            !costume ? "border-[#3aa89e]/50 bg-[#3aa89e]/15 text-[#7fd4cb]" : "border-transparent text-[#c7d2de] hover:bg-[#262b34]",
          )}
        >
          <span className="flex gap-0.5">
            <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: MALE_COLOR }} />
            <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: FEMALE_COLOR }} />
          </span>
          默认(蓝粉区分)
        </button>
        {COSTUME_PALETTES.map((pal) => (
          <button
            key={pal.name}
            type="button"
            onClick={() => setCostume(pal)}
            aria-pressed={costume?.name === pal.name}
            title={pal.note}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-md border px-2.5 py-1.5 text-left text-[12px] transition-colors",
              costume?.name === pal.name
                ? "border-[#3aa89e]/50 bg-[#3aa89e]/15 text-[#7fd4cb]"
                : "border-transparent text-[#c7d2de] hover:bg-[#262b34]",
            )}
          >
            <span className="flex gap-0.5">
              <span className="h-3.5 w-3.5 rounded-full border border-white/15" style={{ backgroundColor: pal.primaryHex }} />
              <span className="h-3.5 w-3.5 rounded-full border border-white/15" style={{ backgroundColor: pal.secondaryHex }} />
              <span className="h-3.5 w-3.5 rounded-full border border-white/15" style={{ backgroundColor: pal.accentHex }} />
            </span>
            {pal.name}
          </button>
        ))}
      </div>
    </div>
  );
}

const LIGHT_MODES: { id: LightMode; name: string; icon: React.ReactNode }[] = [
  { id: "indoor", name: "室内暖光", icon: <Lamp size={14} /> },
  { id: "led", name: "LED 大屏", icon: <MonitorPlay size={14} /> },
  { id: "outdoor", name: "室外日光", icon: <Sun size={14} /> },
];

const LED_THEME_COLORS = ["#3aa89e", "#e05d7a", "#4a7fd4", "#c9a227", "#7a5dc7"];

/** 灯光模式切换 + LED 主题色选择 */
function LightingSection() {
  const lightMode = useEditorStore((s) => s.lightMode);
  const setLightMode = useEditorStore((s) => s.setLightMode);
  const themeColor = useEditorStore((s) => s.themeColor);
  const setThemeColor = useEditorStore((s) => s.setThemeColor);

  return (
    <div className="mt-5 border-t border-[#2b303b] pt-4">
      <span className="mb-2 block text-xs font-medium text-[#9fb3c8]">舞台灯光</span>
      <div className="flex gap-1.5" role="group" aria-label="灯光模式">
        {LIGHT_MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setLightMode(m.id)}
            aria-pressed={lightMode === m.id}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-lg border px-1 py-2 text-[11px] font-medium transition-colors",
              lightMode === m.id
                ? "border-[#3aa89e]/50 bg-[#3aa89e]/15 text-[#7fd4cb]"
                : "border-transparent bg-[#262b34] text-[#9fb3c8] hover:bg-[#2c323d]",
            )}
          >
            {m.icon}
            {m.name}
          </button>
        ))}
      </div>
      {lightMode === "led" ? (
        <div className="mt-3">
          <span className="mb-2 block text-[11px] text-[#9fb3c8]">大屏主题色</span>
          <div className="flex items-center gap-2" role="group" aria-label="大屏主题色">
            {LED_THEME_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setThemeColor(c)}
                aria-label={`主题色 ${c}`}
                aria-pressed={themeColor === c}
                className={cn(
                  "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                  themeColor === c ? "border-white" : "border-transparent",
                )}
                style={{ backgroundColor: c }}
              />
            ))}
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              aria-label="自定义主题色"
              className="h-7 w-7 cursor-pointer rounded-full border border-[#343a47] bg-transparent"
            />
          </div>
        </div>
      ) : null}
      {lightMode === "outdoor" ? <OutdoorControls /> : null}
    </div>
  );
}

/** 室外场景控制:场地类型 + 模拟时间(太阳位置) */
function OutdoorControls() {
  const fieldType = useEditorStore((s) => s.fieldType);
  const setFieldType = useEditorStore((s) => s.setFieldType);
  const timeOfDay = useEditorStore((s) => s.timeOfDay);
  const setTimeOfDay = useEditorStore((s) => s.setTimeOfDay);

  return (
    <div className="mt-3">
      <span className="mb-2 block text-[11px] text-[#9fb3c8]">场地类型</span>
      <div className="flex gap-1.5" role="group" aria-label="场地类型">
        {(
          [
            { id: "grass", name: "草地", color: "#4ade80" },
            { id: "track", name: "跑道", color: "#c2554a" },
          ] as const
        ).map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFieldType(f.id)}
            aria-pressed={fieldType === f.id}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-[11px] font-medium transition-colors",
              fieldType === f.id
                ? "border-[#3aa89e]/50 bg-[#3aa89e]/15 text-[#7fd4cb]"
                : "border-transparent bg-[#262b34] text-[#9fb3c8] hover:bg-[#2c323d]",
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: f.color }} />
            {f.name}
          </button>
        ))}
      </div>
      <label htmlFor="time-of-day" className="mt-3 mb-1.5 flex items-center justify-between text-[11px] text-[#9fb3c8]">
        <span>模拟时间</span>
        <span className="font-mono text-[#c7d2de]">
          {String(Math.floor(timeOfDay)).padStart(2, "0")}:{String(Math.round((timeOfDay % 1) * 60)).padStart(2, "0")}
          {timeOfDay > 6 && timeOfDay < 18 ? " 白昼" : " 夜间"}
        </span>
      </label>
      <input
        id="time-of-day"
        type="range"
        min={5}
        max={20}
        step={0.5}
        value={timeOfDay}
        onChange={(e) => setTimeOfDay(Number(e.target.value))}
        className="w-full accent-[#3aa89e]"
      />
    </div>
  );
}

function PropertiesPanel() {
  const selectedId = useEditorStore((s) => s.selectedId);
  const performers = useEditorStore((s) => s.performers);
  const move = useEditorStore((s) => s.move);
  const snap = useEditorStore((s) => s.snap);
  const setSnap = useEditorStore((s) => s.setSnap);
  const applyPreset = useEditorStore((s) => s.applyPreset);
  const activePreset = useEditorStore((s) => s.activePreset);
  const selected = performers.find((p) => p.id === selectedId);

  const inputClass =
    "w-full rounded-lg border border-[#343a47] bg-[#262b34] px-3 py-2 text-sm text-[#f0f3f6] outline-none focus:border-[#3aa89e] focus:ring-1 focus:ring-[#3aa89e]";

  return (
    <Panel className="pointer-events-auto absolute top-6 right-6 z-10 w-72">
      <h2 className="mb-4 text-lg font-bold tracking-tight text-[#f0f3f6]">属性</h2>
      {selected ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-[#262b34] px-3 py-2.5">
            <span
              className="h-3.5 w-3.5 shrink-0 rounded-full"
              style={{ backgroundColor: selected.gender === "male" ? MALE_COLOR : FEMALE_COLOR }}
              aria-hidden
            />
            <div className="text-sm font-semibold text-[#f0f3f6]">{selected.id}</div>
            <div className="ml-auto text-xs text-[#9fb3c8]">
              {selected.gender === "male" ? "男" : "女"} · {selected.heightCm}cm
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="posX" className="mb-1.5 block text-xs font-medium text-[#9fb3c8]">
                横向 X (m)
              </label>
              <input
                id="posX"
                type="number"
                step={0.5}
                value={selected.x}
                onChange={(e) => move(selected.id, Number(e.target.value), selected.z)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="posZ" className="mb-1.5 block text-xs font-medium text-[#9fb3c8]">
                纵深 Z (m)
              </label>
              <input
                id="posZ"
                type="number"
                step={0.5}
                value={selected.z}
                onChange={(e) => move(selected.id, selected.x, Number(e.target.value))}
                className={inputClass}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-[#9fb3c8]">点击舞台上的人物进行选择,拖拽可移动站位</p>
      )}
      <div className="mt-5 flex flex-col gap-2 border-t border-[#2b303b] pt-4">
        <button
          type="button"
          onClick={() => setSnap(!snap)}
          aria-pressed={snap}
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-colors",
            snap
              ? "border-[#3aa89e]/50 bg-[#3aa89e]/15 text-[#7fd4cb]"
              : "border-[#343a47] text-[#c7d2de] hover:bg-[#262b34]",
          )}
        >
          <Magnet size={16} />
          网格吸附 {snap ? "开" : "关"}
        </button>
        <button
          type="button"
          onClick={() => applyPreset(activePreset)}
          className="flex items-center gap-3 rounded-lg border border-[#343a47] px-3.5 py-2.5 text-sm font-medium text-[#c7d2de] transition-colors hover:bg-[#262b34]"
        >
          <RotateCcw size={16} />
          重置当前队形
        </button>
      </div>
    </Panel>
  );
}

/** 时间轴面板:播放/暂停、进度条、关键帧管理 */
function TimelinePanel() {
  const currentTime = useEditorStore((s) => s.currentTime);
  const playing = useEditorStore((s) => s.playing);
  const keyframes = useEditorStore((s) => s.keyframes);
  const setTime = useEditorStore((s) => s.setTime);
  const togglePlay = useEditorStore((s) => s.togglePlay);
  const captureKeyframe = useEditorStore((s) => s.captureKeyframe);
  const removeKeyframe = useEditorStore((s) => s.removeKeyframe);

  return (
    <Panel className="pointer-events-auto absolute bottom-6 left-1/2 z-10 w-[min(660px,calc(100vw-3rem))] -translate-x-1/2 !p-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "暂停" : "播放"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3aa89e] text-[#06211f] transition-colors hover:bg-[#4dbfb4]"
        >
          {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <span className="w-20 shrink-0 font-mono text-sm text-[#f0f3f6]">
          {currentTime.toFixed(1)}s<span className="text-[#9fb3c8]"> / {DURATION}s</span>
        </span>
        <div className="relative flex-1">
          <input
            type="range"
            min={0}
            max={DURATION}
            step={0.1}
            value={currentTime}
            onChange={(e) => setTime(Number(e.target.value))}
            aria-label="时间轴进度"
            className="w-full accent-[#3aa89e]"
          />
          {/* 关键帧标记 */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-1 h-2">
            {keyframes.map((kf) => (
              <span
                key={kf.time}
                className="absolute h-2 w-2 -translate-x-1/2 rotate-45 bg-[#f5c542]"
                style={{ left: `${(kf.time / DURATION) * 100}%` }}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={captureKeyframe}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#343a47] px-3 py-2 text-xs font-medium text-[#c7d2de] transition-colors hover:bg-[#262b34]"
        >
          <Plus size={14} />
          记录关键帧
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#2b303b] pt-3">
        <span className="text-xs text-[#9fb3c8]">关键帧:</span>
        {keyframes.map((kf) => (
          <span
            key={kf.time}
            className="flex items-center gap-1 rounded-full bg-[#262b34] py-1 pr-1 pl-2.5 font-mono text-[11px] text-[#c7d2de]"
          >
            <button type="button" onClick={() => setTime(kf.time)} className="hover:text-[#7fd4cb]">
              {kf.time}s
            </button>
            {keyframes.length > 2 ? (
              <button
                type="button"
                onClick={() => removeKeyframe(kf.time)}
                aria-label={`删除 ${kf.time}s 关键帧`}
                className="rounded-full p-0.5 text-[#9fb3c8] hover:bg-[#343a47] hover:text-[#e5484d]"
              >
                <Trash2 size={11} />
              </button>
            ) : null}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-[#6b7686]">拖拽站位后点「记录关键帧」写入当前时间点</span>
      </div>
    </Panel>
  );
}

/** Occlusion Status 终端面板:实时输出遮挡警告 */
function OcclusionPanel() {
  const performers = useEditorStore((s) => s.performers);
  // 直接订阅 store 中的报警列表(站位一变即已同步重算,无需组件内再计算)
  const occlusions = useEditorStore((s) => s.occlusions);
  const warnings = useMemo(() => {
    const byId = new Map(performers.map((p) => [p.id, p]));
    return Array.from(occlusions.entries()).map(([id, byWhom]) => ({
      id,
      byWhom,
      h1: byId.get(id)?.heightCm ?? 0,
      h2: byId.get(byWhom)?.heightCm ?? 0,
    }));
  }, [occlusions, performers]);

  return (
    <Panel className="pointer-events-auto absolute right-6 bottom-6 z-10 w-80 !p-0">
      <div className="flex items-center gap-2 border-b border-[#2b303b] px-4 py-2.5">
        <Terminal size={14} className="text-[#7fd4cb]" />
        <span className="font-mono text-xs font-semibold tracking-wide text-[#f0f3f6]">OCCLUSION STATUS</span>
        <span
          className={cn(
            "ml-auto rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
            warnings.length > 0 ? "bg-[#e5484d]/20 text-[#ff8a8e]" : "bg-[#3aa89e]/20 text-[#7fd4cb]",
          )}
        >
          {warnings.length > 0 ? `${warnings.length} WARN` : "CLEAR"}
        </span>
      </div>
      <div className="max-h-36 overflow-y-auto px-4 py-2.5 font-mono text-[11px] leading-relaxed">
        {warnings.length === 0 ? (
          <p className="text-[#7fd4cb]">[OK] 评委视线无遮挡,所有人可见。</p>
        ) : (
          warnings.map((w) => (
            <p key={w.id} className="text-[#ff8a8e]">
              [WARN] {w.id} ({w.h1}cm) 被 {w.byWhom} ({w.h2}cm) 遮挡,建议换位。
            </p>
          ))
        )}
      </div>
    </Panel>
  );
}

// ---------- 可嵌入编辑器 ----------

/** 可嵌入的 3D 队形编辑器:放入任意 relative 容器��可,支持传入真实男���人数 */
export function Formation3DEditor({
  maleCount,
  femaleCount,
  className,
}: {
  maleCount?: number;
  femaleCount?: number;
  className?: string;
}) {
  const dpr = useMemo<[number, number]>(() => [1, 1.8], []);
  const setRoster = useEditorStore((s) => s.setRoster);

  // 按项目真实人数重建名单
  useEffect(() => {
    if (maleCount !== undefined && femaleCount !== undefined && maleCount + femaleCount > 0) {
      setRoster(maleCount, femaleCount);
    }
  }, [maleCount, femaleCount, setRoster]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#181b21] font-sans", className)}>
      <FormationsPanel />
      <PropertiesPanel />
      <TimelinePanel />
      <OcclusionPanel />
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={dpr} camera={{ position: [0, 11, 15], fov: 45 }}>
          <StageScene />
        </Canvas>
      </div>
      <div className="pointer-events-none absolute top-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[#2b303b] bg-[#1d2027]/90 px-5 py-2 text-xs whitespace-nowrap text-[#9fb3c8] backdrop-blur">
        拖拽人物调整站位 · 选中查看动线轨迹 · 红环 = 被评委视线遮挡
      </div>
    </div>
  );
}

// ---------- 页面 ----------

export default function Formation3D() {
  return (
    <main className="h-screen w-full">
      <h1 className="sr-only">3D 队形编辑器</h1>
      <Formation3DEditor />
    </main>
  );
}
