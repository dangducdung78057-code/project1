/**
 * 方案生成模式的统一展示文案。
 *
 * 历史快照的 mode 可能是 "mock"（旧本地实现），新快照写入 "local"。
 * 对用户一律展示为"本地规则引擎"，不再暴露 mock 字样。
 */
export function formatPlanMode(mode: string | null | undefined): string {
  switch ((mode ?? "").toLowerCase()) {
    case "ai":
      return "AI";
    case "local":
    case "mock":
      return "本地规则引擎";
    default:
      return mode || "本地规则引擎";
  }
}
