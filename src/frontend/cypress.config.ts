import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
  },
  video: false,
  defaultCommandTimeout: 5000,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
