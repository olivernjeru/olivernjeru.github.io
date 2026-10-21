import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { sharedHead } from './config/sharedHead.js';

// Every page of the site: Rollup input name -> HTML file in the project root.
// Each also needs a renderer in src/entry-server.jsx. Adding a page: src/pages/README.md.
const PAGES = {
  main: 'index.html',
  publications: 'publications.html',
  privacy: 'privacy.html',
  notFound: '404.html',
};

// `npm run build` runs two builds, then scripts/prerender.mjs:
//   1. client build (this config, isSsrBuild false) -> dist/
//   2. `vite build --ssr src/entry-server.jsx` (isSsrBuild true) -> dist-ssr/
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  // No client-side routing: without the SPA fallback, dev and preview answer
  // unknown paths with 404, as GitHub Pages does.
  appType: 'mpa',
  plugins: [
    react({
      include: /\.(jsx?|tsx?)$/,
    }),
    sharedHead(),
  ],
  build: isSsrBuild
    ? {
      // Only used to render HTML at build time; deleted by scripts/prerender.mjs.
      outDir: 'dist-ssr',
      copyPublicDir: false,
      sourcemap: false,
    }
    : {
      outDir: 'dist',
      sourcemap: false,
      target: 'es2019',
      rollupOptions: {
        input: Object.fromEntries(
          Object.entries(PAGES).map(([name, file]) => [name, resolve(__dirname, file)])
        ),
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
}));
