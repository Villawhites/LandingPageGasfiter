import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { defaultContent } from '../data/defaultContent'

const ContentContext = createContext()

// JSONBin.io configuration
const JSONBIN_API = 'https://api.jsonbin.io/v3/b'
const BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID
const MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY
const ACCESS_KEY = import.meta.env.VITE_JSONBIN_ACCESS_KEY

// Cache configuration
const CACHE_KEY = 'gasfiter_content_cache'
const CACHE_TIMESTAMP_KEY = 'gasfiter_cache_timestamp'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

export function ContentProvider({ children }) {
    const [content, setContent] = useState(defaultContent)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    // Check if cache is valid
    const isCacheValid = useCallback(() => {
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
        if (!timestamp) return false

        const cacheAge = Date.now() - parseInt(timestamp, 10)
        return cacheAge < CACHE_DURATION
    }, [])

    // Get content from cache
    const getFromCache = useCallback(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEY)
            if (cached) {
                return JSON.parse(cached)
            }
        } catch (e) {
            console.error('Error reading cache:', e)
        }
        return null
    }, [])

    // Save content to cache
    const saveToCache = useCallback((data) => {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(data))
            localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
        } catch (e) {
            console.error('Error saving to cache:', e)
        }
    }, [])

    // Fetch content from JSONBin.io
    const fetchContent = useCallback(async (forceRefresh = false) => {
        // If no BIN_ID, fall back to localStorage only (dev mode)
        if (!BIN_ID) {
            console.log('JSONBin not configured, using localStorage only')
            const cached = getFromCache()
            if (cached) {
                setContent({ ...defaultContent, ...cached })
            }
            setIsLoading(false)
            return
        }

        // Check cache first (unless forcing refresh)
        if (!forceRefresh && isCacheValid()) {
            const cached = getFromCache()
            if (cached) {
                console.log('Using cached content')
                setContent({ ...defaultContent, ...cached })
                setIsLoading(false)
                return
            }
        }

        // Fetch from JSONBin
        try {
            console.log('Fetching from JSONBin...')
            const response = await fetch(`${JSONBIN_API}/${BIN_ID}/latest`, {
                headers: {
                    'X-Access-Key': ACCESS_KEY || MASTER_KEY,
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            // Check if content has been initialized
            if (data.record && !data.record.initialized) {
                const newContent = { ...defaultContent, ...data.record }
                setContent(newContent)
                saveToCache(newContent)
            } else {
                setContent(defaultContent)
                saveToCache(defaultContent)
            }
        } catch (e) {
            console.error('Error fetching from JSONBin:', e)
            setError('Error al cargar el contenido')

            // Fall back to cache even if expired
            const cached = getFromCache()
            if (cached) {
                console.log('Using expired cache as fallback')
                setContent({ ...defaultContent, ...cached })
            } else {
                setContent(defaultContent)
            }
        } finally {
            setIsLoading(false)
        }
    }, [getFromCache, isCacheValid, saveToCache])

    // Load content on mount
    useEffect(() => {
        fetchContent()
    }, [fetchContent])

    // Save content to JSONBin.io
    const saveContent = async (newContent) => {
        setIsSaving(true)

        // Always save to cache immediately (optimistic update)
        saveToCache(newContent)
        setContent(newContent)

        // If no BIN_ID, only use cache
        if (!BIN_ID) {
            setIsSaving(false)
            return { success: true }
        }

        try {
            const response = await fetch(`${JSONBIN_API}/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': MASTER_KEY,
                },
                body: JSON.stringify(newContent)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            setIsSaving(false)
            return { success: true }
        } catch (e) {
            console.error('Error saving to JSONBin:', e)
            setError('Error al guardar en el servidor (guardado localmente)')
            setIsSaving(false)
            // Still return success since we saved to cache
            return { success: true, warning: 'Guardado solo en cache local' }
        }
    }

    // Update a specific section
    const updateSection = (section, data) => {
        const newContent = {
            ...content,
            [section]: { ...content[section], ...data }
        }
        return saveContent(newContent)
    }

    // Update a specific text field
    const updateText = (section, field, value) => {
        const newContent = {
            ...content,
            [section]: { ...content[section], [field]: value }
        }
        return saveContent(newContent)
    }

    // Update an image (stored as base64)
    const updateImage = (section, field, base64Data) => {
        const newContent = {
            ...content,
            [section]: { ...content[section], [field]: base64Data }
        }
        return saveContent(newContent)
    }

    // Update settings (colors, etc)
    const updateSettings = (settings) => {
        const newContent = {
            ...content,
            settings: { ...content.settings, ...settings }
        }
        return saveContent(newContent)
    }

    // Update an item in an array (for certifications, services, cases)
    const updateArrayItem = (section, itemId, data) => {
        const items = content[section].items.map(item =>
            item.id === itemId ? { ...item, ...data } : item
        )
        const newContent = {
            ...content,
            [section]: { ...content[section], items }
        }
        return saveContent(newContent)
    }

    // Add an item to an array
    const addArrayItem = (section, item) => {
        const newId = Math.max(...content[section].items.map(i => i.id), 0) + 1
        const newContent = {
            ...content,
            [section]: {
                ...content[section],
                items: [...content[section].items, { ...item, id: newId }]
            }
        }
        return saveContent(newContent)
    }

    // Remove an item from an array
    const removeArrayItem = (section, itemId) => {
        const items = content[section].items.filter(item => item.id !== itemId)
        const newContent = {
            ...content,
            [section]: { ...content[section], items }
        }
        return saveContent(newContent)
    }

    // Reset to default content
    const resetContent = async () => {
        const result = await saveContent(defaultContent)
        return result
    }

    // Refresh content from server (force bypass cache)
    const refreshContent = () => {
        setIsLoading(true)
        return fetchContent(true) // Force refresh
    }

    // Clear cache
    const clearCache = () => {
        localStorage.removeItem(CACHE_KEY)
        localStorage.removeItem(CACHE_TIMESTAMP_KEY)
    }

    return (
        <ContentContext.Provider value={{
            content,
            isLoading,
            isSaving,
            error,
            saveContent,
            updateSection,
            updateText,
            updateImage,
            updateSettings,
            updateArrayItem,
            addArrayItem,
            removeArrayItem,
            resetContent,
            refreshContent,
            clearCache,
        }}>
            {children}
        </ContentContext.Provider>
    )
}

export function useContent() {
    const context = useContext(ContentContext)
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider')
    }
    return context
}
