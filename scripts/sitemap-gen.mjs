import fs from 'fs';
// Change 'assert' to 'with' here:
import productData from '../src/data/bridal-products.json' with { type: 'json' };
import blogData from '../src/data/blog-articles.json' with { type: 'json' };

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

// Change the last line to:
fs.writeFileSync('./public/sitemap_index.xml', sitemap);
console.log('✅ Sitemap updated in /public as sitemap_index.xml');