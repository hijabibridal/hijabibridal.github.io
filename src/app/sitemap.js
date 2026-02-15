// These flags are mandatory for Next.js "output: export" to handle metadata routes
export const dynamic = 'force-static';
export const revalidate = false;

import path from 'path';
import fs from 'fs';

export default function sitemap() {
  const baseUrl = 'https://hijabibridal.github.io';
  
  try {
    // Locate the JSON file using the current working directory
    const dataPath = path.resolve(process.cwd(), 'src/data/bridal-products.json');

    // Safety check: if the file is missing, return a basic sitemap instead of crashing the build
    if (!fs.existsSync(dataPath)) {
      console.error("BUILD ERROR: Data file missing at", dataPath);
      return [
        { url: baseUrl, lastModified: new Date().toISOString() },
        { url: `${baseUrl}/shop`, lastModified: new Date().toISOString() }
      ];
    }

    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const productData = JSON.parse(fileContent);

    // 1. Static Core Pages
    const staticPages = ['', '/shop', '/blog', '/about', '/search'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // 2. Dynamic Product Pages (Generated from JSON)
    const productPages = productData.products.map((p) => ({
      url: `${baseUrl}/shop/product/${p.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    // 3. Dynamic Category Pages (Generated from JSON)
    const categoryPages = productData.mainCategories.map((c) => ({
      url: `${baseUrl}/shop/category/${c.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }));

    // Combine all arrays into one flat sitemap list
    return [...staticPages, ...productPages, ...categoryPages];
    
  } catch (e) {
    console.error("Sitemap Generation Error:", e);
    // Return a minimal sitemap so the build can at least complete
    return [{ url: baseUrl, lastModified: new Date().toISOString() }];
  }
}