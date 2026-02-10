// src/types/blog.ts
export interface InternalLink {
  id: string;
  url: string;
  text: string;
}

export interface BlogArticle {
  slug: string;
  pageTitle: string;
  description: string;
  metaDescription: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  mainCategorySlug: string;
  mainCategoryName: string;
  subCategorySlug: string;
  subCategoryName: string;
  htmlBody: string;
  isPreformatted: boolean;
  amazon_link?: string;
  datePublished: string;
  dateModified: string;
  featuredImageHint?: string;
  titleTag?: string;
  author?: {
    name: string;
    url?: string;
    image?: string;
    sameAs?: string[];
  };
}

export interface BlogData {
  mainCategories: {
    slug: string;
    name: string;
    titleTag: string;
    metaDescription: string;
    description: string;
  }[];
  subCategories: {
    mainCategorySlug: string;
    slug: string;
    name: string;
    titleTag: string;
    metaDescription: string;
    description: string;
  }[];
  articles: BlogArticle[];
  internalLinks?: InternalLink[];
}