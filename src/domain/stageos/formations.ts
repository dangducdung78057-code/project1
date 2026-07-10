import type { Performer, StagePosition } from "./types";

export type FormationTemplateId =
  | "three-rows"
  | "arc"
  | "v-shape"
  | "heart"
  | "four-rows"
  | "fan"
  | "dual-camp"
  | "square";

export type FormationTemplate = {
  id: FormationTemplateId;
  name: string;
  memberOnly?: boolean;
  generate: (performers: Performer[]) => Record<string, StagePosition>;
};

function rows(
  performers: Performer[],
  rowCount: number,
  width = 9,
): Record<string, StagePosition> {
  const result: Record<string, StagePosition> = {};
  const perRow = Math.ceil(performers.length / rowCount);
  performers.forEach((p, index) => {
    const row = Math.floor(index / perRow);
    const inRow = index % perRow;
    const actual = Math.min(perRow, performers.length - row * perRow);
    result[p.id] = {
      x: actual <= 1 ? 0 : -width / 2 + (width * inRow) / (actual - 1),
      z: 1.2 + row * 1.25,
      riserLevel: row,
    };
  });
  return result;
}

export const FORMATIONS: FormationTemplate[] = [
  {
    id: "three-rows",
    name: "标准三排",
    generate: (p) => rows(p, 3, 8.5),
  },
  {
    id: "arc",
    name: "弧形环抱",
    generate: (performers) => {
      const out: Record<string, StagePosition> = {};
      const count = performers.length;
      performers.forEach((p, i) => {
        const t = count <= 1 ? 0.5 : i / (count - 1);
        const angle = Math.PI * (0.12 + t * 0.76);
        out[p.id] = {
          x: Math.cos(angle) * 5.2,
          z: 1.2 + Math.sin(angle) * 3.2,
          riserLevel: i % 3,
        };
      });
      return out;
    },
  },
  {
    id: "v-shape",
    name: "动态 V 形",
    generate: (performers) => {
      const out: Record<string, StagePosition> = {};
      const mid = (performers.length - 1) / 2;
      performers.forEach((p, i) => {
        const offset = i - mid;
        out[p.id] = {
          x: offset * 0.55,
          z: 1.1 + Math.abs(offset) * 0.35,
          riserLevel: Math.min(4, Math.floor(Math.abs(offset) / 4)),
        };
      });
      return out;
    },
  },
  {
    id: "heart",
    name: "心形",
    generate: (performers) => {
      const out: Record<string, StagePosition> = {};
      const n = performers.length;
      performers.forEach((p, i) => {
        const t = (Math.PI * 2 * i) / Math.max(n, 1);
        const x = 16 * Math.sin(t) ** 3;
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);
        out[p.id] = { x: x / 3.2, z: 4.8 - y / 4.2, riserLevel: 0 };
      });
      return out;
    },
  },
  {
    id: "four-rows",
    name: "四排大合唱",
    memberOnly: true,
    generate: (p) => rows(p, 4, 10),
  },
  {
    id: "fan",
    name: "扇形展开",
    memberOnly: true,
    generate: (performers) => {
      const out: Record<string, StagePosition> = {};
      performers.forEach((p, i) => {
        const ring = Math.floor(i / 10);
        const index = i % 10;
        const angle = Math.PI * (0.15 + (index / 9) * 0.7);
        const radius = 2.2 + ring * 1.35;
        out[p.id] = {
          x: Math.cos(angle) * radius,
          z: 0.6 + Math.sin(angle) * radius,
          riserLevel: ring,
        };
      });
      return out;
    },
  },
  {
    id: "dual-camp",
    name: "双阵营",
    memberOnly: true,
    generate: (performers) => {
      const out: Record<string, StagePosition> = {};
      const half = Math.ceil(performers.length / 2);
      performers.forEach((p, i) => {
        const side = i < half ? -1 : 1;
        const local = i < half ? i : i - half;
        out[p.id] = {
          x: side * (2.2 + (local % 5) * 0.72),
          z: 1.1 + Math.floor(local / 5) * 1.15,
          riserLevel: Math.floor(local / 5),
        };
      });
      return out;
    },
  },
  {
    id: "square",
    name: "纪律方阵",
    memberOnly: true,
    generate: (p) => rows(p, Math.ceil(Math.sqrt(p.length)), 9),
  },
];
