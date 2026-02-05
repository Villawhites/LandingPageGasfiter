// Default content for the landing page
export const defaultContent = {
    // Site-wide settings
    settings: {
        primaryColor: '#2563eb',
        backgroundColor: '#0f172a',
        siteName: 'Gasfiter Profesional',
        whatsappNumber: '+56912345678',
    },

    // Hero Section
    hero: {
        badge: 'Certificado SEC Clase 3',
        title: 'Gasfiter Certificado SEC',
        titleHighlight: 'Alejandro Saldias Jara',
        subtitle: 'en Concepción - Urgencias 24/7',
        description: '¿Sin agua caliente o con fuga de gas? Recupere su tranquilidad hoy mismo. Llego en menos de 45 minutos a todo el Gran Concepción. Garantía por escrito.',
        stats: [
            { number: '15+', label: 'Años de Experiencia' },
            { number: '500+', label: 'Proyectos Aprobados' },
            { number: '24/7', label: 'Atención Emergencias' },
        ]
    },

    // About Section (Quién Soy)
    about: {
        title: 'Sobre Mí',
        subtitle: 'Alejandro Saldias Jara - Instalador Autorizado SEC',
        description: 'Más que un gasfiter, soy un profesional certificado SEC Clase 3 con más de 15 años de trayectoria en el Biobío. Me especializo en resolver lo que otros no pueden: regularización de Sello Rojo, fugas complejas y mantención de equipos de alta gama (Junkers, Splendid, Anwo).',
        description2: 'Mi compromiso es simple: trabajo bien hecho a la primera, cumplimiento estricto de la normativa DS N°66 y respeto absoluto por su tiempo y propiedad.',
        image: null, // Will be base64 when uploaded
        features: [
            'Licencia SEC Clase 3 Vigente',
            'Especialista en Sello Verde',
            'Atención en Concepción, San Pedro, Talcahuano',
            'Factura y Garantía Legal',
            'Herramientas de Detección Digital',
            'Vehículo Propio y Repuestos a Bordo',
        ]
    },

    // Services Section
    services: {
        title: 'Servicios Profesionales',
        subtitle: 'Soluciones definitivas para su hogar o empresa',
        items: [
            {
                id: 1,
                icon: '🔥',
                title: 'Reparación de Calefont',
                description: '¿El calefont no enciende o se apaga? Reparamos Junkers, Splendid y todas las marcas en el acto. Recupera tu agua caliente hoy.',
            },
            {
                id: 2,
                icon: '🚨',
                title: 'Urgencias de Gas 24/7',
                description: 'Detección y reparación inmediata de fugas de gas. Llegamos rápido a cualquier punto del Gran Concepción para asegurar tu hogar.',
            },
            {
                id: 3,
                icon: '✅',
                title: 'Certificación Sello Verde',
                description: 'Regularizamos instalaciones con Sello Rojo o Amarillo. Tramitación completa TC6 ante la SEC para edificios y casas.',
            },
            {
                id: 4,
                icon: '🛠️',
                title: 'Instalaciones Nuevas',
                description: 'Proyectos de redes de gas natural y licuado bajo norma. Conversiones de cocina y estufas con certificación.',
            },
            {
                id: 5,
                icon: '🏢',
                title: 'Mantención Edificios',
                description: 'Planes preventivos para comunidades y administradores. Evite cortes de suministro y multas de la SEC.',
            },
            {
                id: 6,
                icon: '💧',
                title: 'Destapes y Filtraciones',
                description: 'Gasfitería sanitaria integral. Solución a baja presión de agua, filtraciones ocultas y desagües tapados.',
            },
        ]
    },

    // Certifications Section
    certifications: {
        title: 'Acreditaciones Oficiales',
        subtitle: 'Su seguridad no es juego: Exija siempre credencial SEC',
        items: [
            {
                id: 1,
                title: 'Licencia SEC Clase 3',
                description: 'Autorizado por el Gobierno de Chile para instalaciones de gas.',
                image: null,
            },
            {
                id: 2,
                title: 'Certificación Junkers/Bosch',
                description: 'Técnico especialista en tecnologías de condensación y tiro forzado.',
                image: null,
            },
            {
                id: 3,
                title: 'Curso Normativa DS-66',
                description: 'Actualización constante en reglamentos de seguridad vigentes.',
                image: null,
            },
        ]
    },

    // Curriculum Section
    curriculum: {
        title: 'Hoja de Vida Profesional',
        subtitle: 'Transparencia total: Revise mis credenciales y antecedentes',
        pdfUrl: null, // Will be base64 when uploaded
        pdfName: null,
    },

    // Success Cases Section
    cases: {
        title: 'Proyectos Realizados',
        subtitle: 'Vecinos de Concepción que ya confían en mi trabajo',
        items: [
            {
                id: 1,
                title: 'Edificio Centro Concepción',
                description: 'Regularización de Sello Rojo a Verde en comunidad de 40 departamentos. Trabajo terminado en 2 semanas.',
                image: null,
                tags: ['Sello Verde', 'Edificios', 'Concepción Centro'],
            },
            {
                id: 2,
                title: 'Instalación Caldera San Pedro',
                description: 'Cambio de caldera antigua por sistema de condensación eficiente en Lomas de San Andrés.',
                image: null,
                tags: ['Calefacción', 'Eficiencia', 'San Pedro'],
            },
            {
                id: 3,
                title: 'Emergencia Fuga Talcahuano',
                description: 'Detección y reparación de fuga subterránea sin romper todo el piso. Cliente recuperó suministro en 4 horas.',
                image: null,
                tags: ['Urgencia', 'Fuga de Gas', 'Talcahuano'],
            },
        ]
    },

    // Contact Section
    contact: {
        title: 'Contacto Inmediato',
        subtitle: 'No espere más. Hablemos ahora por WhatsApp',
        description: 'Presupuestos transparentes y sin letra chica. Si tiene una urgencia, llame directamente al botón inferior.',
        phone: '+56 9 1234 5678',
        email: 'contacto@gasfiterconcepcion.cl',
        address: 'Atención en todo el Gran Concepción',
        schedule: 'Lunes a Domingo: 24 Horas (Urgencias)',
    },

    // Footer
    footer: {
        description: 'Alejandro Saldias Jara - Gasfiter Certificado SEC Clase 3. Servicios profesionales en Concepción, Talcahuano, San Pedro, Chiguayante y Hualpén.',
        copyright: '© 2024 Gasfiter Alejandro Saldias Jara. Todos los derechos reservados.',
    }
}
