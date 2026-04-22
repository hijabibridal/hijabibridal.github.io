import productData from '@/data/bridal-products.json'
import blogData from '@/data/blog-articles.json'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PatternSelector from '@/components/PatternSelector';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ 
    slug: p.slug 
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; 
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return {};

  const siteUrl = "https://hijabibridal.github.io"; 
  const ogImageUrl = `${siteUrl}/images/${product.og_image}`;

  return {
    metadataBase: new URL("https://hijabibridal.github.io"), 
    title: product.title_tag || product.name,
    description: product.meta_description,
    openGraph: {
      title: product.og_title || product.name,
      description: product.meta_description,
      url: `${siteUrl}/shop/product/${product.slug}`,
      siteName: "Hijabi Bridal",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // --- BLOG MATCHING LOGIC ---
  const keywords = ["dress", "lehenga", "groom", "nails", "jutti", "sharara", "hijab", "dupatta", "caftan", "jewelry"];
  const productSlugParts = product.slug.split('-');
  
  const matchedArticles = (blogData.articles || []).filter(article => {
    const articleSlugParts = article.slug.split('-');
    return keywords.some(word => 
      productSlugParts.includes(word) && articleSlugParts.includes(word)
    );
  });

  let displayArticles = matchedArticles.slice(0, 3);
  if (displayArticles.length < 3) {
    const fallbackArticles = (blogData.articles || []).filter(
      a => !displayArticles.find(da => da.slug === a.slug)
    );
    displayArticles = [...displayArticles, ...fallbackArticles].slice(0, 3);
  }

  // Logic for Color Matches Slider
  const colors = ["red", "green", "blue", "white", "lilac", "fuschia", "champagne", "peach", "gold", "silver", "black", "pink"];
  const productColors = product.mainCategorySlugs.filter(s => colors.includes(s));
  
  const relatedProducts = productData.products.filter(p => 
    p.slug !== product.slug && 
    p.mainCategorySlugs.some(s => productColors.includes(s))
  );

  // Split logic
  const hasH2 = product.description.includes('<h2');
  let introText = "";
  let remainingDescription = "";

  if (hasH2) {
    const splitIndex = product.description.indexOf('<h2');
    introText = product.description.substring(0, splitIndex);
    remainingDescription = product.description.substring(splitIndex);
  } else {
    const paragraphs = product.description.split(/<br\s*\/?>\s*<br\s*\/?>|\n\n/);
    introText = paragraphs[0];
    remainingDescription = paragraphs.slice(1).join('<br><br>');
  }

  // FAQ parsing
  let faqs = [];
  if (product.FAQ_schema) {
    try {
      faqs = typeof product.FAQ_schema === 'string' 
        ? JSON.parse(product.FAQ_schema) 
        : product.FAQ_schema;
    } catch (e) {
      console.error("FAQ parse error:", e);
    }
  }

  const finalFaqs = Array.isArray(faqs) ? faqs : [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": finalFaqs
  };

  // --- IMAGE SCHEMA ---
  // Tells Google explicitly which image is the primary/canonical product image.
  // This prevents Google from picking suggestedAddOns or relatedProducts images
  // as the representative image in search results.
  const siteUrl = "https://hijabibridal.github.io";
  const primaryImageUrl = `${siteUrl}/images/${product.images[0].url}`;

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": primaryImageUrl,
    "url": primaryImageUrl,
    "name": product.images[0].alt || product.name,
    "description": product.images[0].figcaption || product.meta_description,
    "representativeOfPage": true,
  };

  // Reusable Blog Section Component
  const BlogSection = () => (
    <div className="mt-12 lg:mt-6 border-t border-pink-50 pt-8">
      <h3 className="text-black font-bold text-xl uppercase tracking-tight mb-6">
        Recommended Reading
      </h3>
      <div className="space-y-6">
        {displayArticles.map((article: any, idx: number) => (
          <Link key={idx} href={`/blog/${article.slug}`} className="group block">
            <h4 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-[#db2777] transition-colors">
              {article.pageTitle}
            </h4>
            <span className="text-xs font-bold text-[#db2777] uppercase tracking-widest mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">
              Read Article →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* FAQ schema — any product with FAQ_schema data */}
      {finalFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ImageObject schema — all products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />

      {/* Tally exit-intent popup — only on AI-visualized products */}
      {product.description.includes('AI-visualized') && (
        <>
          <script>
 	  window.TallyConfig = {
            "formId": "Medqak",
  	    "popup": {
    	      "emoji": {
      		"text": "👋",
      		"animation": "wave"
    	      },
   	      "open": {
     	        "trigger": "time",
     	        "ms": 30000
    	      },
    	      "layout": "modal",
   	      "showOnce": true,
   	      "doNotShowAfterSubmit": true,
   	      "formEventsForwarding": true
  	    }
	};
	</script>

	<script async src="https://tally.so/widgets/embed.js"></script>
        </>
      )}

      <div className="bg-white min-h-screen text-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              {(product.breadcrumbs || []).map((bc: any, index: number) => {
                const isLast = index === product.breadcrumbs.length - 1;
                const internalHref = bc.item.replace("https://hijabibridal.github.io", "") || "/";
                
                return (
                  <li key={index} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-400">/</span>}
                    {isLast ? (
                      <span className="text-gray-800 font-medium">{bc.name}</span>
                    ) : (
                      <Link 
                        href={internalHref}
                        className="hover:text-[#db2777] transition-colors"
                      >
                        {bc.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-start">
            {/* LEFT COLUMN */}
            <div className="w-full">
              <ProductGallery 
                productName={product.name}
                images={product.images.map(img => ({
                  ...img,
                  amazonLink: img.amazonLink || null
                }))} 
              />
              {/* DESKTOP BLOG PLACEMENT */}
              <div className="hidden lg:block">
                <BlogSection />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col">
              <h1 className="text-black font-black text-4xl lg:text-6xl uppercase tracking-tighter leading-none mb-6">
                {product.name}
              </h1>

              {product.images[0]?.amazonLink && (
                <a 
                  href={product.images[0].amazonLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-6"
                >
                  Purchase on Amazon.com
                </a>
              )}

              <figure className="mb-8">
                <figcaption className="text-gray-800 text-lg leading-relaxed border-l-4 border-pink-200 pl-6">
                  <div dangerouslySetInnerHTML={{ 
                    __html: `<strong>${product.images[0]?.figcaption || ''}</strong><br/><br/>${introText}` 
                  }} />
                </figcaption>
              </figure>

              {(product as any).suggestedAddOns && (product as any).suggestedAddOns.length >= 2 && (
                <div className="mt-4 mb-8">
                  <p className="text-black font-bold mb-4 text-xl capitalize">
                    This {
                      product.mainCategorySlugs?.find(slug => 
                        !colors.includes(slug.toLowerCase())
                      )?.replace(/-/g, ' ') || 'style'
                    } goes perfectly with these:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {(product as any).suggestedAddOns.slice(0, 2).map((addon: any, idx: number) => (
                      <Link 
                        key={idx} 
                        href={`/shop/product/${addon.targetSlug}`} 
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-pink-100 shadow-sm block"
                      >
                        <Image
                          src={addon.image.startsWith('http') || addon.image.startsWith('/') ? addon.image : `/images/${addon.image}`}
                          alt={`Suggested accessory ${idx + 1}`}
                          fill
                          // loading="lazy" tells Google's crawler these images are
                          // secondary — deprioritises them vs the main product image
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* --- SEWING PATTERN SECTION --- */}
              {product.mainCategorySlugs?.includes('muslim-lehenga') && (
                <PatternSelector />
              )}

              {remainingDescription && (
                <div className="mt-4">
                  <div 
                    className="text-black text-lg leading-relaxed whitespace-pre-wrap 
                               [&_h2]:text-[#db2777] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4"
                    dangerouslySetInnerHTML={{ __html: remainingDescription }}
                  />
                </div>
              )}

              {finalFaqs.length > 0 && (
                <div className="mt-12 border-t border-pink-100 pt-8">
                  <h2 className="text-[#db2777] font-black text-3xl uppercase tracking-tighter mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {finalFaqs.map((faq: any, index: number) => (
                      <div key={index} className="bg-pink-50/30 p-6 rounded-2xl text-black">
                        <h3 className="font-bold text-xl mb-2">
                          {faq.name}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {faq.acceptedAnswer.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MOBILE BLOG PLACEMENT */}
              <div className="lg:hidden">
                <BlogSection />
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16 border-t border-pink-100 pt-12">
              <h3 className="text-black font-bold text-2xl uppercase tracking-wider mb-8">
                More in this Color
              </h3>
              <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar">
                {relatedProducts.map((rp) => (
                  <Link 
                    key={rp.slug} 
                    href={`/shop/product/${rp.slug}`}
                    className="flex-shrink-0 w-48 group"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src={`/images/${rp.images[0].url}`}
                        alt={rp.name}
                        fill
                        // loading="lazy" deprioritises these carousel images so
                        // Google's image picker doesn't mistake them for the
                        // primary product image
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#db2777]">
                      {rp.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}