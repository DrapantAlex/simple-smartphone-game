import { defineConfig } from 'vite';

// base: './' fa funzionare il gioco anche dentro una sottocartella (es. GitHub Pages).
export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 2000 },
});
