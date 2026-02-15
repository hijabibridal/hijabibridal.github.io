// app/sitemap.xml/route.js
export const dynamic = "force-static";
export const revalidate = false;
import blogData from '@/data/blog-articles.json';
import productData from '@/data/bridal-products.json'; // Added product data
import { promises as fs } from 'fs';
import path from 'path';

const BASE_URL = 'https://hijabibridal.github.io'; // Updated for your site

async function getLastmod(filePath) {
  try {
    const stats = await fs.stat(path.join(process.cwd(), filePath));
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

export async function GET() {
  try {
    // 1. Static pages
    const staticPages = [
      { url: '/', lastmod: await getLastmod('app/page.tsx'), priority: 1.0, changefreq: 'daily' },
      { url: '/blog', lastmod: await getLastmod('app/blog/page.tsx'), priority: 0.8, changefreq: 'daily' },
      { url: '/shop', lastmod: new Date().toISOString().split('T')[0], priority: 0.9, changefreq: 'daily' },
    ];

    // 2. Blog Articles
    const articlePages = blogData.articles.map(article => ({
      url: `/blog/${article.slug}`,
      lastmod: article.dateModified || new Date().toISOString().split('T')[0],
      priority: 0.7,
      changefreq: 'weekly'
    }));

    // 3. Shop Categories (From bridal-products.json)
    const categoryPages = productData.mainCategories.map(cat => ({
      url: `/shop/category/${cat.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.8,
      changefreq: 'weekly'
    }));

    // 4. Individual Products (From bridal-products.json)
    const productPages = productData.products.map(product => ({
      url: `/shop/product/${product.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.6,
      changefreq: 'monthly'
    }));

    const allPages = [...staticPages, ...articlePages, ...categoryPages, ...productPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages.map(page => `
          <url>
            <loc>${BASE_URL}${page.url}</loc>
            <lastmod>${page.lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
          </url>
        `).join('')}
      </urlset>
    `;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
      },
    });
  } catch (error) {
    return new Response(`Error generating sitemap: ${error.message}`, { status: 500 });
  }
}