import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/player/index.ts'),
      name: 'VeloPlayer',
      fileName: () => 'player.js',
      formats: ['iife'],
    },
    target: 'esnext',
    minify: 'esbuild',
  },
});
