import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import productData from "@/data/bridal-products.json"; 
import type { Metadata } from "next";
import Script from "next/script";

const typedBlogData = blogData as any;

// ─── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const articles = typedBlogData?.articles || [];
  if (articles.length === 0) return [{ slug: "coming-soon" }];
  return articles.map((article: any) => ({ slug: article.slug }));
}

// ─── Per-page metadata (meta title + description for each blog post) ──────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = typedBlogData?.articles?.find((a: any) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.pageTitle} | Hijabi Bridal`,
    description: article.description,
    openGraph: {
      title: `${article.pageTitle} | Hijabi Bridal`,
      description: article.description,
      type: "article",
      url: `https://hijabibridal.github.io/blog/${article.slug}`,
      ...(article.featuredImageUrl
        ? { images: [{ url: `https://hijabibridal.github.io${article.featuredImageUrl}` }] }
        : {}),
    },
  };
}

// ─── Page component ───────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = typedBlogData?.articles?.find((a: any) => a.slug === slug);

  if (!article) notFound();

  // 1. KEYWORD DICTIONARY
  const keywordMap = ["hijab", "caftan", "dupatta", "lehenga", "groom", "jutti", "nails", "belt", "sharara", "dress"];
  const searchString = `${article.slug} ${article.pageTitle}`.toLowerCase();
  let matchedKeyword = keywordMap.find(word => searchString.includes(word)) || "bridal";

  const bodyTextLower = article.htmlBody.toLowerCase();
  
  if (bodyTextLower.includes("muslim bridal dress")) {
    matchedKeyword = "muslim-wedding-dresses";
  } else if (bodyTextLower.includes("muslim sherwani")) {
    matchedKeyword = "muslim-groom-outfit";
  }

  const relatedPool = productData.products.filter(p => 
    p.mainCategorySlugs?.some((s: string) => s.toLowerCase().includes(matchedKeyword))
  );

  const finalPool = relatedPool.length > 0 ? relatedPool : productData.products;

  const finalPool = (relatedPool.length > 0 ? relatedPool : productData.products)
  .sort(() => 0.5 - Math.random()); // Add this line to shuffle

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

  const faqSchema = article.FAQ_schema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": JSON.parse(article.FAQ_schema),
      }
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.pageTitle,
    "description": article.description,
    "url": `https://hijabibridal.github.io/blog/${article.slug}`,
    "datePublished": article.datePublished || "2025-01-01",
    "dateModified": article.dateModified || article.datePublished || "2026-01-01",
    "author": {
      "@type": "Organization",
      "name": "Hijabi Bridal",
      "url": "https://hijabibridal.github.io/about",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hijabi Bridal",
      "url": "https://hijabibridal.github.io/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hijabibridal.github.io/images/hero-bridal.jpg",
      },
    },
    "image": article.featuredImageUrl
      ? `https://hijabibridal.github.io${article.featuredImageUrl}`
      : undefined,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://hijabibridal.github.io/blog/${article.slug}`,
    },
    "inLanguage": "en-US",
    "keywords": article.description,
  };

  // Logic for adding three other blog titles sorted by title with keyword matching
  const matchKeywords = ["dress", "lehenga", "nails", "groom", "guests", "hijab", "dupatta", "jutti", "belt", "sharara"];
  const currentTitleLower = article.pageTitle.toLowerCase();
  const activeKeywords = matchKeywords.filter(word => currentTitleLower.includes(word));
  
  const otherBlogsPool = typedBlogData.articles.filter((a: any) => a.slug !== article.slug);
  
  const matchedBlogs = otherBlogsPool.filter((a: any) => {
    const otherTitleLower = a.pageTitle.toLowerCase();
    return activeKeywords.some(word => otherTitleLower.includes(word));
  });

  let finalDisplayBlogs = [...matchedBlogs];

  if (finalDisplayBlogs.length < 3) {
    const nonMatchedBlogs = otherBlogsPool.filter(
      (a: any) => !matchedBlogs.some((m: any) => m.slug === a.slug)
    );
    finalDisplayBlogs = [...matchedBlogs, ...nonMatchedBlogs.slice(0, 3 - matchedBlogs.length)];
  }

  finalDisplayBlogs = finalDisplayBlogs.slice(0, 3).sort((a: any, b: any) => a.pageTitle.localeCompare(b.pageTitle));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">

      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} currentPage={article.pageTitle} />
      
      <header className="my-10">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">{article.pageTitle}</h1>
        <div className="h-1.5 w-24 bg-pink-500 mt-4"></div>

        <p className="mt-4 text-sm text-gray-500">
          By{" "}
          <Link href="/about" className="font-medium text-pink-600 hover:underline">
            Hijabi Bridal Team
          </Link>
          {article.datePublished && (
            <>
              {" · "}
              <time dateTime={article.datePublished}>
                {new Date(article.datePublished).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </p>
      </header>

      {article.featuredImageUrl && (
        <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl relative bg-gray-50 h-[400px]">
          {/* Linked featured image logic using productUrl */}
          {article.productUrl ? (
            <Link href={article.productUrl.startsWith('/') ? article.productUrl : `/${article.productUrl}`} className="group cursor-pointer">
              <Image 
                src={article.featuredImageUrl} 
                alt={article.featuredImageAlt} 
                fill 
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]" 
                unoptimized 
              />
            </Link>
          ) : (
            <Image src={article.featuredImageUrl} alt={article.featuredImageAlt} fill className="object-contain p-4" unoptimized />
          )}
        </div>
      )}

      <div className="prose prose-pink max-w-none text-lg text-black
                   [&_h2]:!text-pink-600 [&_h2]:!font-bold [&_h2]:text-3xl [&_h2]:mt-12 [&_h2]:mb-6
                   [&_h3]:!text-pink-500 [&_h3]:!font-normal [&_h3]:!not-italic [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3">
        
        <div dangerouslySetInnerHTML={{ __html: parts[0] }} />

        {parts.length > 1 && (
          <>
            <ProductGallery items={galleryOneItems} />
            <div dangerouslySetInnerHTML={{ __html: '<h2>' + parts[1] }} />
          </>
        )}

        {parts.slice(2, -1).map((part: string, i: number) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: '<h2>' + part }} />
        ))}

        {parts.length > 2 && (
          <>
            <ProductGallery items={galleryTwoItems} />
            <div dangerouslySetInnerHTML={{ __html: '<h2>' + parts[parts.length - 1] }} />
          </>
        )}
      </div>

      <div className="mt-20 pt-10 border-t border-pink-100 flex flex-col md:flex-row justify-center items-center gap-8 text-center pb-10">
        {Array.from(new Set(productData.products.flatMap((p: any) => p.mainCategorySlugs || [])))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((cat: string) => (
            <Link 
              key={cat} 
              href={`/shop/category/${cat}`}
              className="group flex flex-col items-center"
            >
              <span className="text-gray-500 uppercase text-[10px] tracking-[0.2em] mb-1">
                Explore Collection
              </span>
              <span className="text-black font-black uppercase text-xl md:text-2xl tracking-tighter group-hover:text-pink-600 transition-colors border-b-2 border-transparent group-hover:border-pink-200">
                {cat.replace(/-/g, ' ')}
              </span>
            </Link>
          ))}
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center pb-20">
        {finalDisplayBlogs.map((blog: any) => (
          <Link 
            key={blog.slug} 
            href={`/blog/${blog.slug}`}
            className="group flex flex-col items-center max-w-[250px]"
          >
            <span className="text-gray-400 uppercase text-[9px] tracking-[0.2em] mb-1">
              Read More
            </span>
            <span className="text-gray-800 font-bold uppercase text-sm tracking-tight group-hover:text-pink-500 transition-colors">
              {blog.pageTitle}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}