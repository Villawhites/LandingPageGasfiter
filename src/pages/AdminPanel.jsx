import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useContent } from '../context/ContentContext'
import Header from '../components/Header'
import Hero from '../components/Hero'
import QuienSoy from '../components/QuienSoy'
import Servicios from '../components/Servicios'
import Certificaciones from '../components/Certificaciones'
import Curriculum from '../components/Curriculum'
import CasosExito from '../components/CasosExito'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'

function AdminPanel() {
    const { isLoggedIn, isLoading: authLoading, logout } = useAuth()
    const { content, updateText, updateImage, updateSettings, updateArrayItem, saveContent, isSaving } = useContent()
    const navigate = useNavigate()

    const [showSaveNotification, setShowSaveNotification] = useState(false)
    const [editModal, setEditModal] = useState(null)
    const [colorPickerOpen, setColorPickerOpen] = useState(false)
    const [editValue, setEditValue] = useState('')
    const fileInputRef = useRef(null)
    const pdfInputRef = useRef(null)

    // Available background colors
    const backgroundColors = [
        '#0f172a', '#1e293b', '#0c0a09', '#18181b', '#171717',
        '#1e1b4b', '#172554', '#082f49', '#042f2e', '#14532d',
        '#3f3f46', '#27272a', '#422006', '#44403c', '#1c1917',
    ]

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, authLoading, navigate])

    if (authLoading) {
        return (
            <div className="login-page">
                <div className="glass-card login-card text-center">
                    <p>Cargando...</p>
                </div>
            </div>
        )
    }

    if (!isLoggedIn) {
        return null
    }

    // Handle text edit
    const handleTextEdit = (section, field) => {
        // Parse field path for nested objects
        let value
        if (field.includes('.')) {
            const parts = field.split('.')
            if (parts[0] === 'item') {
                // Handle array items
                const itemId = parseInt(parts[1])
                const item = content[section].items.find(i => i.id === itemId)
                if (parts.length === 3) {
                    value = item?.[parts[2]] || ''
                } else if (parts.length === 4 && parts[2] === 'tags') {
                    value = item?.tags?.[parseInt(parts[3])] || ''
                }
            } else if (parts[0] === 'stats') {
                value = content[section].stats[parseInt(parts[1])][parts[2]]
            } else if (parts[0] === 'features') {
                value = content[section].features[parseInt(parts[1])]
            }
        } else {
            value = content[section]?.[field] || ''
        }

        setEditValue(value)
        setEditModal({ section, field, type: 'text' })
    }

    // Handle image edit
    const handleImageEdit = (section, field) => {
        setEditModal({ section, field, type: 'image' })
        fileInputRef.current?.click()
    }

    // Handle PDF edit
    const handlePdfEdit = () => {
        setEditModal({ section: 'curriculum', field: 'pdfUrl', type: 'pdf' })
        pdfInputRef.current?.click()
    }

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file || !editModal) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const base64 = event.target?.result

            if (editModal.type === 'pdf') {
                // Save PDF
                const newContent = {
                    ...content,
                    curriculum: {
                        ...content.curriculum,
                        pdfUrl: base64,
                        pdfName: file.name
                    }
                }
                saveContent(newContent)
            } else if (editModal.field.includes('item.')) {
                // Handle array item image
                const parts = editModal.field.split('.')
                const itemId = parseInt(parts[1])
                updateArrayItem(editModal.section, itemId, { image: base64 })
            } else {
                // Regular image field
                updateImage(editModal.section, editModal.field, base64)
            }

            showNotification()
        }
        reader.readAsDataURL(file)

        setEditModal(null)
        e.target.value = ''
    }

    // Save text edit
    const handleSaveEdit = () => {
        if (!editModal) return

        const { section, field } = editModal

        if (field.includes('.')) {
            const parts = field.split('.')
            if (parts[0] === 'item') {
                const itemId = parseInt(parts[1])
                const fieldName = parts[2]
                if (parts.length === 4 && parts[2] === 'tags') {
                    // Handle tags update
                    const item = content[section].items.find(i => i.id === itemId)
                    const newTags = [...(item?.tags || [])]
                    newTags[parseInt(parts[3])] = editValue
                    updateArrayItem(section, itemId, { tags: newTags })
                } else {
                    updateArrayItem(section, itemId, { [fieldName]: editValue })
                }
            } else if (parts[0] === 'stats') {
                const newStats = [...content[section].stats]
                newStats[parseInt(parts[1])][parts[2]] = editValue
                const newContent = {
                    ...content,
                    [section]: { ...content[section], stats: newStats }
                }
                saveContent(newContent)
            } else if (parts[0] === 'features') {
                const newFeatures = [...content[section].features]
                newFeatures[parseInt(parts[1])] = editValue
                const newContent = {
                    ...content,
                    [section]: { ...content[section], features: newFeatures }
                }
                saveContent(newContent)
            }
        } else {
            updateText(section, field, editValue)
        }

        showNotification()
        setEditModal(null)
        setEditValue('')
    }

    // Handle color change
    const handleColorChange = (color) => {
        updateSettings({ backgroundColor: color })

        // Also update CSS variable
        document.documentElement.style.setProperty('--color-bg', color)

        showNotification()
        setColorPickerOpen(false)
    }

    // Show save notification
    const showNotification = () => {
        setShowSaveNotification(true)
        setTimeout(() => setShowSaveNotification(false), 3000)
    }

    // Handle logout
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    // Preview mode (open in new tab)
    const handlePreview = () => {
        window.open('/', '_blank')
    }

    return (
        <div className="admin-panel" style={{ backgroundColor: content.settings.backgroundColor }}>
            {/* Admin Header */}
            <div className="admin-header">
                <h2>🔧 <span>Panel de Administración</span> {isSaving && <span style={{ fontSize: '0.8rem', color: 'var(--color-warning)' }}>💾 Guardando...</span>}</h2>
                <div className="admin-actions">
                    <button className="btn btn-secondary" onClick={handlePreview}>
                        👁️ Vista Previa
                    </button>
                    <button className="btn btn-secondary" onClick={handleLogout}>
                        🚪 Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Admin Content */}
            <div className="admin-content">
                <Header isAdmin />
                <Hero isAdmin onEdit={handleTextEdit} />
                <QuienSoy isAdmin onEdit={handleTextEdit} onImageEdit={handleImageEdit} />
                <Servicios isAdmin onEdit={handleTextEdit} />
                <Certificaciones isAdmin onEdit={handleTextEdit} onImageEdit={handleImageEdit} />
                <Curriculum isAdmin onEdit={handleTextEdit} onPdfEdit={handlePdfEdit} />
                <CasosExito isAdmin onEdit={handleTextEdit} onImageEdit={handleImageEdit} />
                <Contacto isAdmin onEdit={handleTextEdit} />
                <Footer isAdmin onEdit={handleTextEdit} />
            </div>

            {/* Admin Toolbar */}
            <div className="admin-toolbar">
                <button
                    className={`toolbar-btn ${colorPickerOpen ? 'active' : ''}`}
                    onClick={() => setColorPickerOpen(!colorPickerOpen)}
                >
                    <span className="toolbar-icon">🎨</span>
                    <span>Color Fondo</span>
                </button>
                <button
                    className="toolbar-btn"
                    onClick={() => {
                        setEditModal({ section: 'settings', field: 'whatsappNumber', type: 'text' })
                        setEditValue(content.settings.whatsappNumber || '')
                    }}
                >
                    <span className="toolbar-icon">📱</span>
                    <span>WhatsApp</span>
                </button>
                <button
                    className="toolbar-btn"
                    onClick={() => {
                        setEditModal({ section: 'settings', field: 'siteName', type: 'text' })
                        setEditValue(content.settings.siteName || '')
                    }}
                >
                    <span className="toolbar-icon">✏️</span>
                    <span>Nombre</span>
                </button>
            </div>

            {/* Color Picker Modal */}
            {colorPickerOpen && (
                <>
                    <div className="modal-overlay" onClick={() => setColorPickerOpen(false)}></div>
                    <div className="color-picker-modal">
                        <h3>Selecciona el color de fondo</h3>
                        <div className="color-options">
                            {backgroundColors.map((color) => (
                                <button
                                    key={color}
                                    className={`color-option ${content.settings.backgroundColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                    aria-label={`Color ${color}`}
                                />
                            ))}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Color personalizado</label>
                            <input
                                type="color"
                                className="form-input"
                                value={content.settings.backgroundColor}
                                onChange={(e) => handleColorChange(e.target.value)}
                                style={{ height: '40px', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Text Edit Modal */}
            {editModal && editModal.type === 'text' && (
                <>
                    <div className="modal-overlay" onClick={() => setEditModal(null)}>
                        <div className="color-picker-modal" onClick={(e) => e.stopPropagation()} style={{ minWidth: '400px' }}>
                            <h3>Editar texto</h3>
                            <div className="form-group">
                                <textarea
                                    className="form-textarea"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    style={{ minHeight: '120px' }}
                                    autoFocus
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-primary" onClick={handleSaveEdit}>
                                    Guardar
                                </button>
                                <button className="btn btn-secondary" onClick={() => setEditModal(null)}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Hidden file inputs */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileUpload}
            />
            <input
                type="file"
                ref={pdfInputRef}
                style={{ display: 'none' }}
                accept=".pdf"
                onChange={handleFileUpload}
            />

            {/* Save Notification */}
            {showSaveNotification && (
                <div className="save-notification">
                    ✓ Cambios guardados correctamente
                </div>
            )}
        </div>
    )
}

export default AdminPanel
