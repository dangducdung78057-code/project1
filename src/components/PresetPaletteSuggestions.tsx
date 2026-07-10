// 中国传统色节目方案推荐:基于 853 色库的 70 套节目配色方案(palette-library),
// 按节目类型 + 主题关键词检索 Top N,点击可套用主色到 screenThemeColor。
// 与 AI prompt 注入(ai-generate-plan)共用同一检索函数 retrievePresets,保证前后端一致。
import { useMemo } from "react";
import { retrievePresets, fillToFive } from "@/lib/paletteLibrary";

type Props = {
  programType?: string;
  programTheme?: string;
  /** 点击方案时回调,传入建议的主色文本(如「石榴红 #F20C00」)与方案名 */
  onApply: (colorText: string, presetName: string) => void;
};

export function PresetPaletteSuggestions({ programType, programTheme, onApply }: Props) {
  const presets = useMemo(
    () => retrievePresets(programType ?? "", programTheme ?? "", 4),
    [programType, programTheme],
  );

  if (presets.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {presets.map((p) => {
        const colors = fillToFive(p.palette);
        return (
          <button
            key={p.name}
            type="button"
            className="flex items-center gap-3 rounded border border-border px-2 py-1.5 text-left text-xs hover:bg-accent"
            title={`${p.hint}(公式:${p.formula_name_zh};场景:${p.scene_type})`}
            onClick={() => onApply(`${p.base_name} ${p.base_hex}`, p.name)}
          >
            <span className="flex shrink-0 overflow-hidden rounded border border-border">
              {colors.slice(0, 5).map((c, i) => (
                <span key={i} className="h-4 w-4" title={`${c.name_zh} ${c.hex}`} style={{ backgroundColor: c.hex }} />
              ))}
            </span>
            <span className="min-w-0">
              <span className="font-medium">{p.name}</span>
              <span className="ml-2 text-muted-foreground">
                {p.base_name} {p.base_hex} · {p.formula_name_zh}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
