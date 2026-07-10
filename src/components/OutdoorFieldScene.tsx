// 室外场景控制模块:物理天空穹顶 + 按模拟时间计算太阳位置 + 草地/跑道地表。
// 接收 UI 传来的参数:场地类型 (grass | track) 和模拟时间 (0-24 小时)。
import { Sky, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

export type FieldType = "grass" | "track";

export function OutdoorFieldScene({ fieldType = "grass", timeOfDay = 14 }: { fieldType?: FieldType; timeOfDay?: number }) {
  // 1. 地表材质加载(平铺重复,避免看起来像绿布)
  const grassMap = useTexture("/textures/grass_color.png");
  const trackMap = useTexture("/textures/track_color.png");

  useMemo(() => {
    for (const t of [grassMap, trackMap]) {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(20, 20); // 根据场地大小调整平铺密度
      t.anisotropy = 8;
    }
  }, [grassMap, trackMap]);

  // 2. 根据时间计算太阳位置(极坐标转笛卡尔坐标)
  // 假设 6 点日出,18 点日落,12 点在正头顶,太阳从东到西跨越天空
  const sunPosition = useMemo<[number, number, number]>(() => {
    const angle = ((timeOfDay - 6) / 12) * Math.PI; // 0 到 PI
    const radius = 50;
    return [Math.cos(angle) * radius, Math.sin(angle) * radius, -20];
  }, [timeOfDay]);

  const isDaytime = timeOfDay > 6 && timeOfDay < 18;
  // 日出日落时(太阳高度低)光线偏暖、强度降低
  const sunElevation = Math.max(0, Math.sin(((timeOfDay - 6) / 12) * Math.PI));
  const sunIntensity = isDaytime ? 0.8 + sunElevation * 1.7 : 0;
  const sunColor = sunElevation > 0.35 ? "#fffbeb" : "#ffb86b";

  return (
    <group>
      {/* 物理天空穹顶组件 */}
      <Sky distance={450000} sunPosition={sunPosition} inclination={0} azimuth={0.25} />

      {/* 匹配天空颜色的环境漫反射 */}
      <Environment preset="park" background={false} />

      {/* 半球光:上方天空冷色,下方随场地变化的地表反光 */}
      <hemisphereLight
        intensity={isDaytime ? 0.4 : 0.15}
        color="#ffffff"
        groundColor={fieldType === "grass" ? "#4ade80" : "#c2554a"}
      />

      {/* 夜间补充月光,避免全黑 */}
      {!isDaytime ? <directionalLight position={[-20, 30, 10]} intensity={0.25} color="#93a7c9" /> : null}

      {/* 强烈的太阳直射光,产生清晰的平行阴影 */}
      <directionalLight
        castShadow
        position={sunPosition}
        intensity={sunIntensity}
        color={sunColor}
        shadow-mapSize={[4096, 4096]} // 室外大面积阴影需高分辨率
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0005} // 防止阴影条纹失真(Shadow Acne)
      />

      {/* 广阔的室外地表 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={fieldType === "grass" ? grassMap : trackMap} roughness={0.9} />
      </mesh>

      {/* 室外专用发光辅助网格(范围更大) */}
      <gridHelper
        args={[100, 100, "#ffffff", "#ffffff"]}
        position={[0, 0.05, 0]}
        material-opacity={0.18}
        material-transparent={true}
      />
    </group>
  );
}
