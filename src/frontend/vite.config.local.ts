import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      manifest: true,
    },
    server: {
      host: true,
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://dpia-api:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
