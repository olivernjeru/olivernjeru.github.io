import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/',
  plugins: [
    react({
      include: /\.(jsx?|tsx?)$/,
    }),
    prerender({
      routes: ['/'],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterTime: 4500,
        headless: true,
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2019',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
    drop: ['console', 'debugger'],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
});
