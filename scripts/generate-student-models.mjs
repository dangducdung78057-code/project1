// 生成极简卡通学生 .glb 模型(boy.glb / girl.glb)到 public/models/
// 标准卡通比例(约 5.5 头身),Y 轴向上、面向 +Z、原点在双脚之间的地面。
// 材质命名遵循换装约定: top(上衣) / pants(下装) / skirt(裙摆) / skin / hair / shoes
// 用法: node scripts/generate-student-models.mjs
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Node 环境缺少 FileReader,GLTFExporter 二进制导出需要,给出最小兼容实现
globalThis.FileReader ??= class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      this.onloadend?.();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = `data:${blob.type || "application/octet-stream"};base64,${Buffer.from(buf).toString("base64")}`;
      this.onloadend?.();
    });
  }
};

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "models");
mkdirSync(OUT_DIR, { recursive: true });

/** 命名材质工厂(GLTFExporter 会保留材质名,供运行时换色) */
function mat(name, color, roughness = 0.7) {
  const m = new THREE.MeshStandardMaterial({ color, roughness });
  m.name = name;
  return m;
}

/**
 * 构建卡通学生(总高约 1.7 单位,约 5.5 头身,大头卡通比例)
 * gender: "male" | "female"
 */
function buildStudent(gender) {
  const g = new THREE.Group();
  g.name = gender === "male" ? "student_boy" : "student_girl";

  const H = 1.7; // 总高
  const headR = H * 0.115; // 大头卡通比例
  const headCy = H - headR;
  const shoulderY = headCy - headR * 1.35;
  const torsoH = H * 0.28;
  const hipY = shoulderY - torsoH;

  const skin = mat("skin", "#f2d6bd", 0.65);
  const hair = mat("hair", gender === "male" ? "#3b2f2a" : "#4a3226", 0.8);
  const top = mat("top", gender === "male" ? "#5b8fd4" : "#e88aa4", 0.7);
  const pants = mat("pants", "#3d4757", 0.75);
  const shoes = mat("shoes", "#2d3239", 0.6);

  // 头
  const head = new THREE.Mesh(new THREE.SphereGeometry(headR, 24, 20), skin);
  head.name = "head";
  head.position.y = headCy;
  head.scale.set(1, 1.08, 0.98);
  g.add(head);

  // 头发:半球盖 + 女生加双马尾
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(headR * 1.04, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.55),
    hair,
  );
  hairCap.name = "hair_cap";
  hairCap.position.y = headCy + headR * 0.08;
  hairCap.scale.set(1, 1.05, 1);
  g.add(hairCap);
  if (gender === "female") {
    for (const side of [-1, 1]) {
      const tail = new THREE.Mesh(new THREE.SphereGeometry(headR * 0.34, 14, 12), hair);
      tail.name = `hair_tail_${side < 0 ? "l" : "r"}`;
      tail.position.set(side * headR * 1.05, headCy - headR * 0.15, -headR * 0.25);
      tail.scale.set(1, 1.7, 1);
      g.add(tail);
    }
  }

  // 颈
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(headR * 0.32, headR * 0.36, headR * 0.55, 12), skin);
  neck.name = "neck";
  neck.position.y = shoulderY + headR * 0.25;
  g.add(neck);

  // 躯干(上衣)
  const torsoRTop = gender === "male" ? H * 0.088 : H * 0.078;
  const torsoRBot = gender === "male" ? H * 0.072 : H * 0.07;
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(torsoRTop, torsoRBot, torsoH, 18), top);
  torso.name = "torso_top";
  torso.position.y = hipY + torsoH / 2;
  g.add(torso);
  // 肩部圆润过渡(上衣)
  const shoulder = new THREE.Mesh(new THREE.SphereGeometry(torsoRTop * 1.15, 18, 12), top);
  shoulder.name = "shoulder_top";
  shoulder.position.y = shoulderY - H * 0.005;
  shoulder.scale.set(1.15, 0.5, 0.85);
  g.add(shoulder);

  // 双臂(上袖 top,小臂 skin)
  const armR = H * 0.026;
  const armH = H * 0.34;
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.name = `arm_${side < 0 ? "l" : "r"}`;
    arm.position.set(side * (torsoRTop * 1.35 + armR * 0.4), shoulderY - H * 0.012, 0);
    arm.rotation.z = side * 0.09;
    const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(armR * 1.1, armH * 0.32, 6, 12), top);
    sleeve.name = "sleeve_top";
    sleeve.position.y = -armH * 0.2;
    arm.add(sleeve);
    const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(armR, armH * 0.4, 6, 12), skin);
    forearm.name = "forearm";
    forearm.position.y = -armH * 0.65;
    arm.add(forearm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(armR * 1.25, 12, 10), skin);
    hand.name = "hand";
    hand.position.y = -armH - armR * 0.5;
    arm.add(hand);
    g.add(arm);
  }

  // 骨盆
  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(torsoRBot * 1.25, 16, 12), gender === "male" ? pants : top);
  pelvis.name = gender === "male" ? "pelvis_pants" : "pelvis_top";
  pelvis.position.y = hipY;
  pelvis.scale.set(1, 0.6, 0.85);
  g.add(pelvis);

  // 女生裙摆
  if (gender === "female") {
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(torsoRBot * 0.9, H * 0.125, H * 0.17, 20), mat("skirt", "#f0c8d8", 0.7));
    skirt.name = "skirt";
    skirt.position.y = hipY - H * 0.085;
    g.add(skirt);
  }

  // 双腿(男生长裤 pants,女生裸腿 skin)+ 鞋
  const legR = H * 0.034;
  const legH = hipY - H * 0.02;
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(
      new THREE.CapsuleGeometry(legR, legH - legR * 2, 6, 12),
      gender === "male" ? pants : skin,
    );
    leg.name = `leg_${side < 0 ? "l" : "r"}${gender === "male" ? "_pants" : ""}`;
    leg.position.set(side * torsoRBot * 0.55, legH / 2 + H * 0.02, 0);
    g.add(leg);
    const shoe = new THREE.Mesh(new THREE.SphereGeometry(legR * 1.3, 12, 10), shoes);
    shoe.name = `shoe_${side < 0 ? "l" : "r"}`;
    shoe.position.set(side * torsoRBot * 0.55, H * 0.018, legR * 0.5);
    shoe.scale.set(1, 0.55, 1.5);
    g.add(shoe);
  }

  return g;
}

function exportGlb(object, filename) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      object,
      (result) => {
        writeFileSync(join(OUT_DIR, filename), Buffer.from(result));
        console.log(`[v0] exported ${filename} (${result.byteLength} bytes)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true },
    );
  });
}

await exportGlb(buildStudent("male"), "boy.glb");
await exportGlb(buildStudent("female"), "girl.glb");
console.log("[v0] done");
