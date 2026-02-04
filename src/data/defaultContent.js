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
        badge: 'Certificado SEC',
        title: 'Servicios de Gasfitería',
        titleHighlight: 'Profesional',
        subtitle: 'en Concepción',
        description: 'Instalación, reparación y mantención de gas con certificación SEC. Más de 15 años de experiencia brindando soluciones seguras y confiables.',
        stats: [
            { number: '15+', label: 'Años de Experiencia' },
            { number: '500+', label: 'Trabajos Realizados' },
            { number: '100%', label: 'Clientes Satisfechos' },
        ]
    },

    // About Section (Quién Soy)
    about: {
        title: '¿Quién Soy?',
        subtitle: 'Tu gasfiter de confianza en Concepción',
        description: 'Soy un gasfiter certificado por la SEC (Superintendencia de Electricidad y Combustibles) con más de 15 años de experiencia en el rubro. Mi compromiso es brindar un servicio profesional, seguro y de calidad a todos mis clientes.',
        description2: 'Me especializo en instalaciones de gas, reparaciones, mantenciones preventivas y certificaciones. Trabajo con responsabilidad y garantía en cada proyecto.',
        image: null, // Will be base64 when uploaded
        features: [
            'Certificación SEC vigente',
            'Más de 15 años de experiencia',
            'Garantía en todos los trabajos',
            'Atención rápida y profesional',
            'Presupuestos sin compromiso',
            'Servicio a domicilio',
        ]
    },

    // Services Section
    services: {
        title: 'Servicios',
        subtitle: 'Soluciones completas en gasfitería para tu hogar o negocio',
        items: [
            {
                id: 1,
                icon: '🔥',
                title: 'Instalación de Gas',
                description: 'Instalaciones nuevas de redes de gas natural y licuado, cumpliendo todas las normativas de seguridad.',
            },
            {
                id: 2,
                icon: '🔧',
                title: 'Reparaciones',
                description: 'Reparación de fugas, artefactos a gas, calefones, estufas y todo tipo de equipos de gas.',
            },
            {
                id: 3,
                icon: '🛡️',
                title: 'Mantención Preventiva',
                description: 'Revisiones periódicas para asegurar el correcto funcionamiento y seguridad de tus instalaciones.',
            },
            {
                id: 4,
                icon: '📋',
                title: 'Certificación SEC',
                description: 'Certificación oficial de instalaciones de gas para cumplir con los requisitos de la SEC.',
            },
            {
                id: 5,
                icon: '🏠',
                title: 'Proyectos Residenciales',
                description: 'Diseño e implementación de sistemas de gas completos para casas y departamentos.',
            },
            {
                id: 6,
                icon: '🏢',
                title: 'Proyectos Comerciales',
                description: 'Instalaciones para restaurantes, locales comerciales e industrias con altos estándares.',
            },
        ]
    },

    // Certifications Section
    certifications: {
        title: 'Certificaciones',
        subtitle: 'Acreditaciones que garantizan mi profesionalismo y compromiso con la seguridad',
        items: [
            {
                id: 1,
                title: 'Certificado SEC Clase 3',
                description: 'Habilitado para instalaciones de gas',
                image: null,
            },
            {
                id: 2,
                title: 'Curso de Seguridad en Gas',
                description: 'Capacitación continua en normativas',
                image: null,
            },
            {
                id: 3,
                title: 'Licencia Municipal',
                description: 'Patente comercial vigente',
                image: null,
            },
        ]
    },

    // Curriculum Section
    curriculum: {
        title: 'Currículum',
        subtitle: 'Conoce mi trayectoria profesional y experiencia en detalle',
        pdfUrl: null, // Will be base64 when uploaded
        pdfName: null,
    },

    // Success Cases Section
    cases: {
        title: 'Casos de Éxito',
        subtitle: 'Algunos de los proyectos que he realizado con excelentes resultados',
        items: [
            {
                id: 1,
                title: 'Instalación Completa en Edificio',
                description: 'Proyecto de instalación de red de gas para edificio de 20 departamentos en Concepción centro.',
                image: null,
                tags: ['Residencial', 'Gas Natural', 'Certificación'],
            },
            {
                id: 2,
                title: 'Restaurante La Esquina',
                description: 'Instalación de sistema de gas para cocina industrial con todos los estándares de seguridad.',
                image: null,
                tags: ['Comercial', 'Cocina Industrial'],
            },
            {
                id: 3,
                title: 'Remodelación Casa Particular',
                description: 'Actualización completa del sistema de gas, incluyendo calefón y estufa certificada.',
                image: null,
                tags: ['Residencial', 'Remodelación'],
            },
        ]
    },

    // Contact Section
    contact: {
        title: 'Contacto',
        subtitle: 'Estoy disponible para atender tus consultas y proyectos',
        description: '¿Necesitas un gasfiter certificado? Contáctame para una evaluación sin compromiso. Atiendo en Concepción y comunas aledañas.',
        phone: '+56 9 1234 5678',
        email: 'contacto@gasfiterconcepcion.cl',
        address: 'Concepción, Región del Biobío',
        schedule: 'Lunes a Sábado: 08:00 - 20:00',
    },

    // Footer
    footer: {
        description: 'Gasfiter certificado SEC ofreciendo servicios profesionales de instalación, reparación y mantención de gas en Concepción y alrededores.',
        copyright: '© 2024 Gasfiter Profesional. Todos los derechos reservados.',
    }
}
