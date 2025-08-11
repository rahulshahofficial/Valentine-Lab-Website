// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // MUST match your repo name exactly (case-sensitive)
  base: '/Valentine-Lab-Website/',
  // Build directly into /docs for GitHub Pages
  build: { outDir: 'docs', assetsDir: 'assets', emptyOutDir: true },
})
