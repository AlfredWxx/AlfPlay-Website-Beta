import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
      include: ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
          },
        }
      },
    },
    server: {
      proxy: {
        '/api': {
          target: mode === 'development' 
            ? 'http://localhost:3001'
            : 'https://alfplay.com',
          changeOrigin: true,
          secure: false
        },
      },
    },
  };
});
