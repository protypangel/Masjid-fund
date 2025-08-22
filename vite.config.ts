import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwind(), svgLoader()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
