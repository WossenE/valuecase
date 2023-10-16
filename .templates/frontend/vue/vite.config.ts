import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3500,
    proxy: {
      '^/api/?.*': {
        target: 'http://localhost:3501',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/?api/, ''),
      },
    }
  }
})
