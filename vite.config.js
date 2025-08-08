import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Set this to your repo name exactly:
  base: '/Valentine-Lab-Website/',
  // Optional: uncomment to build directly into /docs for GitHub Pages
  // build: { outDir: 'docs' },
})
