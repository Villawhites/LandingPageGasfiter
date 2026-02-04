# Landing Page Gasfiter

Sistema web para gasfitero profesional en Concepción, con landing page y panel de administración.

## 🚀 Tecnologías

- React 18
- Vite
- React Router DOM
- CSS puro (sin frameworks)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview producción
npm run preview
```

## 🔐 Acceso Admin

- URL: `/login`
- Usuario: `admin`
- Contraseña: `admin1234`

## 📱 Características

### Landing Page
- Header con navegación suave
- Sección Hero con estadísticas
- Quién Soy
- Servicios
- Certificaciones (galería con modal)
- Currículum (visor PDF)
- Casos de Éxito
- Contacto (formulario WhatsApp)
- Footer
- Botón flotante de WhatsApp
- Diseño responsive
- SEO optimizado

### Panel Admin
- Login simple
- Edición de textos (clic en elementos)
- Carga de imágenes
- Carga de PDF (currículum)
- Cambio de color de fondo
- Persistencia en JSONBin.io (todos ven los cambios)

## ⚙️ Configuración JSONBin.io

Los datos se guardan en JSONBin.io para que todos los visitantes vean los cambios.

1. Crea cuenta en [jsonbin.io](https://jsonbin.io)
2. Obtén tu Master Key y Access Key
3. Crea las variables de entorno:
```env
VITE_JSONBIN_MASTER_KEY=tu_master_key
VITE_JSONBIN_ACCESS_KEY=tu_access_key
VITE_JSONBIN_BIN_ID=tu_bin_id
```

## 🌐 Deploy en Render

1. Sube el código a GitHub
2. Crea un nuevo Static Site en Render
3. Conecta el repositorio
4. Configura:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
5. Agrega regla de rewrite: `/* -> /index.html`

## 🔍 SEO Keywords

- Gasfiter Concepción
- Gasfiter Conce
- Gasfiter certificado SEC
- Instalador de gas Concepción
- Reparación gas Concepción