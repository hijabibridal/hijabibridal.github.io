// app/sitemap.xml/route.js
export const dynamic = "force-static";
export const revalidate = false;
import blogData from '@/data/blog-articles.json';
import { promises as fs } from 'fs';
import path from 'path';

const BASE_URL = 'https://petgadgetinsider.org';

// Helper to get file modification dates
async function getLastmod(filePath) {
  try {
    const stats = await fs.stat(path.join(process.cwd(), filePath));
    return stats.mtime.toISOString().split('T')[0]; // YYYY-MM-DD format
  } catch {
    return new Date().toISOString().split('T')[0]; // Fallback to today
  }
}

export async function GET() {
  try {
    // 1. Static pages with auto-detected dates
    const staticPages = [
      {
        url: '/',
        lastmod: await getLastmod('app/page.tsx'),
        priority: 1.0,
        changefreq: 'daily'
      },
      {
        url: '/blog',  // NEW: Added blog index page
        lastmod: await getLastmod('app/blog/page.tsx'),
        priority: 0.85,
        changefreq: 'daily'
      },
      {
        url: '/about',
        lastmod: await getLastmod('app/about/page.tsx'),
        priority: 0.9,
        changefreq: 'monthly'
      },
      {
        url: '/faq',
        lastmod: await getLastmod('app/faq/page.tsx'),
        priority: 0.85,
        changefreq: 'monthly'
      }
    ];

    // 2. Process all main categories (using current date as fallback)
    const categoryPages = blogData.mainCategories.map(category => ({
      url: `/blog/category/${category.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.8,
      changefreq: 'weekly'
    }));

    // 3. Process all subcategories
    const subcategoryPages = blogData.subCategories.map(subcategory => ({
      url: `/blog/category/${subcategory.mainCategorySlug}/${subcategory.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
      priority: 0.75,
      changefreq: 'weekly'
    }));

    // 4. Process all articles with actual content dates
    const articlePages = blogData.articles.map(article => ({
      url: `/blog/${article.slug}`,
      lastmod: article.dateModified || article.datePublished || new Date().toISOString().split('T')[0],
      priority: 0.7,
      changefreq: 'weekly'
    }));

    // 5. Combine all URLs
    const allPages = [
      ...staticPages,
      ...categoryPages,
      ...subcategoryPages,
      ...articlePages
    ];

    // 6. Generate XML
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
        // Change this line to prevent the CDN and browser from holding the old date:
        'Cache-Control': 'public, s-maxage=0, stale-while-revalidate=60',
      },
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response(`<error>Sitemap generation failed</error>`, {
      status: 500,
      headers: { 'Content-Type': 'text/xml' }
    });
  }
}