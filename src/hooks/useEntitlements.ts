import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { MembershipTier } from "@/domain/stageos/types";

type ServerEntitlements = {
  tier: MembershipTier;
  maxPerformers: number;
  fromServer: boolean;
};

const FALLBACK: ServerEntitlements = { tier: "free", maxPerformers: 40, fromServer: false };

/**
 * 读取服务端权益（user_entitlements 表，RLS 本人只读）。
 * 未登录或无记录时回退 free。写入仅 service_role 可做，前端无法自改档位。
 */
export function useEntitlements(): ServerEntitlements & { isLoading: boolean } {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["user_entitlements", user?.id],
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<ServerEntitlements> => {
      // user_entitlements 尚未纳入生成的 Supabase 类型，绕过表名字面量检查
      const from = supabase.from as (table: string) => ReturnType<typeof supabase.from>;
      const { data: row, error } = await from("user_entitlements")
        .select("tier, max_performers, expires_at")
        .eq("user_id", user!.id)
        .maybeSingle();
      console.log("[v0] entitlements query:", { userId: user!.id, row, error: error?.message });
      if (error) return FALLBACK;
      // 无记录 = 服务端确认 free（fromServer: true，锁定前端档位）
      if (!row) return { ...FALLBACK, fromServer: true };
      const r = row as unknown as { tier?: MembershipTier; max_performers?: number; expires_at?: string | null };
      // 会员过期立即降级为 free（与服务端 get_user_tier 判定一致）
      const expired = r.expires_at != null && new Date(r.expires_at).getTime() < Date.now();
      return {
        tier: expired ? "free" : (r.tier ?? "free"),
        maxPerformers: expired ? 40 : (r.max_performers ?? 40),
        fromServer: true,
      };
    },
  });

  return { ...(data ?? FALLBACK), isLoading: Boolean(user) && isLoading };
}
