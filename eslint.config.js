import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      // 生成物：由构建脚本打包产出的 Deno 部署 bundle，非手写代码
      "supabase/functions/render-photo/DEPLOY_BUNDLE.ts",
    ],
  },
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
  {
    // 历史遗留代码（迁移自原仓库）：`any` 降级为 warn 作为技术债跟踪。
    // 新代码目录（domain/stageos、features/、hooks/、stores/）不在此列，保持 error。
    files: ["src/pages/**", "src/lib/**", "src/components/**", "supabase/functions/**", "src/integrations/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
);
