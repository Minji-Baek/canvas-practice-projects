import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_", 
  plugins: [react()],
  base: '/canvas-practice-projects/',
  build: {
    chunkSizeWarningLimit: 1600,
    // outDir: '../dist',
    // emptyOutDir: true,
    },

})
