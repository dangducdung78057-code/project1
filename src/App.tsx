import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/AppShell";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RootErrorBoundary } from "@/components/RootErrorBoundary";
import { RouteHead } from "@/components/RouteHead";
import Workspace from "./pages/Workspace";
import Projects from "./pages/Projects";
import ProjectEditor from "./pages/ProjectEditor";
import ProjectWizard from "./pages/ProjectWizard";
import ProjectDetail from "./pages/ProjectDetail";
import Modules from "./pages/Modules";
import Exports from "./pages/Exports";
import SettingsPage from "./pages/Settings";
import AuthPage from "./pages/Auth";
import StageEditor from "./pages/StageEditor";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { MemberRoute } from "./components/MemberRoute";
import { lazy, Suspense } from "react";

// 3D 编辑器按需加载：免费用户不会提前下载 three.js 及会员资源
const Formation3D = lazy(() => import("./pages/Formation3D"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RootErrorBoundary>
            <AuthProvider>
              <RouteHead />
              <ScrollToTop />
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/formation-3d"
                  element={
                    <MemberRoute>
                      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">加载 3D 编辑器…</div>}>
                        <Formation3D />
                      </Suspense>
                    </MemberRoute>
                  }
                />
                <Route path="/stage-editor" element={<StageEditor />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <AppShell>
                        <Routes>
                          <Route path="/" element={<Workspace />} />
                          <Route path="/projects" element={<Projects />} />
                          <Route path="/projects/new" element={<ProjectEditor />} />
                          <Route path="/projects/new/wizard" element={<ProjectWizard />} />
                          <Route path="/projects/:id/edit" element={<ProjectEditor />} />
                          <Route path="/projects/:id" element={<ProjectDetail />} />
                          <Route path="/modules" element={<Modules />} />
                          <Route path="/exports" element={<Exports />} />
                          <Route path="/settings" element={<SettingsPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </AppShell>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </AuthProvider>
          </RootErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
