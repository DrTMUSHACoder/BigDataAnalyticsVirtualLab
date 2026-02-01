import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Safe config for Netlify
export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    server: {
        historyApiFallback: true
    }
})
