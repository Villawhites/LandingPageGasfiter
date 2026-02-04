import fs from 'fs'
import path from 'path'

// Get site URL from environment or use default
const SITE_URL = process.env.VITE_SITE_URL || 'https://gasfiter-concepcion.onrender.com'
const currentDate = new Date().toISOString().split('T')[0]

console.log(`📝 Generating SEO files for: ${SITE_URL}`)

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin pages
Disallow: /login
Disallow: /admin
`

// Generate sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#quien-soy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#servicios</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#certificaciones</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#curriculum</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#casos</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}/#contacto</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`

// Write files to public directory
const publicDir = path.resolve(process.cwd(), 'public')

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt)
console.log('✅ robots.txt generated')

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml)
console.log('✅ sitemap.xml generated')

console.log('🎉 SEO files generated successfully!')
