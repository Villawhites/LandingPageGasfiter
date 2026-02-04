import { useContent } from '../context/ContentContext'

function QuienSoy({ isAdmin = false, onEdit, onImageEdit }) {
    const { content } = useContent()
    const { about } = content

    // Default placeholder image
    const defaultImage = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1e293b"/>
      <text x="50%" y="45%" text-anchor="middle" fill="#64748b" font-size="48">👷</text>
      <text x="50%" y="60%" text-anchor="middle" fill="#64748b" font-size="14">Foto del profesional</text>
    </svg>
  `)

    return (
        <section id="quien-soy" className="section about">
            <div className="container">
                <div className="about-content">
                    <div className="about-image">
                        {isAdmin ? (
                            <div
                                className="editable"
                                onClick={() => onImageEdit?.('about', 'image')}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={about.image || defaultImage}
                                    alt="Gasfiter Profesional"
                                />
                            </div>
                        ) : (
                            <img
                                src={about.image || defaultImage}
                                alt="Gasfiter Profesional"
                            />
                        )}
                    </div>

                    <div className="about-text">
                        <h2>
                            {isAdmin ? (
                                <span className="editable" onClick={() => onEdit?.('about', 'title')}>
                                    {about.title}
                                </span>
                            ) : about.title}
                        </h2>
                        <h4 className="text-primary mb-3">
                            {isAdmin ? (
                                <span className="editable" onClick={() => onEdit?.('about', 'subtitle')}>
                                    {about.subtitle}
                                </span>
                            ) : about.subtitle}
                        </h4>
                        <p>
                            {isAdmin ? (
                                <span className="editable" onClick={() => onEdit?.('about', 'description')}>
                                    {about.description}
                                </span>
                            ) : about.description}
                        </p>
                        <p>
                            {isAdmin ? (
                                <span className="editable" onClick={() => onEdit?.('about', 'description2')}>
                                    {about.description2}
                                </span>
                            ) : about.description2}
                        </p>

                        <div className="about-features">
                            {about.features.map((feature, index) => (
                                <div key={index} className="about-feature">
                                    <svg className="about-feature-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                    {isAdmin ? (
                                        <span className="editable" onClick={() => onEdit?.('about', `features.${index}`)}>
                                            {feature}
                                        </span>
                                    ) : (
                                        <span>{feature}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default QuienSoy
