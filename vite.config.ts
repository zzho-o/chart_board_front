import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log('✅ VITE_API_URL:', env.VITE_API_URL);
  console.log('✅ BASE_PATH:', env.BASE_PATH);

  return {
    base: env.BASE_PATH || '/',
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@pages': '/src/pages',
        '@stores': '/src/stores',
        '@hooks': '/src/hooks',
      },
    },
  };
});
