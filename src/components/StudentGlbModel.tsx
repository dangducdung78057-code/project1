// 卡通学生 .glb 模型加载管线(useGLTF + SkeletonUtils.clone,唯一渲染路径)。
// 模型文件:public/models/boy.glb(男生)/ public/models/girl.glb(女生)。
// 设计师的正式模型到位后直接覆盖这两个文件即可,无需改代码。
// 要求:标准人体比例、Y 轴向上、面向 +Z、原点在双脚之间的地面。
// 渲染:材质自动替换为 MeshToonMaterial(三阶渐变贴图,卡通光影分界)。
// 服装换色约定:材质名含 top/shirt/上衣 视为上衣,bottom/pants/裤 视为下装,
// skirt/裙 视为裙摆;未匹配到任何命名时整体着主色。
import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

const MODEL_URLS = {
  male: "/models/boy.glb",
  female: "/models/girl.glb",
} as const;

// 模块加载即预取,首帧渲染前模型就绪,拖拽/切换零卡顿
useGLTF.preload(MODEL_URLS.male);
useGLTF.preload(MODEL_URLS.female);

// ---- 模型实例渲染 ----

type CostumeColors = {
  /** 上衣颜色 */
  top: string;
  /** 下装颜色 */
  bottom: string;
  /** 裙摆/点缀颜色 */
  accent: string;
};

function matchSlot(name: string): keyof CostumeColors | null {
  const n = name.toLowerCase();
  if (/top|shirt|jacket|上衣|衫/.test(n)) return "top";
  if (/bottom|pants|trouser|短裤|裤/.test(n)) return "bottom";
  if (/skirt|dress|裙/.test(n)) return "accent";
  return null;
}

// ---- 卡通渲染:三阶渐变贴图(光影分界生硬,二次元质感;模块级共享一份) ----

let toonGradientMap: THREE.DataTexture | null = null;
function getToonGradientMap(): THREE.DataTexture {
  if (toonGradientMap) return toonGradientMap;
  // 三阶亮度:暗部 / 中间调 / 亮部
  const data = new Uint8Array([80, 80, 80, 255, 170, 170, 170, 255, 255, 255, 255, 255]);
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  toonGradientMap = tex;
  return tex;
}

/**
 * 渲染一个卡通学生模型实例:
 * - SkeletonUtils.clone 深拷贝(带骨骼也安全),36 个小人共用一套底层几何体数据
 * - 按包围盒把模型精确缩放到目标身高,脚底对齐地面
 * - 材质替换为 MeshToonMaterial(保留原贴图与颜色,卡通光影)
 * - 按材质命名约定应用服装色系
 */
export function StudentGlbModel({
  gender,
  heightM,
  colors,
  selected,
}: {
  gender: "male" | "female";
  heightM: number;
  colors: CostumeColors;
  selected: boolean;
}) {
  const { scene } = useGLTF(MODEL_URLS[gender]);

  const instance = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);
    // 归一化:按包围盒缩放到目标身高,原点对齐脚底
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const scale = size.y > 0.001 ? heightM / size.y : 1;
    cloned.scale.setScalar(scale);
    cloned.position.y = -box.min.y * scale;
    // 替换为 Three.js 卡通渲染材质:提取原贴图与颜色 + 服装换色 + 阶梯渐变
    let matchedAny = false;
    const gradientMap = getToonGradientMap();
    const toToon = (m: THREE.Material, meshName: string): THREE.MeshToonMaterial => {
      const src = m as THREE.MeshStandardMaterial;
      const slot = matchSlot(src.name || meshName);
      if (slot) matchedAny = true;
      const mat = new THREE.MeshToonMaterial({
        // 提取原本的贴图颜色;命中服装槽位时替换为色系颜色
        color: slot ? new THREE.Color(colors[slot]) : (src.color?.clone() ?? new THREE.Color("#ffffff")),
        map: src.map ?? null,
        gradientMap,
      });
      mat.name = src.name;
      return mat;
    };
    cloned.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      // 开启阴影投射和接收
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((m) => toToon(m, mesh.name))
        : toToon(mesh.material, mesh.name);
    });
    // 无任何命名匹配时:整体着上衣主色(保留原贴图明暗)
    if (!matchedAny) {
      cloned.traverse((obj) => {
        if (!(obj as THREE.Mesh).isMesh) return;
        const mat = (obj as THREE.Mesh).material as THREE.MeshToonMaterial;
        mat.color?.set(colors.top);
      });
    }
    return cloned;
  }, [scene, heightM, colors.top, colors.bottom, colors.accent]);

  // 选中时轻微自发光提示(MeshToonMaterial 支持 emissive)
  useEffect(() => {
    instance.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mats = (obj as THREE.Mesh).material;
      for (const mat of Array.isArray(mats) ? mats : [mats]) {
        const toon = mat as THREE.MeshToonMaterial;
        if (toon.emissive) {
          toon.emissive.set(selected ? "#3aa89e" : "#000000");
          toon.emissiveIntensity = selected ? 0.3 : 0;
        }
      }
    });
  }, [instance, selected]);

  return <primitive object={instance} />;
}
