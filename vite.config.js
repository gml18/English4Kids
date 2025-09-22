import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  base: '/English4Kids/', // 👈 👈 nombre EXACTO de tu repo
  plugins: [vue()],
})

