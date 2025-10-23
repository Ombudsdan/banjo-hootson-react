import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, sonarjs.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      security
      // Do not re-register 'sonarjs' here because it's already provided by sonarjs.configs.recommended in extends
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off', // There are many instances where exhaustive deps are intentionally omitted

      // eslint-plugin-security: basic protection against eval(), regex DoS, etc.
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-unsafe-regex': 'warn',
      'security/detect-object-injection': 'off', // optional; can be noisy

      // eslint-plugin-sonarjs: code “smell” rules
      'sonarjs/no-duplicate-string': ['warn', { threshold: 3 }],
      'sonarjs/cognitive-complexity': ['warn', 20],
      'sonarjs/no-identical-functions': 'warn',
      'sonarjs/no-collapsible-if': 'warn',
      'sonarjs/no-inverted-boolean-check': 'warn',
      'sonarjs/todo-tag': 'warn',
      'sonarjs/pseudo-random': 'warn',
      'sonarjs/no-nested-functions': 'warn',
      'sonarjs/no-redundant-jump': 'warn',
      'sonarjs/no-nested-conditional': 'warn',
      'sonarjs/no-all-duplicated-branches': 'warn',
      'sonarjs/slow-regex': 'warn',
      'sonarjs/void-use': 'off',

      // Custom import restrictions to enforce architectural constraints
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'model',
              message:
                "Import from specific submodules (e.g. 'model/page-alert') instead of the 'model' barrel to avoid circular dependencies."
            }
          ],
          patterns: [
            // Disallow reaching into aliased folders via relative paths from outside
            { group: ['../*/auth/*'] },
            { group: ['../*/components/*'] },
            { group: ['../*/controllers/*'] },
            { group: ['../*/enums/*'] },
            { group: ['../*/env/*'] },
            { group: ['../*/framework/*'] },
            { group: ['../*/hooks/*'] },
            { group: ['../*/layout/*'] },
            { group: ['../*/model/*'] },
            { group: ['../*/routes/*'] },
            { group: ['../*/services/*'] },
            { group: ['../*/test/*'] },
            { group: ['../*/utils/*'] },
            { group: ['../*/validators/*'] },
            // Disallow importing from src root when alias exists
            { group: ['src/auth/*'] },
            { group: ['src/components/*'] },
            { group: ['src/controllers/*'] },
            { group: ['src/enums/*'] },
            { group: ['src/env/*'] },
            { group: ['src/framework/*'] },
            { group: ['src/hooks/*'] },
            { group: ['src/layout/*'] },
            { group: ['src/model/*'] },
            { group: ['src/routes/*'] },
            { group: ['src/services/*'] },
            { group: ['src/test/*'] },
            { group: ['src/utils/*'] },
            { group: ['src/validators/*'] }
          ]
        }
      ]
    }
  },
  {
    // Prevent direct PageHeading usage in page components; enforce central heading outlet
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'framework/PageHeading',
              message:
                'Do not import PageHeading directly in pages; use usePageHeading or useHeading instead (rendered via HeadingOutlet).'
            }
          ]
        }
      ]
    }
  },
  {
    // Test files: relax certain sonarjs rules that are noisy or not relevant in tests
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/__tests__/**/*.{ts,tsx}'],
    rules: {
      'sonarjs/constructor-for-side-effects': 'off',
      'sonarjs/no-duplicate-string': 'off'
    }
  }
]);
