import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import productData from "@/data/bridal-products.json"; 
import type { Metadata } from "next";
import Script from "next/script";

const typedBlogData = blogData as any;

export async function generateStaticParams() {
  const articles = typedBlogData?.articles || [];
  if (articles.length === 0) return [{ slug: "coming-soon" }];
  return articles.map((article: any) => ({ slug: article.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = typedBlogData?.articles?.find((a: any) => a.slug === slug);

  if (!article) notFound();

  // 1. IMPROVED FUZZY MATCHING LOGIC
  // We clean the title and slug to find the core product subject
  const searchContext = `${article.slug} ${article.pageTitle}`.toLowerCase();
  
  // Define the core product types found in your bridal-products.json slugs
  const productTypes = ["hijab", "dupatta", "lehenga", "abaya", "gown", "dress", "jewelry"];
  
  // Find which product type is mentioned in the blog info
  const matchedType = productTypes.find(type => searchContext.includes(type)) || "";

  // Filter products that have the matched type in their mainCategorySlugs
  let relatedItems = productData.products.filter(p => 
    p.mainCategorySlugs?.some((s: string) => s.toLowerCase().includes(matchedType))
  );

  // Fallback: If no specific type matches, use all products
  if (relatedItems.length === 0) {
    relatedItems = productData.products;
  }

  // 2. COLOR TRIO LOGIC (Red, White, Champagne)
  // We look specifically for these colors within the filtered product type
  const getProductByColor = (color: string) => 
    relatedItems.find(p => 
      p.mainCategorySlugs?.some((s: string) => s.toLowerCase() === color.toLowerCase())
    );

  const sidebarProducts = [
    getProductByColor('red') || relatedItems[0],
    getProductByColor('white') || relatedItems[1],
    getProductByColor('champagne') || relatedItems[2]
  ].filter(Boolean).slice(0, 3);

  const faqSchema = article.FAQ_schema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": JSON.parse(article.FAQ_schema)
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
        {/* MAIN ARTICLE COLUMN */}
        <div className="lg:col-span-8">
          <header className="mb-10 text-black">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
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
            className="prose prose-pink max-w-none text-lg leading-relaxed text-black
                       [&_h2]:!text-pink-600 [&_h2]:!font-bold [&_h2]:!not-italic [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4
                       [&_h3]:!text-pink-500 [&_h3]:!font-bold [&_h3]:!not-italic [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3
                       [&_a]:!text-pink-600 [&_a]:!font-bold [&_a]:underline decoration-pink-200 hover:decoration-pink-500"
            dangerouslySetInnerHTML={{ __html: article.htmlBody }} 
          />
        </div>

        {/* SIDEBAR COLUMN */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black mb-6 border-b-4 border-pink-100 pb-2">
              Trending Designs
            </h2>
            <div className="flex flex-col gap-6">
              {sidebarProducts.map((prod: any) => {
                const firstImage = prod.images && prod.images[0];
                if (!firstImage) return null;

                return (
                  <Link 
                    key={prod.slug} 
                    href={`/shop/product/${prod.slug}`}
                    className="group block"
                  >
                    {/* 90% SIZE: h-[230px] */}
                    <div className="relative h-[230px] w-full rounded-2xl overflow-hidden shadow-md bg-gray-50 mb-3 border border-pink-50">
                      <Image 
                        src={`/images/${firstImage.url.replace(/^\//, '')}`} 
                        alt={firstImage.alt || prod.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                    <h3 className="text-black font-bold uppercase text-xs tracking-widest group-hover:text-pink-600 transition-colors">
                      {prod.name}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}