import { useState, useEffect } from 'react'
import { useContent } from '../context/ContentContext'

function Header({ isAdmin = false }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { content } = useContent()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleNavClick = (e, targetId) => {
        e.preventDefault()
        setIsMenuOpen(false)
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const navItems = [
        { id: 'inicio', label: 'Inicio' },
        { id: 'quien-soy', label: 'Quién Soy' },
        { id: 'servicios', label: 'Servicios' },
        { id: 'certificaciones', label: 'Certificaciones' },
        { id: 'curriculum', label: 'Currículum' },
        { id: 'casos', label: 'Casos de Éxito' },
        { id: 'contacto', label: 'Contacto' },
    ]

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-content">
                <a href="#inicio" className="header-logo" onClick={(e) => handleNavClick(e, 'inicio')}>
                    <span>🔧 {content.settings.siteName}</span>
                </a>

                <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => handleNavClick(e, item.id)}
                        >
                            {item.label}
                        </a>
                    ))}
                    {!isAdmin && (
                        <a
                            href={`https://wa.me/${content.settings.whatsappNumber?.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary header-cta"
                        >
                            📞 Contactar
                        </a>
                    )}
                </nav>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    )
}

export default Header
