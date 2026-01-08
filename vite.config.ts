
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
  import path from 'path';

  export default defineConfig({
    plugins: [
      react(),
      // Plugin to handle figma:asset/* imports dynamically
      {
        name: 'figma-asset-resolver',
        resolveId(id) {
          if (id.startsWith('figma:asset/')) {
            const filename = id.replace('figma:asset/', '');
            return path.resolve(__dirname, './src/assets', filename);
          }
        },
      },
      // Image optimization - compress PNGs and convert to WebP
      ViteImageOptimizer({
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
        },
        webp: {
          quality: 80,
          lossless: false,
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      // Enable better chunking for assets
      rollupOptions: {
        output: {
          manualChunks: {
            'design-images': [
              './src/assets/night_Bookworm - Clubs.png',
              './src/assets/night_Bookworm - Discover Books.png',
              './src/assets/night_Bookworm - Feed.png',
            ],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });