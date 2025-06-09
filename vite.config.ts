import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/proxmox-docs/',
  plugins: [vue()],
})
