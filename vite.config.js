import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const apiUrl = process.env.VITE_AKFEN_API_URL || 'http://admin-api.akfen39.ru/api'
const apiOrigin = apiUrl.replace(/\/api\/?$/, '')

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: apiOrigin,
        changeOrigin: true,
      },
      '/storage': {
        target: apiOrigin,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/assets/styles/index.scss";`,
  //     },
  //   },
  // },
})
