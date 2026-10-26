import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-react-preview',
    emptyOutDir: true,
    rollupOptions: {
      input: 'react-preview.html',
    },
  },
});
