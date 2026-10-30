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
      // // 산림청 국립수목원 식물자원 서비스
      // '/service/guide': {
      //   target: 'http://openapi.nature.go.kr/openapi/service/rest/PlantService',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/service\/guide/, ''),
      //   secure: false
      // }
      //   // 농촌진흥청 실내정원용 식물
      //   '/service/indoor': {
      //     target: 'http://api.nongsaro.go.kr/service/garden',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/service\/indoor/, ''),
      //     secure: false
      //   }
      // Trefle 식물 이미지 (토큰은 함수에서 붙임)
      '/service/guideImg': {
        target: 'https://asia-northeast3-house-plant-gardener.cloudfunctions.net',
        changeOrigin: true,
        rewrite: (path) => `/trefleImg${path}`
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
          @import "./public/styles/_variables";
          @import "./public/styles/_mixins";
        `
      }
    }
  }
})
