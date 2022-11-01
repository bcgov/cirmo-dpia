import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      manifest: true,
    },
    server: {
      host: true,
      port: 8080,
    },
  };
});
