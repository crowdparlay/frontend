import {defineConfig} from 'vite';
import babel from '@rollup/plugin-babel';
import svgr from 'vite-plugin-svgr';
import stylelint from 'vite-plugin-stylelint';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    babel({extensions: ['.ts', '.tsx'], babelHelpers: 'bundled', skipPreflightCheck: true}),
    tailwindcss(),
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
