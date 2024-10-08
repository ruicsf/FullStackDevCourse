import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Ensure this is your backend address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Optional, depends on backend route structure
      },
    },
  },
});
