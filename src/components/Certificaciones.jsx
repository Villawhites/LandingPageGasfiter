import { useState } from 'react'
import { useContent } from '../context/ContentContext'

function Certificaciones({ isAdmin = false, onEdit, onImageEdit }) {
    const { content } = useContent()
    const { certifications } = content
    const [selectedImage, setSelectedImage] = useState(null)

    // Default placeholder for certifications
    const defaultCertImage = (title) => 'data:image/svg+xml,' + encodeURIComponent(`
    <svg width="300" height="225" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f1f5f9"/>
      <text x="50%" y="45%" text-anchor="middle" fill="#64748b" font-size="36">📜</text>
      <text x="50%" y="65%" text-anchor="middle" fill="#64748b" font-size="12">${title || 'Certificado'}</text>
    </svg>
  `)

    return (
        <section id="certificaciones" className="section certifications">
            <div className="container">
                <div className="section-title">
                    <h2>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('certifications', 'title')}>
                                {certifications.title}
                            </span>
                        ) : certifications.title}
                    </h2>
                    <p>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('certifications', 'subtitle')}>
                                {certifications.subtitle}
                            </span>
                        ) : certifications.subtitle}
                    </p>
                </div>

                <div className="certifications-grid">
                    {certifications.items.map((cert) => (
                        <div
                            key={cert.id}
                            className="certification-card"
                            onClick={() => !isAdmin && cert.image && setSelectedImage(cert.image)}
                        >
                            <div className="certification-image">
                                {isAdmin ? (
                                    <div
                                        className="editable"
                                        onClick={() => onImageEdit?.('certifications', `item.${cert.id}.image`)}
                                        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <img
                                            src={cert.image || defaultCertImage(cert.title)}
                                            alt={cert.title}
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={cert.image || defaultCertImage(cert.title)}
                                        alt={cert.title}
                                    />
                                )}
                            </div>
                            <div className="certification-info">
                                <h4>
                                    {isAdmin ? (
                                        <span className="editable" onClick={(e) => { e.stopPropagation(); onEdit?.('certifications', `item.${cert.id}.title`); }}>
                                            {cert.title}
                                        </span>
                                    ) : cert.title}
                                </h4>
                                <p>
                                    {isAdmin ? (
                                        <span className="editable" onClick={(e) => { e.stopPropagation(); onEdit?.('certifications', `item.${cert.id}.description`); }}>
                                            {cert.description}
                                        </span>
                                    ) : cert.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for viewing full image */}
            {selectedImage && (
                <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={() => setSelectedImage(null)}
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>
                        <img src={selectedImage} alt="Certificación" />
                    </div>
                </div>
            )}
        </section>
    )
}

export default Certificaciones
