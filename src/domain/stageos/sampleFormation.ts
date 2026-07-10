import type { Performer } from "./types";
import { FORMATIONS } from "./formations";

/**
 * 隐私硬约束：演员一律使用匿名编号（S01、S02…），
 * 不采集姓名、照片或任何可识别个人身份的信息。
 */
export function buildSamplePerformers(count: number): Performer[] {
  const performers: Performer[] = [];
  for (let i = 0; i < count; i++) {
    const id = `S${String(i + 1).padStart(2, "0")}`;
    const gender = i % 2 === 0 ? "female" : "male";
    performers.push({
      id,
      gender,
      heightCm: gender === "female" ? 152 + (i % 5) * 3 : 156 + (i % 5) * 3,
      position: { x: 0, z: 1.2, riserLevel: 0 },
      appearance: {
        outfitId: gender === "female" ? "chorus-dress" : "chorus-uniform",
        upperColor: "#f5f2ea",
        lowerColor: "#27404f",
        footwearColor: "#ffffff",
        accentColor: "#8fb6c7",
      },
    });
  }
  const template = FORMATIONS[0];
  const positions = template.generate(performers);
  return performers.map((p) => ({ ...p, position: positions[p.id] ?? p.position }));
}
