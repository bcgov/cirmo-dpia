import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react()],
    build: {
      manifest: true,
    },
    server: {
      host: true,
      port: Number(process.env.VITE_PORT),
    },
  };
});
