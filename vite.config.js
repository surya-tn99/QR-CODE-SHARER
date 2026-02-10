export default {
    base: '/QR-CODE-SHARER/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                redirect: 'redirect/index.html'
            }
        }
    }
}
