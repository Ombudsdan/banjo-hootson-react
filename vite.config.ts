import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import getEnv from './get-env';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = getEnv(loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react()],
    server: {
      host: true,
      port: env.PORT
    },
    define: {
      __ENV__: JSON.stringify(env)
    }
  };
});
