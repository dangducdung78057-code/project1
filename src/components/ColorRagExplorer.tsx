// 配色 RAG:输入任意颜色(中文传统色名 / 常用色名 / #HEX),
// 在 853 色中国传统色库中检索最近色,并自动补全为五色舞台方案。纯前端计算。
import { useState } from "react";
import { pickNearestColor, fillToFive, hexToRgb } from "@/lib/paletteLibrary";
import type { ExtendedPaletteColor, PaletteColorEntry } from "@/lib/paletteLibrary";
import { resolveColorHex } from "@/lib/stageKnowledge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function ColorRagExplorer() {
  const [query, setQuery] = useState("");
  const [nearest, setNearest] = useState<ExtendedPaletteColor[]>([]);
  const [scheme, setScheme] = useState<PaletteColorEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = () => {
    const q = query.trim();
    if (!q) return;
    // #HEX 直接用;否则先走传统色名/常用色名解析
    const hex = /^#?[0-9a-fA-F]{6}$/.test(q)
      ? (q.startsWith("#") ? q : `#${q}`)
      : resolveColorHex(q);
    if (!hex || !hexToRgb(hex)) {
      setError(`无法识别「${q}」:请输入中文色名(如 石榴红、月白)或 #RRGGBB 色值`);
      setNearest([]);
      setScheme([]);
      return;
    }
    setError(null);
    const top = pickNearestColor(hex, 5);
    setNearest(top);
    if (top.length > 0) {
      setScheme(fillToFive([
        { role: "主色", name_zh: top[0].name_zh, hex: top[0].hex },
        ...top.slice(1, 3).map((c) => ({ role: "辅色", name_zh: c.name_zh, hex: c.hex })),
      ]));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
              e.preventDefault();
              search();
            }
          }}
          placeholder="输入色名或色值,如:石榴红 / 月白 / #C04851"
          className="h-8 text-xs"
          aria-label="检索颜色"
        />
        <Button size="sm" variant="outline" onClick={search} className="shrink-0">
          <Search className="h-3.5 w-3.5 mr-1" aria-hidden="true" />检索
        </Button>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {nearest.length > 0 && (
        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium mb-1.5">最近传统色(OKLab 色差排序)</div>
            <div className="grid grid-cols-5 gap-1.5">
              {nearest.map((c) => (
                <div key={c.hex + c.name_zh} className="space-y-1">
                  <div className="h-10 rounded border border-border" style={{ backgroundColor: c.hex }} title={`${c.name_zh} ${c.hex}`} />
                  <div className="text-[10px] leading-tight text-center">
                    <div className="font-medium truncate">{c.name_zh}</div>
                    <div className="font-mono text-muted-foreground">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium mb-1.5">自动五色舞台方案(fillToFive)</div>
            <div className="flex h-8 rounded overflow-hidden border border-border" role="img" aria-label="五色方案配色条">
              {scheme.map((c, i) => (
                <div key={`${c.hex}-${i}`} className="flex-1" style={{ backgroundColor: c.hex }} title={`${c.role} ${c.name_zh} ${c.hex}`} />
              ))}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">
              {scheme.map((c) => `${c.role}·${c.name_zh}`).join(" / ")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
