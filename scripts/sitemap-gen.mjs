import fs from 'fs';
import productData from '../src/data/bridal-products.json' assert { type: 'json' };
import blogData from '../src/data/blog-articles.json' assert { type: 'json' };

const BASE_URL = 'https://hijabibridal.github.io';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc></url>
  <url><loc>${BASE_URL}/shop</loc></url>
  <url><loc>${BASE_URL}/blog</loc></url>
  ${productData.products.map(p => `  <url><loc>${BASE_URL}/shop/product/${p.slug}</loc></url>`).join('\n')}
  ${productData.mainCategories.map(c => `  <url><loc>${BASE_URL}/shop/category/${c.slug}</loc></url>`).join('\n')}
  ${blogData.articles.map(a => `  <url><loc>${BASE_URL}/blog/${a.slug}</loc></url>`).join('\n')}
</urlset>`;

// Force it into the PUBLIC folder so it's always at the root of the site
fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log('✅ Sitemap updated in /public');