import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueRouter({}), vue(), Pages(), Layouts()],
  server: {
    proxy: {
      '/service/garden': {
        target: 'http://api.nongsaro.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/service^\/garden/, ''),
        secure: false,
        ws: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'firebase/dist'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/_variables";
          @import "./src/assets/styles/_mixins";
        `
      }
    }
  }
})
