import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Ensure __dirname works in ESM/TS config
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'src/test/setupTests.ts')],
    css: false,
    globals: true,
    // % set to 0 until coverage is added
    coverage: {
      provider: 'v8',
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0
      }
    }
  },
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  },
  resolve: {
    alias: {
      builders: path.resolve(__dirname, './src/builders'),
      components: path.resolve(__dirname, './src/components'),
      controllers: path.resolve(__dirname, './src/controllers'),
      enums: path.resolve(__dirname, './src/enums'),
      env: path.resolve(__dirname, './src/env'),
      framework: path.resolve(__dirname, './src/framework'),
      hooks: path.resolve(__dirname, './src/hooks'),
      icons: path.resolve(__dirname, './src/icons.ts'),
      layout: path.resolve(__dirname, './src/layout'),
      // Test utilities alias
      test: path.resolve(__dirname, './src/test'),
      routes: path.resolve(__dirname, './src/routes'),
      services: path.resolve(__dirname, './src/services'),
      utils: path.resolve(__dirname, './src/utils'),
      validators: path.resolve(__dirname, './src/validators'),
      model: path.resolve(__dirname, './src/model'),
      src: path.resolve(__dirname, './src')
    }
  }
});
