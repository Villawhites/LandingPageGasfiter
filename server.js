import { spawn } from 'child_process'
import https from 'https'
import http from 'http'

// Configuración
const PORT = process.env.PORT || 3000
const SITE_URL = process.env.VITE_SITE_URL || `http://localhost:${PORT}`
const PING_INTERVAL = 14 * 60 * 1000 // 14 minutos

console.log(`🚀 Iniciando servidor y autoping...`)
console.log(`Target URL: ${SITE_URL}/ping`)

// 1. Iniciar "serve" para archivos estáticos (dist)
const server = spawn('npx', ['serve', 'dist', '-s', '-l', PORT], {
    stdio: 'inherit',
    shell: true
})

server.on('error', (err) => {
    console.error('❌ Error al iniciar serve:', err)
})

// 2. Lógica de Autoping
const ping = () => {
    // Evitar ping en localhost a menos que sea explícito
    if (SITE_URL.includes('localhost') && process.env.NODE_ENV !== 'production') return

    const protocol = SITE_URL.startsWith('https') ? https : http

    protocol.get(`${SITE_URL}/ping`, (res) => {
        console.log(`📡 Ping enviado a ${SITE_URL}/ping - Status: ${res.statusCode} (${new Date().toISOString()})`)
    }).on('error', (e) => {
        console.error(`⚠️ Error en ping: ${e.message}`)
    })
}

// Iniciar intervalo
setInterval(ping, PING_INTERVAL)

// Primer ping a los 10 segundos (para dar tiempo a que levante)
setTimeout(ping, 10000)
