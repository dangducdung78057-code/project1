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
        .select("tier, max_performers")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error || !row) return FALLBACK;
      const r = row as unknown as { tier?: MembershipTier; max_performers?: number };
      return {
        tier: r.tier ?? "free",
        maxPerformers: r.max_performers ?? 40,
        fromServer: true,
      };
    },
  });

  return { ...(data ?? FALLBACK), isLoading: Boolean(user) && isLoading };
}
