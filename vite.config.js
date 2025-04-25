import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      external: ['react-router/dom']
    }
  },
  resolve: {
    alias: {
      'react-router/dom': 'react-router-dom'
    }
  }
})