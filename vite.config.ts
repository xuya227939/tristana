import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@mobx': path.resolve(__dirname, 'src/mobx'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@locales': path.resolve(__dirname, 'src/locales'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@servers': path.resolve(__dirname, 'src/servers'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@mock': path.resolve(__dirname, 'src/mock')
        }
    },
    assetsInclude: ['**/*.jpg'],
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
});
