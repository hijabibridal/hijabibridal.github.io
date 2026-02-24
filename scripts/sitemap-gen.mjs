import fs from 'fs';
import productData from '../src/data/bridal-products.json' with { type: 'json' };
import blogData from '../src/data/blog-articles.json' with { type: 'json' };

const BASE_URL = 'https://hijabibridal.github.io';
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${BASE_URL}/shop</loc><lastmod>${today}</lastmod></url>
  <url><loc>${BASE_URL}/blog</loc><lastmod>${today}</lastmod></url>
  
  ${productData.products.map(p => `  <url><loc>${BASE_URL}/shop/product/${p.slug}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
  
  ${productData.mainCategories.map(c => `  <url><loc>${BASE_URL}/shop/category/${c.slug}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
  
  ${blogData.mainCategories.map(bc => `  <url><loc>${BASE_URL}/blog/category/${bc.slug}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
  
  ${blogData.articles.map(a => `  <url><loc>${BASE_URL}/blog/${a.slug}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap_index.xml', sitemap);
console.log('✅ Sitemap fully synchronized and XML-compliant.');