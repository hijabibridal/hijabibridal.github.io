export const dynamic = 'force-static';

import { NextResponse } from 'next/server';
import productData from '@/data/bridal-products.json';

export async function GET() {
  const baseUrl = 'https://hijabibridal.github.io';

  // 1. Static Pages
  const staticPages = ['', '/shop', '/blog', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // 2. Product Pages
  const productPages = productData.products.map((product) => ({
    url: `${baseUrl}/shop/product/${product.slug}`,
    lastModified: new Date().toISOString(),
  }));

  // 3. Category Pages (Colors & Items)
  const categoryPages = productData.mainCategories.map((category) => ({
    url: `${baseUrl}/shop/category/${category.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const allPages = [...staticPages, ...productPages, ...categoryPages];

  // The XML generation
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      return `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.url.endsWith('/shop') ? '0.8' : '0.6'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}