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
    },
  },
  {
    // Prevent direct PageHeadingContainer usage in page components; enforce central heading outlet
    files: ["src/pages/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          name: "@/framework/PageHeadingContainer",
          message:
            "Do not import PageHeadingContainer directly in pages; use usePageHeading or useHeading instead (rendered via HeadingOutlet).",
        },
      ],
    },
  },
]);
