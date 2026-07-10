// 通用队形布局算法:为知识库 UNIVERSAL_FORMATIONS 的全部 18 种队形提供
// compute(n, spacing) => [x, z][] 坐标(z 小 = 后排 / 上场口方向,+z 朝观众)。
// 所有算法自动适配任意人数与间距,越界钳制由编辑器统一处理。

export type FormationCompute = (n: number, spacing: number) => [number, number][];

/** 按每排人数上限均分成多排 */
function splitRows(n: number, perRow: number): number[] {
  const rows = Math.ceil(n / perRow);
  const base = Math.floor(n / rows);
  const extra = n % rows;
  // 前排少、后排多(前少后多更利视线)
  return Array.from({ length: rows }, (_, i) => base + (i >= rows - extra ? 1 : 0));
}

/** 居中横排 */
function rowLine(cnt: number, z: number, spacing: number, xOffset = 0): [number, number][] {
  return Array.from({ length: cnt }, (_, i) => [(i - (cnt - 1) / 2) * spacing + xOffset, z]);
}

// 1. 标准方阵式:等行等列,横竖对齐
export const gridPositions: FormationCompute = (n, spacing) => {
  const perRow = Math.max(4, Math.ceil(Math.sqrt(n * 1.6)));
  const counts = splitRows(n, perRow);
  const out: [number, number][] = [];
  counts.forEach((cnt, r) => {
    out.push(...rowLine(cnt, (r - (counts.length - 1) / 2) * spacing * 1.1, spacing));
  });
  return out;
};

// 2. V字展开式:尖点朝观众(+z),两翼向后展开
export const vPositions: FormationCompute = (n, spacing) => {
  const out: [number, number][] = [];
  const s = spacing * 0.82;
  out.push([0, 4]); // 尖点(核心成员)
  for (let i = 1; i < n; i++) {
    const side = i % 2 === 1 ? -1 : 1;
    const k = Math.ceil(i / 2);
    out.push([side * k * s, 4 - k * s * 0.9]);
  }
  return out;
};

// 3. 倒V雁阵式:开口朝观众,顶点在后
export const invertedVPositions: FormationCompute = (n, spacing) => {
  const out: [number, number][] = [];
  const s = spacing * 0.82;
  out.push([0, -4]); // 顶点(最后方)
  for (let i = 1; i < n; i++) {
    const side = i % 2 === 1 ? -1 : 1;
    const k = Math.ceil(i / 2);
    out.push([side * k * s, -4 + k * s * 0.9]);
  }
  return out;
};

// 4. 扇形辐射式:以舞台前中为圆心的多层扇面
export const fanPositions: FormationCompute = (n, spacing) => {
  const counts = splitRows(n, Math.max(6, Math.ceil(n / 3)));
  const out: [number, number][] = [];
  counts.forEach((cnt, li) => {
    const radius = 3.5 + li * spacing * 1.15;
    for (let i = 0; i < cnt; i++) {
      const t = cnt > 1 ? i / (cnt - 1) : 0.5;
      const ang = Math.PI * (0.2 + 0.6 * t);
      out.push([Math.cos(ang) * -radius, 6 - Math.sin(ang) * radius]);
    }
  });
  return out;
};

// 5. 菱形对称式:单人尖点、中段最宽
export const diamondPositions: FormationCompute = (n, spacing) => {
  // 行人数序列:1,3,5,...,峰值,...,5,3,1 动态适配
  const rows: number[] = [];
  let remain = n;
  let up = 1;
  const stack: number[] = [];
  while (remain > 0) {
    const take = Math.min(up, remain);
    stack.push(take);
    remain -= take;
    up += 2;
  }
  // 折叠成菱形:一半递增一半递减
  const half = Math.ceil(stack.length / 2);
  const inc = stack.slice(0, half);
  const dec = stack.slice(half).reverse();
  rows.push(...inc, ...dec);
  const out: [number, number][] = [];
  let idx = 0;
  const total = rows.length;
  rows.forEach((cnt, r) => {
    const z = 4 - (r / Math.max(1, total - 1)) * 8;
    out.push(...rowLine(cnt, z, spacing * 0.95));
    idx += cnt;
  });
  return out.slice(0, n);
};

// 6. 同心圆环式:内外双环
export const circlePositions: FormationCompute = (n, spacing) => {
  const inner = Math.round(n / 3);
  const outer = n - inner;
  const out: [number, number][] = [];
  const rOut = Math.max(4.5, (outer * spacing) / (2 * Math.PI));
  const rIn = Math.max(2.2, (inner * spacing) / (2 * Math.PI));
  for (let i = 0; i < outer; i++) {
    const a = (i / outer) * Math.PI * 2 - Math.PI / 2;
    out.push([Math.cos(a) * rOut, Math.sin(a) * rOut * 0.72]);
  }
  for (let i = 0; i < inner; i++) {
    const a = (i / inner) * Math.PI * 2 - Math.PI / 2;
    out.push([Math.cos(a) * rIn, Math.sin(a) * rIn * 0.72]);
  }
  return out;
};

// 7. 双排错落式:前后两排半肩错位
export const staggeredTwoRowPositions: FormationCompute = (n, spacing) => {
  const front = Math.ceil(n / 2);
  const back = n - front;
  const out: [number, number][] = [];
  out.push(...rowLine(front, 1.2, spacing));
  out.push(...rowLine(back, 1.2 - spacing * 1.1, spacing, spacing / 2)); // 半肩错位
  return out;
};

// 8. 斜线破格式:贯穿舞台的对角斜线
export const diagonalPositions: FormationCompute = (n, spacing) => {
  const out: [number, number][] = [];
  const s = Math.min(spacing * 1.1, 16 / Math.max(1, n - 1));
  for (let i = 0; i < n; i++) {
    const t = n > 1 ? i / (n - 1) : 0.5;
    out.push([-8 + t * 16, 4.5 - t * 9]);
  }
  return out;
};

// 9. 十字交叉式:横竖两列在台心交叉
export const crossPositions: FormationCompute = (n, spacing) => {
  const out: [number, number][] = [];
  const horiz = Math.ceil(n * 0.55);
  const vert = n - horiz;
  // 横列(交叉点留空)
  for (let i = 0; i < horiz; i++) {
    const k = Math.floor(i / 2) + 1;
    const side = i % 2 === 0 ? -1 : 1;
    out.push([side * k * spacing, 0]);
  }
  // 竖列
  for (let i = 0; i < vert; i++) {
    const k = Math.floor(i / 2) + 1;
    const side = i % 2 === 0 ? -1 : 1;
    out.push([0, side * k * spacing * 0.9]);
  }
  return out;
};

// 10. 金字塔层叠式:前少后多逐排递增
export const pyramidPositions: FormationCompute = (n, spacing) => {
  const rows: number[] = [];
  let remain = n;
  let size = 3;
  while (remain > 0) {
    const take = Math.min(size, remain);
    rows.push(take);
    remain -= take;
    size += 2;
  }
  const out: [number, number][] = [];
  // 首排(最少)在最前(+z),向后逐排递增
  rows.forEach((cnt, r) => {
    out.push(...rowLine(cnt, 3 - r * spacing * 1.05, spacing));
  });
  return out.slice(0, n);
};

// 11. 跪站混合三层式:前排更密(跪坐),中后排站立
export const kneelStandPositions: FormationCompute = (n, spacing) => {
  const counts = splitRows(n, Math.max(5, Math.ceil(n / 3)));
  const out: [number, number][] = [];
  counts.forEach((cnt, r) => {
    const rowSpacing = r === counts.length - 1 ? spacing * 0.72 : spacing; // 最前排跪坐更密
    out.push(...rowLine(cnt, 2.5 - (counts.length - 1 - r) * spacing * 1.1, rowSpacing));
  });
  return out;
};

// 12. 前三后二蹲站式:前 2/3 蹲 + 后排站立,紧凑两层
export const crouchStandPositions: FormationCompute = (n, spacing) => {
  const front = Math.ceil(n * 0.6);
  const back = n - front;
  const out: [number, number][] = [];
  out.push(...rowLine(front, 1.5, spacing * 0.75));
  out.push(...rowLine(back, 1.5 - spacing, spacing * 0.95));
  return out;
};

// 13. 弧形领诵分区式:多排弧形合诵区 + 前置领诵位
export const arcLeadPositions: FormationCompute = (n, spacing) => {
  const leads = Math.min(2, Math.max(1, Math.round(n / 18)));
  const chorus = n - leads;
  const out: [number, number][] = [];
  // 领诵位(最前)
  for (let i = 0; i < leads; i++) {
    out.push([(i - (leads - 1) / 2) * spacing * 2, 5.5]);
  }
  // 合诵弧形区
  const counts = splitRows(chorus, Math.max(6, Math.ceil(chorus / 3)));
  counts.forEach((cnt, li) => {
    const radius = 5 + li * spacing * 1.1;
    for (let i = 0; i < cnt; i++) {
      const t = cnt > 1 ? i / (cnt - 1) : 0.5;
      const ang = Math.PI * (0.25 + 0.5 * t);
      out.push([Math.cos(ang) * -radius, 6.5 - Math.sin(ang) * radius]);
    }
  });
  return out;
};

// 14. 双色声部分组式:左右两组阶梯排布,中间留分界通道
export const twoGroupPositions: FormationCompute = (n, spacing) => {
  const left = Math.ceil(n / 2);
  const right = n - left;
  const out: [number, number][] = [];
  const groupRows = (cnt: number, dir: number) => {
    const counts = splitRows(cnt, Math.max(3, Math.ceil(cnt / 3)));
    counts.forEach((rc, r) => {
      for (let i = 0; i < rc; i++) {
        out.push([dir * (1.2 + i * spacing * 0.9), 2 - (counts.length - 1 - r) * spacing * 1.1]);
      }
    });
  };
  groupRows(left, -1);
  groupRows(right, 1);
  return out;
};

// 15. 梯形阶梯合唱式:上窄下宽逐排增高
export const trapezoidPositions: FormationCompute = (n, spacing) => {
  const rows = Math.max(3, Math.min(5, Math.round(n / 10)));
  const counts: number[] = [];
  let remain = n;
  // 后排宽、前排窄的梯形(前窄后宽)
  const base = Math.floor(n / rows);
  for (let r = 0; r < rows; r++) {
    const w = Math.max(1, Math.round(base * (0.7 + (0.6 * r) / Math.max(1, rows - 1))));
    counts.push(Math.min(w, remain));
    remain -= counts[r];
  }
  if (remain > 0) counts[counts.length - 1] += remain;
  const out: [number, number][] = [];
  counts.forEach((cnt, r) => {
    out.push(...rowLine(cnt, 2.5 - r * spacing * 1.1, spacing * 0.9));
  });
  return out.slice(0, n);
};

// 16. 扇形声部排列式:以指挥(台前)为圆心,分声部留分界
export const fanSectionPositions: FormationCompute = (n, spacing) => {
  const counts = splitRows(n, Math.max(6, Math.ceil(n / 3)));
  const out: [number, number][] = [];
  counts.forEach((cnt, li) => {
    const radius = 4 + li * spacing * 1.25;
    for (let i = 0; i < cnt; i++) {
      const t = cnt > 1 ? i / (cnt - 1) : 0.5;
      // 声部间留分界:将弧分成三段,段间空隙
      const seg = Math.floor(t * 2.999);
      const local = t * 3 - seg;
      const ang = Math.PI * (0.18 + seg * 0.22 + local * 0.18 + seg * 0.02);
      out.push([Math.cos(ang) * -radius, 7 - Math.sin(ang) * radius]);
    }
  });
  return out;
};

// 17. 景深三区戏剧式:前中后三个表演分区
export const threeZonePositions: FormationCompute = (n, spacing) => {
  const front = Math.max(1, Math.round(n * 0.2));
  const mid = Math.round(n * 0.35);
  const back = n - front - mid;
  const out: [number, number][] = [];
  // 前区:主角,居中靠台口
  out.push(...rowLine(front, 4.5, spacing * 1.4));
  // 中区:左右分散
  const midCounts = splitRows(mid, Math.max(3, Math.ceil(mid / 2)));
  midCounts.forEach((cnt, r) => {
    out.push(...rowLine(cnt, 0.5 - r * spacing, spacing * 1.2));
  });
  // 后区:群演候场式
  const backCounts = splitRows(back, Math.max(4, Math.ceil(back / 2)));
  backCounts.forEach((cnt, r) => {
    out.push(...rowLine(cnt, -3 - r * spacing * 0.9, spacing * 0.85));
  });
  return out.slice(0, n);
};

// 18. 环形领唱环绕式:开口环形 + 环心领唱
export const ringLeadPositions: FormationCompute = (n, spacing) => {
  const leads = Math.min(2, Math.max(1, Math.round(n / 20)));
  const ring = n - leads;
  const out: [number, number][] = [];
  // 环心领唱
  for (let i = 0; i < leads; i++) {
    out.push([(i - (leads - 1) / 2) * spacing * 1.5, 0.5]);
  }
  // 开口朝观众的环(开口约 72°)
  const radius = Math.max(4, (ring * spacing) / (2 * Math.PI * 0.8));
  for (let i = 0; i < ring; i++) {
    const t = ring > 1 ? i / (ring - 1) : 0.5;
    const ang = Math.PI * (0.7 + 1.6 * t); // 留出朝观众的开口
    out.push([Math.cos(ang) * radius, Math.sin(ang) * radius * 0.8]);
  }
  return out;
};

/** 队形名称 → 布局算法映射(与知识库 UNIVERSAL_FORMATIONS 名称一一对应) */
export const FORMATION_COMPUTES: Record<string, FormationCompute> = {
  标准方阵式: gridPositions,
  V字展开式: vPositions,
  倒V雁阵式: invertedVPositions,
  扇形辐射式: fanPositions,
  菱形对称式: diamondPositions,
  同心圆环式: circlePositions,
  "双排错落式(通用)": staggeredTwoRowPositions,
  斜线破格式: diagonalPositions,
  十字交叉式: crossPositions,
  金字塔层叠式: pyramidPositions,
  跪站混合三层式: kneelStandPositions,
  前三后二蹲站式: crouchStandPositions,
  弧形领诵分区式: arcLeadPositions,
  双色声部分组式: twoGroupPositions,
  梯形阶梯合唱式: trapezoidPositions,
  扇形声部排列式: fanSectionPositions,
  景深三区戏剧式: threeZonePositions,
  环形领唱环绕式: ringLeadPositions,
};
