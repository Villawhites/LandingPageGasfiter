import { useContent } from '../context/ContentContext'

function CasosExito({ isAdmin = false, onEdit, onImageEdit }) {
    const { content } = useContent()
    const { cases } = content

    // Default placeholder for cases
    const defaultCaseImage = (title) => 'data:image/svg+xml,' + encodeURIComponent(`
    <svg width="400" height="225" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1e293b"/>
      <text x="50%" y="45%" text-anchor="middle" fill="#64748b" font-size="36">🏠</text>
      <text x="50%" y="65%" text-anchor="middle" fill="#64748b" font-size="12">${title || 'Proyecto'}</text>
    </svg>
  `)

    return (
        <section id="casos" className="section cases">
            <div className="container">
                <div className="section-title">
                    <h2>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('cases', 'title')}>
                                {cases.title}
                            </span>
                        ) : cases.title}
                    </h2>
                    <p>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('cases', 'subtitle')}>
                                {cases.subtitle}
                            </span>
                        ) : cases.subtitle}
                    </p>
                </div>

                <div className="cases-grid">
                    {cases.items.map((caseItem) => (
                        <div key={caseItem.id} className="case-card">
                            <div className="case-image">
                                {isAdmin ? (
                                    <div
                                        className="editable"
                                        onClick={() => onImageEdit?.('cases', `item.${caseItem.id}.image`)}
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        <img
                                            src={caseItem.image || defaultCaseImage(caseItem.title)}
                                            alt={caseItem.title}
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={caseItem.image || defaultCaseImage(caseItem.title)}
                                        alt={caseItem.title}
                                    />
                                )}
                            </div>
                            <div className="case-info">
                                <h4>
                                    {isAdmin ? (
                                        <span className="editable" onClick={() => onEdit?.('cases', `item.${caseItem.id}.title`)}>
                                            {caseItem.title}
                                        </span>
                                    ) : caseItem.title}
                                </h4>
                                <p>
                                    {isAdmin ? (
                                        <span className="editable" onClick={() => onEdit?.('cases', `item.${caseItem.id}.description`)}>
                                            {caseItem.description}
                                        </span>
                                    ) : caseItem.description}
                                </p>
                                <div className="case-tags">
                                    {caseItem.tags?.map((tag, index) => (
                                        <span key={index} className="case-tag">
                                            {isAdmin ? (
                                                <span className="editable" onClick={() => onEdit?.('cases', `item.${caseItem.id}.tags.${index}`)}>
                                                    {tag}
                                                </span>
                                            ) : tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CasosExito
