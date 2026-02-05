import fetch from 'node-fetch'
import { defaultContent } from '../src/data/defaultContent.js'
import dotenv from 'dotenv'

dotenv.config()

const BIN_ID = process.env.VITE_JSONBIN_BIN_ID
const MASTER_KEY = process.env.VITE_JSONBIN_MASTER_KEY
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`

console.log('🔄 Reseteando contenido en JSONBin con los nuevos datos locales...')
console.log(`Target Bin: ${BIN_ID}`)

async function resetContent() {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': MASTER_KEY
            },
            body: JSON.stringify(defaultContent)
        })

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`)
        }

        const data = await response.json()
        console.log('✅ Contenido actualizado correctamente!')
        console.log('Nuevo número de WhatsApp:', defaultContent.settings.whatsappNumber)
        console.log('Metadata:', data.metadata)
    } catch (error) {
        console.error('❌ Error al actualizar:', error.message)
    }
}

resetContent()
