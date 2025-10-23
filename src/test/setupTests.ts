import '@testing-library/jest-dom/vitest';
import getEnv from '../../get-env';
import type { IEnvironment } from '../env/types';

// Provide a minimal global __ENV__ for modules that read env at import time
// Matches the shape defined in src/env/index.ts
// Using globalThis avoids TS/ESM interop issues
declare global {
  var __ENV__: IEnvironment;
}

globalThis.__ENV__ = getEnv({});
