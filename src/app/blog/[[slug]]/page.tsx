import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import sanitizeHtml from 'sanitize-html';
import type { Metadata, ResolvingMetadata } from "next";
import { getKeywords } from "@/lib/seo-utils";

const typedBlogData = blogData as any; 

export async function generateStaticParams() {
  // If no articles, return at least one "dummy" slug to satisfy the build
  if (!typedBlogData?.articles || typedBlogData.articles.length === 0) {
    return [{ slug: 'coming-soon' }]; 
  }
  return typedBlogData.articles.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = typedBlogData.articles?.find(
    (item: any) => item.slug.trim().toLowerCase() === slug.toLowerCase()
  );

  if (!article) return { title: "Coming Soon | Hijabi Bridal" };

  return {
    metadataBase: new URL('https://hijabibridal.github.io'),
    title: article.titleTag || article.pageTitle,
    description: article.metaDescription || article.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = typedBlogData.articles?.find(
    (item: any) => item.slug.trim().toLowerCase() === slug.toLowerCase()
  );

  // If the slug is our "dummy" build-fixer or doesn't exist, show Coming Soon
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Something Beautiful is Coming</h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
        <p className="text-gray-600">We are curating bridal insights for our USA launch.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} currentPage={article.pageTitle} />
      <header className="my-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{article.pageTitle}</h1>
        <div className="h-1 w-24 bg-red-600 mt-4"></div> {/* Branding: Red for happiness */}
      </header>
      {/* Rest of your article rendering logic */}
    </div>
  );
}