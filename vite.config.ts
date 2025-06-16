import {defineConfig} from 'vite';
import babel from '@rollup/plugin-babel';
import svgr from 'vite-plugin-svgr';
import stylelint from 'vite-plugin-stylelint';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    babel({extensions: ['.ts', '.tsx'], babelHelpers: 'bundled', skipPreflightCheck: true}),
    svgr({
      include: '**/*.svg',
    }),
    stylelint({
      fix: true,
    }),
    react(),
  ],
  resolve: {
    alias: [
      {find: '~', replacement: '/src'},
      {find: '@', replacement: '/src'},
    ],
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://crowdparlay.com',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
          '*': 'localhost',
        },
      },
    },
  },
});
