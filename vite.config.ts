import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

const path = require('path');
export default defineConfig({
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
    plugins: [
        reactRefresh(),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    libDirectory: 'es',
                    style: name => `antd/es/${name}/style`
                }
            ]
        })
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
});
