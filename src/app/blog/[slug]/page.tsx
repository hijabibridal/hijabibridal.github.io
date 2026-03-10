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

  // 1. KEYWORD DICTIONARY
  // You can add more terms here to make the matching even more precise
  const keywordMap = ["hijab", "dupatta", "lehenga", "groom", "jutti", "nails", "belt", "sharara", "dress"];
  const searchString = `${article.slug} ${article.pageTitle}`.toLowerCase();
  const matchedKeyword = keywordMap.find(word => searchString.includes(word)) || "bridal";

  // Filter pool based on keyword appearing in mainCategorySlugs
  const relatedPool = productData.products.filter(p => 
    p.mainCategorySlugs?.some((s: string) => s.toLowerCase().includes(matchedKeyword))
  );

  const finalPool = relatedPool.length > 0 ? relatedPool : productData.products;

  // 2. PRODUCT SELECTION (75% Size: h-[192px])
  const getByColor = (color: string) => finalPool.find(p => 
    p.mainCategorySlugs?.some(s => s.toLowerCase() === color.toLowerCase())
  );

  const galleryOneItems = [
    getByColor('red') || finalPool[0],
    getByColor('white') || finalPool[1],
    getByColor('champagne') || finalPool[2]
  ].filter(Boolean).slice(0, 3);

  const galleryTwoItems = finalPool
    .filter(p => !p.mainCategorySlugs?.some(s => ['red', 'white', 'champagne'].includes(s.toLowerCase())))
    .slice(0, 3);

  const ProductGallery = ({ items }: { items: any[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
      {items.map((prod) => (
        <Link key={prod.slug} href={`/shop/product/${prod.slug}`} className="group block">
          <div className="relative h-[192px] w-full rounded-2xl overflow-hidden shadow-sm bg-gray-50 mb-2 border border-pink-50">
            <Image 
              src={`/images/${prod.images[0].url.replace(/^\//, '')}`} 
              alt={prod.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized 
            />
          </div>
          <p className="text-black font-bold uppercase text-[10px] tracking-widest text-center group-hover:text-pink-600">
            {prod.name}
          </p>
        </Link>
      ))}
    </div>
  );

  // 3. CONTENT SPLITTING
  const parts = article.htmlBody.split('<h2>');

  const faqSchema = article.FAQ_schema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": JSON.parse(article.FAQ_schema)
  } : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <Breadcrumbs links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} currentPage={article.pageTitle} />
      
      <header className="my-10">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">{article.pageTitle}</h1>
        <div className="h-1.5 w-24 bg-pink-500 mt-4"></div>
      </header>

      {article.featuredImageUrl && (
        <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl relative bg-gray-50 h-[400px]">
          <Image src={article.featuredImageUrl} alt={article.featuredImageAlt} fill className="object-contain p-4" unoptimized />
        </div>
      )}

      <div className="prose prose-pink max-w-none text-lg text-black
                   [&_h2]:!text-pink-600 [&_h2]:!font-bold [&_h2]:text-3xl [&_h2]:mt-12 [&_h2]:mb-6
                   [&_h3]:!text-pink-500 [&_h3]:!font-normal [&_h3]:!not-italic [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3">
        
        <div dangerouslySetInnerHTML={{ __html: parts[0] }} />

        {/* Gallery 1: Red, White, Champagne before first H2 */}
        {parts.length > 1 && (
          <>
            <ProductGallery items={galleryOneItems} />
            <div dangerouslySetInnerHTML={{ __html: '<h2>' + parts[1] }} />
          </>
        )}

        {/* Middle content */}
        {parts.slice(2, -1).map((part: string, i: number) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: '<h2>' + part }} />
        ))}

        {/* Gallery 2: Alternates before last H2 */}
        {parts.length > 2 && (
          <>
            <ProductGallery items={galleryTwoItems} />
            <div dangerouslySetInnerHTML={{ __html: '<h2>' + parts[parts.length - 1] }} />
          </>
        )}
      </div>
    </div>
  );
}