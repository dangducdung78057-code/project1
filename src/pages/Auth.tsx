import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, LogIn, UserPlus, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { FullPageLoader } from "@/components/FullPageLoader";

/** 将 Supabase Auth 常见英文报错映射为中文提示 */
function zhAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("email not confirmed")) return "邮箱尚未验证：请先到邮箱点击确认链接，再回来登录";
  if (m.includes("invalid login credentials")) return "邮箱或密码不正确，请检查后重试";
  if (m.includes("user already registered")) return "该邮箱已注册，请直接登录或使用找回密码";
  if (m.includes("password should be at least")) return "密码太短：至少需要 6 位";
  if (m.includes("rate limit") || m.includes("too many requests")) return "操作过于频繁，请稍等一分钟再试";
  if (m.includes("network") || m.includes("fetch")) return "网络异常：无法连接认证服务，请检查网络后重试";
  return msg;
}


export default function AuthPage() {
  const { user, loading, signIn, signUp } = useAuth();
  const loc = useLocation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingConfirmEmail, setPendingConfirmEmail] = useState<string | null>(null);

  if (loading) return <FullPageLoader />;
  if (user) {
    const from = (loc.state as any)?.from?.pathname ?? "/";
    return <Navigate to={from} replace />;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { toast.error("请填写邮箱和密码"); return; }
    setBusy(true);
    if (mode === "signin") {
      const { error } = await signIn(email, password);
      setBusy(false);
      if (error) { toast.error(zhAuthError(error)); return; }
      toast.success("已登录");
      return;
    }
    const { error, needsEmailConfirm } = await signUp(email, password);
    setBusy(false);
    if (error) { toast.error(zhAuthError(error)); return; }
    if (needsEmailConfirm) {
      setPendingConfirmEmail(email);
      setMode("signin");
      return;
    }
    toast.success("注册成功，已自动登录");
  }

  return (
    <div className="min-h-dvh bg-background grid place-items-center p-4">
      <main className="w-full max-w-sm panel">
        <h1 className="sr-only">登录 StageOS 演出服装排产工作台</h1>
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-primary grid place-items-center text-primary-foreground">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">StageOS</div>
              <div className="text-[10px] font-mono text-muted-foreground">ops.costume.v2</div>
            </div>
          </div>
          <span className="kbd-route">auth</span>
        </div>
        <form onSubmit={submit} className="panel-body space-y-3">
          {pendingConfirmEmail && (
            <div role="status" className="flex gap-2.5 rounded border border-primary/30 bg-primary/5 p-3">
              <MailCheck className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
              <div className="space-y-1 text-xs leading-relaxed">
                <p className="font-semibold text-foreground">注册成功，请先验证邮箱</p>
                <p className="text-muted-foreground text-pretty">
                  确认邮件已发送至 <span className="font-mono text-foreground">{pendingConfirmEmail}</span>，
                  请前往邮箱点击确认链接后再回到本页登录。未收到请检查垃圾邮件夹。
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-1 p-0.5 bg-surface-muted rounded text-xs">
            <button type="button" onClick={() => setMode("signin")}
              className={`flex-1 py-1.5 rounded ${mode === "signin" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>
              登录
            </button>
            <button type="button" onClick={() => setMode("signup")}
              className={`flex-1 py-1.5 rounded ${mode === "signup" ? "bg-background shadow-sm" : "text-muted-foreground"}`}>
              注册
            </button>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">邮箱</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.edu" autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">密码</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="至少 6 位" autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {mode === "signin" ? <><LogIn className="h-4 w-4 mr-1" />登录</> : <><UserPlus className="h-4 w-4 mr-1" />注册并登录</>}
          </Button>
          <p className="text-[11px] text-muted-foreground">
            v2 已启用邮箱注册与登录；所有项目、快照、导出记录按 <span className="font-mono">user_id</span> 隔离。
          </p>
        </form>
      </main>
    </div>
  );
}
