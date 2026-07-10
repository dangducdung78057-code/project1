import { z } from "zod";

/**
 * 服装 Outfit Manifest
 * - 每套服装声明部件（上装/下装/鞋/配饰）与可染色插槽
 * - 2.5D 用程序化绘制（partKind 决定画法），未来 3D/正式精灵素材可按 spriteKey 挂接美术资源
 * - 正式精灵素材尚未交付（partial），spriteKey 均为预留位
 */

export const outfitPartSchema = z.object({
  slot: z.enum(["upper", "lower", "footwear", "accent", "headwear"]),
  partKind: z.enum(["shirt", "jacket", "dress-top", "skirt", "trousers", "shoes", "bowtie", "sash", "beret", "none"]),
  colorSlot: z.enum(["upperColor", "lowerColor", "footwearColor", "accentColor"]).nullable(),
  spriteKey: z.string(),
});

export const outfitSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  programTypes: z.array(z.enum(["chorus", "recitation", "dance", "instrumental", "drama"])),
  genderFit: z.enum(["female", "male", "any"]),
  memberOnly: z.boolean(),
  parts: z.array(outfitPartSchema),
});

export type OutfitPart = z.infer<typeof outfitPartSchema>;
export type Outfit = z.infer<typeof outfitSchema>;

export const OUTFIT_MANIFEST: Outfit[] = [
  {
    id: "chorus-dress",
    name: "合唱连衣裙",
    programTypes: ["chorus"],
    genderFit: "female",
    memberOnly: false,
    parts: [
      { slot: "upper", partKind: "dress-top", colorSlot: "upperColor", spriteKey: "chorus-dress/upper" },
      { slot: "lower", partKind: "skirt", colorSlot: "lowerColor", spriteKey: "chorus-dress/skirt" },
      { slot: "footwear", partKind: "shoes", colorSlot: "footwearColor", spriteKey: "chorus-dress/shoes" },
      { slot: "accent", partKind: "sash", colorSlot: "accentColor", spriteKey: "chorus-dress/sash" },
    ],
  },
  {
    id: "chorus-uniform",
    name: "合唱制服",
    programTypes: ["chorus", "recitation"],
    genderFit: "male",
    memberOnly: false,
    parts: [
      { slot: "upper", partKind: "shirt", colorSlot: "upperColor", spriteKey: "chorus-uniform/shirt" },
      { slot: "lower", partKind: "trousers", colorSlot: "lowerColor", spriteKey: "chorus-uniform/trousers" },
      { slot: "footwear", partKind: "shoes", colorSlot: "footwearColor", spriteKey: "chorus-uniform/shoes" },
      { slot: "accent", partKind: "bowtie", colorSlot: "accentColor", spriteKey: "chorus-uniform/bowtie" },
    ],
  },
  {
    id: "dance-flow",
    name: "舞蹈飘带装",
    programTypes: ["dance"],
    genderFit: "any",
    memberOnly: true,
    parts: [
      { slot: "upper", partKind: "dress-top", colorSlot: "upperColor", spriteKey: "dance-flow/upper" },
      { slot: "lower", partKind: "skirt", colorSlot: "lowerColor", spriteKey: "dance-flow/skirt" },
      { slot: "footwear", partKind: "shoes", colorSlot: "footwearColor", spriteKey: "dance-flow/shoes" },
      { slot: "accent", partKind: "sash", colorSlot: "accentColor", spriteKey: "dance-flow/sash" },
    ],
  },
  {
    id: "drama-classic",
    name: "话剧经典西装",
    programTypes: ["drama", "instrumental"],
    genderFit: "any",
    memberOnly: true,
    parts: [
      { slot: "upper", partKind: "jacket", colorSlot: "upperColor", spriteKey: "drama-classic/jacket" },
      { slot: "lower", partKind: "trousers", colorSlot: "lowerColor", spriteKey: "drama-classic/trousers" },
      { slot: "footwear", partKind: "shoes", colorSlot: "footwearColor", spriteKey: "drama-classic/shoes" },
      { slot: "headwear", partKind: "beret", colorSlot: "accentColor", spriteKey: "drama-classic/beret" },
    ],
  },
];

export function getOutfit(id: string): Outfit {
  return OUTFIT_MANIFEST.find((o) => o.id === id) ?? OUTFIT_MANIFEST[0];
}
