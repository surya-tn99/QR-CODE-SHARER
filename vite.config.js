import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
    base: command === 'serve' ? '/' : '/QR-CODE-SHARER/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                redirect: 'redirect/index.html'
            }
        }
    }
}))
