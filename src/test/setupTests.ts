// Extend expect with @testing-library/jest-dom matchers
import '@testing-library/jest-dom/vitest';

// Provide a minimal global __ENV__ for modules that read env at import time
// Matches the shape defined in src/env/index.ts
// Using globalThis avoids TS/ESM interop issues
declare global {
  var __ENV__: Record<string, string>;
}

globalThis.__ENV__ = {
  API_URL: 'http://localhost',
  FIREBASE_API_KEY: '',
  FIREBASE_AUTH_DOMAIN: '',
  FIREBASE_PROJECT_ID: '',
  FIREBASE_APP_ID: '',
  FIREBASE_MESSAGING_SENDER_ID: ''
};
