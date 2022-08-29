/*
 * Author: Anthony Shivakumar 
 * Email: anthony.shivakumar@gov.bc.ca
 *
 * This is the vite config file that allows us to
 * customize our .vue to .js builds
 */

import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
       public_pid: resolve(__dirname, 'app/public/pid/vue/main.ts'),
      },
      output: {
	entryFileNames: "[name].js"
      },
    },
    outDir: 'dist/entry/builds/js/'
    },
});

