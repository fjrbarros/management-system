import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), tsconfigPaths()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@providers': '/src/providers',
      '@routers': '/src/routers',
      '@hooks': '/src/hooks',
      '@constants': '/src/constants',
    },
  },
});
