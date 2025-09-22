import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  base: '/English4Kids/' // 👈 Nombre exacto del repo en GitHub
})

