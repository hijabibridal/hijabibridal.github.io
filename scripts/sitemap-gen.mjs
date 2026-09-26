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
    return String(unsafe).replace(/[<>&"']/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
        }
    });
};

// Guards so one incomplete product or article can't crash the whole script.
const products   = Array.isArray(productData.products) ? productData.products : [];
const categories = Array.isArray(productData.mainCategories) ? productData.mainCategories : [];
const articles   = Array.isArray(blogData.articles) ? blogData.articles : [];

const productUrls = products
  .filter(p => p && p.slug)
  .map(p => {
    const images = (Array.isArray(p.images) ? p.images : [])
      .filter(img => img && img.url)
      .map(img => `
    <image:image>
      <image:loc>${BASE_URL}/images/${escapeXml(String(img.url).replace(/^\//, ''))}</image:loc>
      <image:title>${escapeXml(p.name)}</image:title>
      <image:caption>${escapeXml(img.alt || p.name)}</image:caption>
    </image:image>`).join('');
    return `
  <url>
    <loc>${BASE_URL}/shop/product/${escapeXml(p.slug)}</loc>
    <lastmod>${today}</lastmod>${images}
  </url>`;
  }).join('');

const categoryUrls = categories
  .filter(c => c && c.slug)
  .map(c => `
  <url>
    <loc>${BASE_URL}/shop/category/${escapeXml(c.slug)}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('');

const articleUrls = articles
  .filter(a => a && a.slug)
  .map(a => `
  <url>
    <loc>${BASE_URL}/blog/${escapeXml(a.slug)}</loc>
    <lastmod>${a.dateModified || a.datePublished || today}</lastmod>${a.featuredImageUrl ? `
    <image:image>
      <image:loc>${BASE_URL}${escapeXml(a.featuredImageUrl)}</image:loc>
      <image:title>${escapeXml(a.pageTitle)}</image:title>
    </image:image>` : ''}
  </url>`).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${BASE_URL}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${BASE_URL}/shop</loc><lastmod>${today}</lastmod></url>
  <url><loc>${BASE_URL}/blog</loc><lastmod>${today}</lastmod></url>${productUrls}${categoryUrls}${articleUrls}
</urlset>`.trim();

// Ensure we target the root public folder
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log(`✅ Success! Sitemap generated at: ${path.join(publicDir, 'sitemap.xml')}`);
console.log(`   ${products.length} products, ${categories.length} categories, ${articles.length} articles`);
