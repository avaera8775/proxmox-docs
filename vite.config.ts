import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Replace 'proxmox-docs' with your GitHub repo name
export default defineConfig({
  base: '/proxmox-docs/',
  plugins: [vue()],
})
