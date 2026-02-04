import { useContent } from '../context/ContentContext'

function Curriculum({ isAdmin = false, onEdit, onPdfEdit }) {
    const { content } = useContent()
    const { curriculum } = content

    const handleDownload = () => {
        if (curriculum.pdfUrl) {
            const link = document.createElement('a')
            link.href = curriculum.pdfUrl
            link.download = curriculum.pdfName || 'curriculum.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleOpenNew = () => {
        if (curriculum.pdfUrl) {
            // Create a new window with the PDF
            const newWindow = window.open()
            newWindow.document.write(`
        <html>
          <head><title>${curriculum.pdfName || 'Currículum'}</title></head>
          <body style="margin:0;padding:0;">
            <iframe src="${curriculum.pdfUrl}" style="width:100%;height:100vh;border:none;"></iframe>
          </body>
        </html>
      `)
        }
    }

    return (
        <section id="curriculum" className="section">
            <div className="container">
                <div className="section-title">
                    <h2>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('curriculum', 'title')}>
                                {curriculum.title}
                            </span>
                        ) : curriculum.title}
                    </h2>
                    <p>
                        {isAdmin ? (
                            <span className="editable" onClick={() => onEdit?.('curriculum', 'subtitle')}>
                                {curriculum.subtitle}
                            </span>
                        ) : curriculum.subtitle}
                    </p>
                </div>

                <div className="curriculum-content">
                    <div className="curriculum-viewer">
                        {curriculum.pdfUrl ? (
                            <div className="pdf-container">
                                <iframe
                                    src={curriculum.pdfUrl}
                                    title="Currículum"
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                />
                            </div>
                        ) : (
                            <div
                                className={`curriculum-placeholder ${isAdmin ? 'editable' : ''}`}
                                onClick={() => isAdmin && onPdfEdit?.()}
                            >
                                <div className="curriculum-placeholder-icon">📄</div>
                                <h3>Currículum Vitae</h3>
                                <p>
                                    {isAdmin
                                        ? 'Haz clic aquí para subir tu currículum en PDF'
                                        : 'Próximamente disponible para descargar'}
                                </p>
                            </div>
                        )}
                    </div>

                    {curriculum.pdfUrl && (
                        <div className="curriculum-actions">
                            <button className="btn btn-primary" onClick={handleDownload}>
                                📥 Descargar PDF
                            </button>
                            <button className="btn btn-secondary" onClick={handleOpenNew}>
                                🔗 Abrir en nueva pestaña
                            </button>
                            {isAdmin && (
                                <button className="btn btn-secondary" onClick={() => onPdfEdit?.()}>
                                    📝 Cambiar PDF
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Curriculum
