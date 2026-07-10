import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEntitlements } from "@/hooks/useEntitlements";

/**
 * 会员专属路由守卫：服务端权益（user_entitlements）判定，
 * 免费用户即使直接改 URL 也无法进入 2.5D/3D 页面，
 * 且守卫外层配合 React.lazy 确保会员资源包不会被免费用户提前下载。
 */
export function MemberRoute({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const ent = useEntitlements();
  console.log(`[v0] MemberRoute: user=${user?.id?.slice(0, 8)} tier=${ent.tier} fromServer=${ent.fromServer} loading=${ent.isLoading}`);

  if (authLoading || ent.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status" aria-label="正在校验会员权益">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-hidden />
      </div>
    );
  }

  const allowed = Boolean(user) && ent.fromServer && ent.tier !== "free";

  if (!allowed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <Lock className="h-10 w-10 text-muted-foreground" aria-hidden />
        <h1 className="text-lg font-semibold text-balance">此功能需要会员档位</h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {user
            ? "当前账号为免费档位。2.5D/3D 舞台预演为会员专属功能，升级后即可使用。"
            : "请先登录，会员账号可使用 2.5D/3D 舞台预演功能。"}
        </p>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/stage-editor">返回队形编辑器</Link>
          </Button>
          {!user && (
            <Button asChild size="sm">
              <Link to="/auth">去登录</Link>
            </Button>
          )}
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
