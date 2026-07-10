import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // dist 为构建产物；DEPLOY_BUNDLE.ts 为脚本生成的 Edge Function 部署包，非手写代码
  { ignores: ["dist", "supabase/functions/render-photo/DEPLOY_BUNDLE.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  // 遗留代码技术债：原仓库迁入文件存在大量 `any`（223 处）。
  // 一次性改写风险高，降级为 warn 并逐步清理；新代码（domain/features/hooks/stores 等）保持 error。
  {
    files: [
      "src/lib/exportRender.ts",
      "src/lib/exportStorage.ts",
      "src/lib/webhook.ts",
      "src/lib/procurementProvider.ts",
      "src/lib/procurementExport.ts",
      "src/lib/procurementSettings.ts",
      "src/lib/releaseFreeze.ts",
      "src/lib/capabilitySnapshot.ts",
      "src/lib/mockPlan.ts",
      "src/pages/ProjectDetail.tsx",
      "src/pages/ProjectWizard.tsx",
      "src/pages/ProjectEditor.tsx",
      "src/pages/Exports.tsx",
      "src/pages/Settings.tsx",
      "src/pages/Auth.tsx",
      "src/main.tsx",
      "src/components/HealthCheck.tsx",
      "src/components/RootErrorBoundary.tsx",
      "supabase/functions/**/*.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
);
