import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: change this to match your repo name if it's not exactly 'LabWebsite'
  base: '/LabWebsite/',
})
