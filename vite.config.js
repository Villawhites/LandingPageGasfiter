import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    // Load env variables
    const env = loadEnv(mode, process.cwd(), '')
    const siteUrl = env.VITE_SITE_URL || 'https://gasfiter-concepcion.onrender.com'

    return {
        plugins: [
            react(),
            // Replace %VITE_SITE_URL% in HTML
            {
                name: 'html-transform',
                transformIndexHtml(html) {
                    return html.replace(/%VITE_SITE_URL%/g, siteUrl)
                }
            }
        ],
        build: {
            outDir: 'dist'
        },
        define: {
            // Make VITE_SITE_URL available in JS if needed
            'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl)
        }
    }
})
