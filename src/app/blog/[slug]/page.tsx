import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import type { Metadata } from "next";
import Script from "next/script";

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

  // Prepare the FAQ Schema object
  const faqSchema = article.FAQ_schema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": JSON.parse(article.FAQ_schema)
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} 
        currentPage={article.pageTitle} 
      />
      
      <header className="my-10">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
          {article.pageTitle}
        </h1>
        <div className="h-1.5 w-24 bg-pink-500 mt-4"></div>
      </header>

      {article.featuredImageUrl && (
        <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl relative bg-gray-50 h-[450px]">
          <Image 
            src={article.featuredImageUrl} 
            alt={article.featuredImageAlt} 
            fill 
            className="object-contain p-4" 
            unoptimized 
          />
        </div>
      )}

      <article 
        className="prose prose-pink max-w-none text-lg leading-relaxed
                   [&_h2]:!text-pink-600 [&_h2]:!font-normal [&_h2]:!not-italic [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4
                   [&_h3]:!text-pink-500 [&_h3]:!font-normal [&_h3]:!not-italic [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3
                   [&_a]:!text-pink-600 [&_a]:!font-bold [&_a]:underline decoration-pink-200 hover:decoration-pink-500
                   [&_h4]:!text-pink-500 [&_h4]:!font-normal [&_h4]:!not-italic"
        dangerouslySetInnerHTML={{ __html: article.htmlBody }} 
      />
    </div>
  );
}