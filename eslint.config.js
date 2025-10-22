import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // There are many instances where exhaustive deps are intentionally omitted
      'react-hooks/exhaustive-deps': 'off',
      // Keep rules minimal until Angular ruleset is mirrored (placeholder for mirroring step)
      "no-restricted-imports": [
        "error",
        {
          // Precisely disallow only the model barrel import, not submodules
          paths: [
            {
              name: "model",
              message:
                "Import from specific submodules (e.g. 'model/page-alert') instead of the 'model' barrel to avoid circular dependencies.",
            },
          ],
          patterns: [
            // Disallow reaching into aliased folders via relative paths from outside
            "../*/auth/*",
            "../*/components/*",
            "../*/controllers/*",
            "../*/enums/*",
            "../*/env/*",
            "../*/framework/*",
            "../*/hooks/*",
            "../*/layout/*",
            "../*/model/*",
            "../*/routes/*",
            "../*/services/*",
            "../*/utils/*",
            // Disallow importing from src root when alias exists
            "src/auth/*",
            "src/components/*",
            "src/controllers/*",
            "src/env/*",
            "src/framework/*",
            "src/hooks/*",
            "src/layout/*",
            "src/model/*",
            "src/routes/*",
            "src/services/*",
            "src/utils/*",
            "src/validators/*",
          ],
          message:
            "Use the configured path alias (e.g. 'components', 'services', 'auth') instead of relative or 'src/*' import paths.",
        },
      ],
    },
  },
  {
    // Prevent direct PageHeading usage in page components; enforce central heading outlet
    files: ["src/pages/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          name: "@/framework/PageHeading",
          message:
            "Do not import PageHeading directly in pages; use usePageHeading or useHeading instead (rendered via HeadingOutlet).",
        },
      ],
    },
  },
]);
