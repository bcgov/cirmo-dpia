import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://dev.pia.gov.bc.ca',
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
