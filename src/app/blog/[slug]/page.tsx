import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import type { Metadata } from "next";

const typedBlogData = blogData as any;

export async function generateStaticParams() {
  const articles = typedBlogData?.articles || [];
  if (articles.length === 0) return [{ slug: "coming-soon" }];
  
  return articles.map((article: any) => ({
    slug: article.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = typedBlogData?.articles?.find((a: any) => a.slug === slug);

  if (!article) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} 
        currentPage={article.pageTitle} 
      />
      
      <header className="my-10">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">
          {article.pageTitle}
        </h1>
        {/* Branding: Red for happiness and new beginnings */}
        <div className="h-1.5 w-24 bg-red-600 mt-4"></div>
      </header>

      {article.featuredImageUrl && (
        <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl relative aspect-video">
          <Image 
            src={article.featuredImageUrl} 
            alt={article.featuredImageAlt} 
            fill 
            className="object-cover" 
            unoptimized 
          />
        </div>
      )}

      <article 
  className="prose prose-pink max-w-none text-lg leading-relaxed
             [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-pink-600 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:uppercase [&_h2]:tracking-tighter
             [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pink-500 [&_h3]:mt-8 [&_h3]:mb-3"
  dangerouslySetInnerHTML={{ __html: article.htmlBody }} 
/>
    </div>
  );
}