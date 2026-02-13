import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import sanitizeHtml from 'sanitize-html';
import type { Metadata, ResolvingMetadata } from "next";
import { getKeywords } from "@/lib/seo-utils";
import Link from "next/link";

// Define the interface to ensure TypeScript correctly handles the array
interface BlogArticle {
  slug: string;
  pageTitle: string;
  titleTag?: string;
  metaDescription?: string;
  description: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  datePublished?: string;
  mainCategorySlug?: string;
  isPreformatted?: boolean;
  htmlBody: string;
}

interface BlogData {
  articles: BlogArticle[];
  internalLinks?: { id: string; url: string; text: string }[];
}

const typedBlogData = blogData as BlogData;

// CRITICAL: This satisfies the "output: export" requirement
export async function generateStaticParams() {
  // If articles array is missing or empty, return an empty array to prevent build failure
  if (!typedBlogData || !typedBlogData.articles || typedBlogData.articles.length === 0) {
    return [];
  }

  return typedBlogData.articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const article = typedBlogData.articles?.find(
    (item) => item.slug.trim().toLowerCase() === slug.toLowerCase()
  );

  if (!article) return { title: "Article Not Found" };

  const previousKeywords = (await parent).keywords || [];
  // Updated keywords logic to focus on your bridal brand
  const articleKeywords = getKeywords(false); 

  return {
    metadataBase: new URL('https://hijabibridal.github.io'),
    title: article.titleTag || article.pageTitle,
    description: article.metaDescription || article.description,
    keywords: [...articleKeywords, ...previousKeywords],
    openGraph: {
      title: article.titleTag || article.pageTitle,
      description: article.metaDescription || article.description,
      images: [{ url: article.featuredImageUrl, alt: article.featuredImageAlt }],
      publishedTime: article.datePublished,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = typedBlogData.articles?.find(
    (item) => item.slug.trim().toLowerCase() === slug.toLowerCase()
  );

  if (!article) notFound();

  const renderArticleContent = () => {
    // Process internal links and HTML structure
    let processedHtml = article.htmlBody;
    
    // Applying Pink/Bridal styles to headings
    processedHtml = processedHtml.replace(/<h2(\s*[^>]*)>/gi, (match) => {
      const style = 'style="font-size: 1.5rem; font-weight: bold; color: #db2777; margin: 1.5rem 0;"';
      return `<h2 ${style} class="blog-heading">${match.replace(/<h2[^>]*>/, '')}`;
    });

    const sanitizedHtml = sanitizeHtml(processedHtml, {
      allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'section', 'svg', 'path'],
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'style'],
        a: ['href', 'target'],
        img: ['src', 'alt', 'width', 'height'],
      }
    });

    return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} currentPage={article.pageTitle} />
      <header className="my-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{article.pageTitle}</h1>
        {/* Branding: Red for happiness and new beginnings */}
        <div className="h-1 w-24 bg-red-600 mt-4"></div>
      </header>
      <div className="mb-8 rounded-xl overflow-hidden shadow-xl relative aspect-video">
        <Image src={article.featuredImageUrl} alt={article.featuredImageAlt} fill className="object-cover" unoptimized />
      </div>
      {renderArticleContent()}
    </div>
  );
}