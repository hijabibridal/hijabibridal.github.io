import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import sanitizeHtml from 'sanitize-html';
import type { Metadata, ResolvingMetadata } from "next";
import { getKeywords } from "@/lib/seo-utils";
import Link from "next/link";

// Type assertion for your 111 articles
const typedBlogData = blogData as {
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
  articles: {
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
  }[];
  internalLinks?: {
    id: string;
    url: string;
    text: string;
    }[];
};

// FIXED: Only ONE declaration of generateStaticParams.
// This tells GitHub to build all 111 articles as static pages.
export async function generateStaticParams() {
  if (!typedBlogData || !typedBlogData.articles) {
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
  const resolvedParams = await params;
  const slug = resolvedParams.slug.trim().toLowerCase();
  
  const article = typedBlogData.articles.find(
    (item) => item.slug.trim().toLowerCase() === slug
  );

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    };
  }

  const previousKeywords = (await parent).keywords || [];
  const articleKeywords = getKeywords(article.mainCategorySlug.includes("dog"));

  return {
    metadataBase: new URL('https://hijabibridal.github.io'),
    title: article.titleTag || article.pageTitle,
    description: article.metaDescription || article.description,
    keywords: [...articleKeywords, ...previousKeywords],
    openGraph: {
      title: article.titleTag || article.pageTitle,
      description: article.metaDescription || article.description,
      images: [
        {
          url: article.featuredImageUrl,
          width: 800,
          height: 600,
          alt: article.featuredImageAlt,
        },
      ],
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified || article.datePublished,
      authors: ['Nick Garcia'],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleTag || article.pageTitle,
      description: article.metaDescription || article.description,
      images: [article.featuredImageUrl],
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const slug = params.slug.trim().toLowerCase();
  
  const article = typedBlogData.articles.find(
    (item) => item.slug.trim().toLowerCase() === slug
  );

  if (!article) {
    notFound();
  }

  const parseInternalLinks = (html: string) => {
    const internalLinks = typedBlogData.internalLinks || [];
    const linkMap = new Map(
      internalLinks.map((link) => [link.id.toLowerCase(), link])
    );

    return html.replace(
      /<InternalLink\s+id=(["']?)([^"'\s>]+)\1\s*\/>/gi,
      (_, quoteChar, id) => {
        const normalizedId = id.toLowerCase();
        const link = linkMap.get(normalizedId);

        if (!link) {
          return `<span class="broken-link">[Broken Link: ${id}]</span>`;
        }

        return `<a href="${link.url}" class="internal-link">${link.text}</a>`;
      }
    );
  };

  const renderArticleContent = () => {
    try {
      let processedHtml = article.isPreformatted
        ? article.htmlBody
        : parseInternalLinks(article.htmlBody);
      
      processedHtml = processedHtml.replace(
        /<section\s+class="[^"]*my-0[^"]*"[^>]*>/gi,
        '<section style="background-color: rgba(255, 172, 28, 0.1); padding: 1.5rem; border-radius: 0.5rem; margin: 1.5rem 0;">'
      );
      
      processedHtml = processedHtml.replace(
        /<h2(\s*[^>]*)>/gi, 
        (match, attrs) => {
          let cleanedAttrs = attrs
            .replace(/(style\s*=\s*["'][^"']*font-size[^"']*["'])/gi, '')
            .replace(/(style\s*=\s*["'][^"']*color[^"']*["'])/gi, '')
            .replace(/(class\s*=\s*["'][^"']*text-\S+[^"']*["'])/gi, '');
          
          const styleAttr = 'style="font-size: 1.5rem !important; font-weight: bold !important; color: #E59419 !important; margin: 1.5rem 0 1rem !important;"';
          const classAttr = 'class="blog-heading"';
          
          return `<h2${cleanedAttrs} ${classAttr} ${styleAttr}>`;
        }
      );
      
      processedHtml = processedHtml
        .replace(/<p>(\s|&nbsp;)*<\/p>/gi, '')
        .replace(/<div[^>]*>(\s|&nbsp;)*<\/div>/gi, '')
        .replace(/<section[^>]*>(\s|&nbsp;)*<\/section>/gi, '')
        .replace(/<h[1-6]>(\s|&nbsp;)*<\/h[1-6]>/gi, '')
        .replace(/\b(mt|mb|pt|pb|ml|mr|pl|pr|mx|my|px|py|space|gap)-\d+\b/gi, '')
        .replace(/\n\s*\n/g, '\n')
        .replace(/>\s{2,}</g, '><')
        .replace(/<\/p>\s*<p>/gi, '</p><p>')
        .replace(/(<br\s*\/?>\s*)(<\/[a-zA-Z]+>)/gi, '$2')
        .replace(/(<[a-zA-Z]+[^>]*>)(\s*<br\s*\/?>\s*)/gi, '$1')
        .replace(/<div[^>]*>\s*<\/div>/gi, '')
        .replace(/<section[^>]*>\s*<\/section>/gi, '')
        .replace(/>\s+<h[1-6]/g, '><h$1')
        .replace(/<\/h[1-6]>\s+</g, '</h$1><')
        .replace(/>\s+<p/g, '><p')
        .replace(/<\/p>\s+</g, '</p><')
        .replace(/>\s+<div/g, '><div')
        .replace(/<\/div>\s+</g, '</div><')
        .replace(/>\s+<(ul|ol)/g, '><$1')
        .replace(/<\/(ul|ol)>\s+</g, '</$1><');

      const sanitizedHtml = sanitizeHtml(processedHtml, {
        allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'svg', 'path', 'line', 'rect', 'circle', 'g', 'text', 'tspan'],
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          a: ['href', 'name', 'target', 'class', 'rel'],
          img: ['src', 'alt', 'width', 'height', 'class', 'style'],
          div: ['class', 'style'],
          span: ['class', 'style'],
          h2: ['class', 'style'],
          section: ['class', 'style'],
        },
        allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
      });

      return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    } catch (error) {
      return <div className="text-red-500">Error loading content</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl blog-article">
      <header className="mb-4">
        <h1 className="!text-4xl !md:text-5xl font-bold">{article.pageTitle}</h1>
      </header>
      <div className="mb-6 rounded-lg overflow-hidden shadow-lg relative aspect-video">
        <Image src={article.featuredImageUrl} alt={article.featuredImageAlt} fill className="object-contain" unoptimized />
      </div>
      <div className="prose max-w-none">
        <div className="mb-4 text-base text-gray-700">{article.description}</div>
        {renderArticleContent()}
      </div>
    </div>
  );
}