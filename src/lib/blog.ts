// src/lib/blog.ts
import blogArticles from '@/data/blog-articles.json';

export interface BlogArticle {
  isPreformatted: boolean;
  slug: string;
  mainCategorySlug: string;
  mainCategoryName: string;
  subCategorySlug: string;
  subCategoryName: string;
  pageTitle: string;
  titleTag: string;
  description: string;
  metaDescription: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  featuredImageHint: string;
  authorName: string;
  datePublished: string;
  dateModified: string;
  htmlBody: string;
}

export function getAllBlogPosts(): BlogArticle[] {
  try {
    return blogArticles.articles || [];
  } catch (error) {
    console.error('Failed to load blog articles:', error);
    return [];
  }
}