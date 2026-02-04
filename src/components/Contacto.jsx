import { useState } from 'react'
import { useContent } from '../context/ContentContext'

function Contacto({ isAdmin = false, onEdit }) {
    const { content } = useContent()
    const { contact, settings } = content
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [formStatus, setFormStatus] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Create WhatsApp message with form data
        const phone = settings.whatsappNumber?.replace(/\D/g, '')
        const message = encodeURIComponent(
            `Hola, me contacto desde la web.\n\n` +
            `*Nombre:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Teléfono:* ${formData.phone}\n` +
            `*Mensaje:* ${formData.message}`
        )

        window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
        setFormStatus('success')

        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setFormStatus(null), 3000)
    }

    return (
        <section id="contacto" className="section">
            <div className="container">
                <div className="contact-content">
                    <div className="contact-info">
                        <h2>
                            {isAdmin ? (
                                <span className="editable" onClick={() => onEdit?.('contact', 'title')}>
                                    {contact.title}
                                </span>
                            ) : contact.title}
                        </h2>
                        <p>
                            {isAdmin ? (
                                <span className="editable" onClick={() => onEdit?.('contact', 'description')}>
                                    {contact.description}
                                </span>
                            ) : contact.description}
                        </p>

                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="contact-method-icon">📞</div>
                                <div className="contact-method-text">
                                    <h4>Teléfono</h4>
                                    <p>
                                        {isAdmin ? (
                                            <span className="editable" onClick={() => onEdit?.('contact', 'phone')}>
                                                {contact.phone}
                                            </span>
                                        ) : (
                                            <a href={`tel:${contact.phone?.replace(/\s/g, '')}`}>{contact.phone}</a>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-method-icon">✉️</div>
                                <div className="contact-method-text">
                                    <h4>Email</h4>
                                    <p>
                                        {isAdmin ? (
                                            <span className="editable" onClick={() => onEdit?.('contact', 'email')}>
                                                {contact.email}
                                            </span>
                                        ) : (
                                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-method-icon">📍</div>
                                <div className="contact-method-text">
                                    <h4>Ubicación</h4>
                                    <p>
                                        {isAdmin ? (
                                            <span className="editable" onClick={() => onEdit?.('contact', 'address')}>
                                                {contact.address}
                                            </span>
                                        ) : contact.address}
                                    </p>
                                </div>
                            </div>

                            <div className="contact-method">
                                <div className="contact-method-icon">🕐</div>
                                <div className="contact-method-text">
                                    <h4>Horario</h4>
                                    <p>
                                        {isAdmin ? (
                                            <span className="editable" onClick={() => onEdit?.('contact', 'schedule')}>
                                                {contact.schedule}
                                            </span>
                                        ) : contact.schedule}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper glass-card">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <h3>Envíame un mensaje</h3>

                            {formStatus === 'success' && (
                                <div className="badge text-success mb-3">
                                    ✓ Mensaje enviado correctamente
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label" htmlFor="name">Nombre completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    placeholder="Tu nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="phone">Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    placeholder="+56 9 1234 5678"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="message">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    placeholder="Describe tu consulta o proyecto..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Enviar por WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacto
