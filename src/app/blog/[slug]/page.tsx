import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import sanitizeHtml from 'sanitize-html';
import type { Metadata, ResolvingMetadata } from "next";
import { getKeywords } from "@/lib/seo-utils";
import Link from "next/link";

// Type assertion for your articles
const typedBlogData = blogData as any; 

export async function generateStaticParams() {
  if (!typedBlogData || !typedBlogData.articles) return [];
  return typedBlogData.articles.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const article = typedBlogData.articles.find(
    (item: any) => item.slug.trim().toLowerCase() === slug.toLowerCase()
  );

  if (!article) return { title: "Article Not Found" };

  const previousKeywords = (await parent).keywords || [];
  const articleKeywords = getKeywords(article.mainCategorySlug?.includes("dog"));

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
  const article = typedBlogData.articles.find(
    (item: any) => item.slug.trim().toLowerCase() === slug.toLowerCase()
  );

  if (!article) notFound();

  // Logic for internal links and HTML processing
  const parseInternalLinks = (html: string) => {
    const internalLinks = typedBlogData.internalLinks || [];
    const linkMap = new Map(internalLinks.map((link: any) => [link.id.toLowerCase(), link]));

    return html.replace(/<InternalLink\s+id=(["']?)([^"'\s>]+)\1\s*\/>/gi, (_, quoteChar, id) => {
      const link = linkMap.get(id.toLowerCase());
      return link ? `<a href="${link.url}" class="internal-link text-pink-600 font-bold">${link.text}</a>` : `<span>${id}</span>`;
    });
  };

  const renderArticleContent = () => {
    let processedHtml = article.isPreformatted ? article.htmlBody : parseInternalLinks(article.htmlBody);
    
    // Applying your specific styles for headings and sections
    processedHtml = processedHtml.replace(/<h2(\s*[^>]*)>/gi, (match, attrs) => {
      const style = 'style="font-size: 1.5rem; font-weight: bold; color: #db2777; margin: 1.5rem 0;"'; // Switched to Pink for Bridal
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
      </header>
      <div className="mb-8 rounded-xl overflow-hidden shadow-xl relative aspect-video">
        <Image src={article.featuredImageUrl} alt={article.featuredImageAlt} fill className="object-cover" unoptimized />
      </div>
      {renderArticleContent()}
    </div>
  );
}