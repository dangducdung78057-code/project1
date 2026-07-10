// 舞台灯光系统:三种光照模式(室外自然光 / 室内暖色面光 / LED 大屏可控环境光)。
// LED 模式下 rectAreaLight 颜色绑定 UI 选择的主题色,并渲染发光大屏面板。
import { useEffect, useRef } from "react";
import { SpotLight } from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

export type LightMode = "indoor" | "led" | "outdoor";

// RectAreaLight 需要一次性初始化 uniforms(模块级仅执行一次)
let rectAreaInited = false;
function ensureRectAreaInit() {
  if (!rectAreaInited) {
    RectAreaLightUniformsLib.init();
    rectAreaInited = true;
  }
}

export function StageLighting({ mode = "indoor", themeColor = "#3A9E9A" }: { mode?: LightMode; themeColor?: string }) {
  const ledLightRef = useRef<THREE.RectAreaLight>(null);

  useEffect(() => {
    if (mode === "led") ensureRectAreaInit();
  }, [mode]);

  // rectAreaLight 的朝向需通过 lookAt 设置(prop 不生效)
  useEffect(() => {
    ledLightRef.current?.lookAt(0, 3, 10);
  }, [mode, themeColor]);

  return (
    <group>
      {/* 场景 1:室外自然光 (Outdoor) */}
      {mode === "outdoor" ? (
        <>
          {/* 天光半球补偿(替代外部 HDR 环境贴图) */}
          <hemisphereLight args={["#bfe3ff", "#8a9b7a", 0.5]} />
          {/* 强烈太阳光,阴影锐利 */}
          <directionalLight
            castShadow
            position={[10, 20, -5]}
            intensity={2.5}
            color="#FFFBEB"
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          {/* 天空蓝色的环境补偿光 */}
          <ambientLight intensity={0.6} color="#E0F2FE" />
        </>
      ) : null}

      {/* 场景 2:室内不可控暖色面光 (Indoor Warm) */}
      {mode === "indoor" ? (
        <>
          {/* 基础环境光(暖调,替代外部 HDR 环境贴图,避免离线/弱网时灯光挂起) */}
          <ambientLight intensity={0.65} color="#fff5e8" />
          {/* 主平行光:产生清晰的卡通高光与阴影(MeshToonMaterial 依赖) */}
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.5}
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-14}
            shadow-camera-right={14}
            shadow-camera-top={14}
            shadow-camera-bottom={-14}
          />
          {/* 舞台前方的两束暖色面光 */}
          <SpotLight position={[-10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#FFEDD5" castShadow attenuation={18} anglePower={4} />
          <SpotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} color="#FFEDD5" castShadow attenuation={18} anglePower={4} />
        </>
      ) : null}

      {/* 场景 3:LED 大屏可控环境光 (LED Screen Driven) */}
      {mode === "led" ? (
        <>
          {/* 基础全局光:保证人物正面亮度(MeshToonMaterial 只响应 ambient/directional/point/spot) */}
          <ambientLight intensity={0.7} />
          {/* 正面主光:观众方向打向舞台,人物脸部清晰 */}
          <directionalLight
            castShadow
            position={[4, 12, 14]}
            intensity={1.6}
            color="#ffffff"
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-14}
            shadow-camera-right={14}
            shadow-camera-top={14}
            shadow-camera-bottom={-14}
          />
          {/* 大屏色彩溢出:点光源模拟屏幕光真实洒到人物背面与地面(Toon 材质可感知) */}
          <pointLight position={[0, 5, -7]} intensity={40} distance={22} decay={1.8} color={themeColor} />
          {/* 核心:大屏背景光(RectAreaLight 颜色绑定主题色,照亮标准材质的地面) */}
          <rectAreaLight ref={ledLightRef} position={[0, 5, -9]} width={20} height={10} color={themeColor} intensity={5} />
          {/* 大屏本体(发光面板) */}
          <mesh position={[0, 5, -9.2]}>
            <planeGeometry args={[20, 10]} />
            <meshStandardMaterial color={themeColor} emissive={themeColor} emissiveIntensity={0.9} toneMapped={false} />
          </mesh>
          {/* 大屏边框 */}
          <mesh position={[0, 5, -9.3]}>
            <planeGeometry args={[20.6, 10.6]} />
            <meshStandardMaterial color="#0d0f13" roughness={0.4} />
          </mesh>
          {/* 配合大屏色的地灯补充 */}
          <SpotLight position={[0, 0.2, -6]} angle={0.6} penumbra={0.5} intensity={2} color={themeColor} attenuation={12} anglePower={3} />
        </>
      ) : null}
    </group>
  );
}
