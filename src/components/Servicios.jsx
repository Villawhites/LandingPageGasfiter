import { useContent } from '../context/ContentContext'

function Servicios({ isAdmin = false, onEdit }) {
    const { content } = useContent()
    const { services } = content

    return (
        <section id="servicios" className="section">
            <div className="container">
                <div className="section-title">
                    <h2>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('services', 'title')}>
                                {services.title}
                            </span>
                        ) : services.title}
                    </h2>
                    <p>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('services', 'subtitle')}>
                                {services.subtitle}
                            </span>
                        ) : services.subtitle}
                    </p>
                </div>

                <div className="services-grid">
                    {services.items.map((service) => (
                        <div key={service.id} className="card service-card">
                            <div className="service-icon">
                                {isAdmin ? (
                                    <span className="editable" onClick={() => onEdit?.('services', `item.${service.id}.icon`)}>
                                        {service.icon}
                                    </span>
                                ) : service.icon}
                            </div>
                            <h3>
                                {isAdmin ? (
                                    <span className="editable" onClick={() => onEdit?.('services', `item.${service.id}.title`)}>
                                        {service.title}
                                    </span>
                                ) : service.title}
                            </h3>
                            <p>
                                {isAdmin ? (
                                    <span className="editable" onClick={() => onEdit?.('services', `item.${service.id}.description`)}>
                                        {service.description}
                                    </span>
                                ) : service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Servicios
