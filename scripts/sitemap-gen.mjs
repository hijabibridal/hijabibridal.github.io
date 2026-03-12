import fs from 'fs';
import path from 'path';
import productData from '../src/data/bridal-products.json' with { type: 'json' };
import blogData from '../src/data/blog-articles.json' with { type: 'json' };

const BASE_URL = 'https://hijabibridal.github.io';
const today = new Date().toISOString().split('T')[0];

/**
 * Escapes special characters for XML compliance to prevent "xmlParseEntityRef" errors.
 */
const escapeXml = (unsafe) => {
    if (!unsafe) return "";
    return unsafe.replace(/[<>&"']/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
        }
    });
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${BASE_URL}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${BASE_URL}/shop</loc><lastmod>${today}</lastmod></url>
  <url><loc>${BASE_URL}/blog</loc><lastmod>${today}</lastmod></url>
  
  ${productData.products.map(p => `
  <url>
    <loc>${BASE_URL}/shop/product/${p.slug}</loc>
    <lastmod>${today}</lastmod>
    ${p.images.map(img => `
    <image:image>
      <image:loc>${BASE_URL}/images/${img.url.replace(/^\//, '')}</image:loc>
      <image:title>${escapeXml(p.name)}</image:title>
      <image:caption>${escapeXml(img.alt || p.name)}</image:caption>
    </image:image>`).join('')}
  </url>`).join('')}
  
  ${productData.mainCategories.map(c => `
  <url>
    <loc>${BASE_URL}/shop/category/${c.slug}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('')}
  
  ${blogData.articles.map(a => `
  <url>
    <loc>${BASE_URL}/blog/${a.slug}</loc>
    <lastmod>${today}</lastmod>
    ${a.featuredImageUrl ? `
    <image:image>
      <image:loc>${BASE_URL}${a.featuredImageUrl}</image:loc>
      <image:title>${escapeXml(a.pageTitle)}</image:title>
    </image:image>` : ''}
  </url>`).join('')}
</urlset>`.trim();

// Ensure we target the root public folder
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log(`✅ Success! Sitemap with ALL images generated at: ${path.join(publicDir, 'sitemap.xml')}`);