import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
  },
  server: {
    watch: {
      usePolling: true, // Ensures Vite watches file changes inside Docker
    },
    host: '0.0.0.0', // Allows connections from outside the container
    port: 5173,
    strictPort: true,
  },
})
