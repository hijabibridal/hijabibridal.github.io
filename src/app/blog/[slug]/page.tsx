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

  // 1. ROBUST MATCHING LOGIC
  const searchContext = `${article.slug} ${article.pageTitle}`.toLowerCase();
  const productTypes = ["hijab", "dupatta", "lehenga", "abaya", "gown", "dress", "jewelry"];
  const matchedType = productTypes.find(type => searchContext.includes(type)) || "";

  // Filter products by type
  const relatedItems = productData.products.filter(p => 
    p.mainCategorySlugs?.some((s: string) => s.toLowerCase().includes(matchedType))
  );

  const finalPool = relatedItems.length > 0 ? relatedItems : productData.products;

  // 2. GALLERY COMPONENT (Helper)
  const ProductGallery = ({ items }: { items: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {items.map((prod) => (
        <Link key={prod.slug} href={`/shop/product/${prod.slug}`} className="group block">
          <div className="relative h-[230px] w-full rounded-2xl overflow-hidden shadow-md bg-gray-50 mb-3 border border-pink-50">
            <Image 
              src={`/images/${prod.images[0].url.replace(/^\//, '')}`} 
              alt={prod.name} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
              unoptimized 
            />
          </div>
          <h3 className="text-black font-bold uppercase text-xs tracking-widest group-hover:text-pink-600 transition-colors text-center">
            {prod.name}
          </h3>
        </Link>
      ))}
    </div>
  );

  // 3. SEPARATE PRODUCTS FOR GALLERIES
  const primaryColors = ['red', 'white', 'champagne'];
  
  const galleryOneItems = [
    finalPool.find(p => p.mainCategorySlugs?.some(s => s.toLowerCase() === 'red')) || finalPool[0],
    finalPool.find(p => p.mainCategorySlugs?.some(s => s.toLowerCase() === 'white')) || finalPool[1],
    finalPool.find(p => p.mainCategorySlugs?.some(s => s.toLowerCase() === 'champagne')) || finalPool[2]
  ].filter(Boolean).slice(0, 3);

  const galleryTwoItems = finalPool
    .filter(p => !p.mainCategorySlugs?.some(s => primaryColors.includes(s.toLowerCase())))
    .slice(0, 3);

  // 4. INJECT GALLERIES INTO HTML BODY
  const bodyParts = article.htmlBody.split('<h2>');
  
  // If there are at least two H2s, we can place them precisely
  let finalContent = article.htmlBody;
  if (bodyParts.length >= 3) {
    const firstH2 = '<h2>' + bodyParts[1];
    const lastH2Index = bodyParts.length - 1;
    const lastH2 = '<h2>' + bodyParts[lastH2Index];

    // Note: React elements cannot be injected directly into dangerouslySetInnerHTML strings, 
    // so we render the content in parts in the return statement below.
  }

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

      <div className="prose prose-pink max-w-none text-lg leading-relaxed text-black
                   [&_h2]:!text-pink-600 [&_h2]:!font-bold [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4
                   [&_h3]:!text-pink-500 [&_h3]:!font-bold [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3">
        
        {/* Render content before first H2 */}
        <div dangerouslySetInnerHTML={{ __html: bodyParts[0] }} />

        {/* Gallery 1: Red, White, Champagne */}
        <h2 className="text-[#db2777] font-black text-2xl uppercase tracking-tight mb-4">Trending Collections</h2>
        <ProductGallery items={galleryOneItems} />

        {/* Render middle content */}
        {bodyParts.slice(1, -1).map((part: string, i: number) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: '<h2>' + part }} />
        ))}

        {/* Gallery 2: Alternate Colors */}
        <h2 className="text-[#db2777] font-black text-2xl uppercase tracking-tight mb-4">More Styles to Explore</h2>
        <ProductGallery items={galleryTwoItems} />

        {/* Render content after last H2 */}
        <div dangerouslySetInnerHTML={{ __html: '<h2>' + bodyParts[bodyParts.length - 1] }} />
      </div>
    </div>
  );
}