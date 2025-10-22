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
      // Keep rules minimal until Angular ruleset is mirrored (placeholder for mirroring step)
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // Disallow importing from the model barrel to avoid circular dependencies
            {
              group: ["model"],
              message:
                "Import from specific submodules (e.g. 'model/page-alert') instead of the 'model' barrel to avoid circular dependencies.",
            },
            // Disallow reaching into aliased folders via relative paths from outside
            { group: ["../*/auth/*"] },
            { group: ["../*/components/*"] },
            { group: ["../*/controllers/*"] },
            { group: ["../*/enums/*"] },
            { group: ["../*/env/*"] },
            { group: ["../*/framework/*"] },
            { group: ["../*/hooks/*"] },
            { group: ["../*/layout/*"] },
            { group: ["../*/model/*"] },
            { group: ["../*/routes/*"] },
            { group: ["../*/services/*"] },
            { group: ["../*/test/*"] },
            { group: ["../*/utils/*"] },
            { group: ["../*/validators/*"] },
            // Disallow importing from src root when alias exists
            { group: ["src/auth/*"] },
            { group: ["src/components/*"] },
            { group: ["src/controllers/*"] },
            { group: ["src/enums/*"] },
            { group: ["src/env/*"] },
            { group: ["src/framework/*"] },
            { group: ["src/hooks/*"] },
            { group: ["src/layout/*"] },
            { group: ["src/model/*"] },
            { group: ["src/routes/*"] },
            { group: ["src/services/*"] },
            { group: ["src/test/*"] },
            { group: ["src/utils/*"] },
            { group: ["src/validators/*"] },
          ],
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
          paths: [
            {
              name: "framework/PageHeading",
              message:
                "Do not import PageHeading directly in pages; use usePageHeading or useHeading instead (rendered via HeadingOutlet).",
            },
          ],
        },
      ],
    },
  },
]);
