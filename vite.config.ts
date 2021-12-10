import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // 暴露本地服务到局域网
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://pc.hbeasts.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    define: {
        'process.env': {},
    },
    resolve: {
        alias: {
            '@': '/src/',
            // '@': path.resolve(__dirname, 'src'),
            // process: 'process/browser',
            // stream: 'stream-browserify',
            // zlib: 'browserify-zlib',
            // util: 'util',
        },
    },
})
