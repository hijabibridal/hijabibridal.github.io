import path from 'path';
import fs from 'fs';

export default function sitemap() {
  const baseUrl = 'https://hijabibridal.github.io';
  
  try {
    // Uses process.cwd() to find the root of your project
    const dataPath = path.resolve(process.cwd(), 'src/data/bridal-products.json');

    if (!fs.existsSync(dataPath)) {
      console.error("DATA FILE MISSING AT:", dataPath);
      return [];
    }

    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const productData = JSON.parse(fileContent);

    const staticPages = ['', '/shop', '/blog', '/about'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const productPages = productData.products.map((p) => ({
      url: `${baseUrl}/shop/product/${p.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    const categoryPages = productData.mainCategories.map((c) => ({
      url: `${baseUrl}/shop/category/${c.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    }));

    return [...staticPages, ...productPages, ...categoryPages];
  } catch (e) {
    console.error("Sitemap Error:", e);
    return [];
  }
}