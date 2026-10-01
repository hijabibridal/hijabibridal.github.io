import productData from '@/data/bridal-products.json'
import blogData from '@/data/blog-articles.json'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PatternSelector from '@/components/PatternSelector';
import AmazonButton from '@/components/AmazonButton';
import AddToCartButton from '@/components/AddToCartButton';

type PageProps = { params: Promise<{ slug: string }> };

// Products that show the PayPal button instead of the Amazon button.
// Add your real product slugs here once you're done testing.
const PAYPAL_SLUGS = ['hnb1001', 'halal-nails-berries', 'halal-nails-pink-neutrals', 'halal-nails-cool-neutrals'];

// Upcoming products: show a greyed-out, unclickable "Add to Cart" with no
// price. Slugs must match the product's slug in bridal-products.json exactly.
// When a product is ready to sell, move its slug from here into PAYPAL_SLUGS
// (and add it to HALAL_NAILS_VARIANTS first).
const COMING_SOON_SLUGS = [
  'dark-red-cat-eye-artificial-nails',
  'white-cat-eye-hijabi-nails',
  'pink-ombre-halal-nails',
];

// Halal Nails kits sold on this site (not on Amazon). These pages get Product
// schema for Google rich results and Merchant Center. The glue tabs are left
// out on purpose because they are sold on Amazon.
const NAIL_KIT_SLUGS = ['halal-nails-berries', 'halal-nails-pink-neutrals', 'halal-nails-cool-neutrals'];

// "Recommended Reading" on the kit pages shows only these general press-on
// articles (in this order), not the halal/haram ones.
const NAIL_KIT_READING_SLUGS = [
  'how-to-remove-press-on-nails',
  'short-press-on-nails',
  'press-on-vs-acrylic-vs-gel-nails',
  'can-you-reuse-press-on-nails',
];

// Price in US dollars for each kit. Only used if the product data has no
// price of its own. Replace each 0 with the real price, e.g. 24.99.
// While a price is 0, that page gets no Product schema (so Google never sees
// a wrong price).
const NAIL_KIT_PRICES: Record<string, number> = {
  'halal-nails-berries': 25,
  'halal-nails-pink-neutrals': 25,
  'halal-nails-cool-neutrals': 25,
};

// Shipping and return details for the kits, taken from the /legal page.
// Countries the kits ship to (ISO codes; UK is GB).
const NAIL_SHIP_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'FR', 'DE', 'NL', 'BE', 'JP', 'KR', 'SG', 'MY'];
// Shipping cost in US dollars for ONE kit: $10 per order. Orders of more than
// two items ship free at checkout; that threshold can't be expressed in the
// page schema, so it is set in Merchant Center / stated on the /legal page.
const NAIL_SHIPPING_USD = 10;

// Turns a price like 24.99, "24.99" or "$24.99" into a number.
function parsePrice(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = parseFloat(value.replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

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
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: product.images?.[0]?.alt || product.name }],
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

  // Nail kits: show only the general press-on articles (if they exist in the data).
  if (NAIL_KIT_SLUGS.includes(product.slug)) {
    const kitReading = (blogData.articles || [])
      .filter((art) => NAIL_KIT_READING_SLUGS.includes(art.slug))
      .sort((x, y) => NAIL_KIT_READING_SLUGS.indexOf(x.slug) - NAIL_KIT_READING_SLUGS.indexOf(y.slug));
    if (kitReading.length > 0) displayArticles = kitReading;
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

  // --- PRODUCT SCHEMA (Halal Nails kits only) ---
  const isNailKit = NAIL_KIT_SLUGS.includes(product.slug);
  const kitPrice = isNailKit
    ? (parsePrice((product as any).price) || NAIL_KIT_PRICES[product.slug] || 0)
    : 0;

  const productSchema = isNailKit && kitPrice > 0
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.meta_description,
        "sku": product.slug,
        "brand": { "@type": "Brand", "name": "Halal Nails" },
        "image": product.images.map((img: any) => `${siteUrl}/images/${String(img.url).replace(/^\//, '')}`),
        "offers": {
          "@type": "Offer",
          "url": `${siteUrl}/shop/product/${product.slug}`,
          "priceCurrency": "USD",
          "price": kitPrice.toFixed(2),
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "shippingDetails": NAIL_SHIP_COUNTRIES.map((country) => ({
            "@type": "OfferShippingDetails",
            "shippingRate": { "@type": "MonetaryAmount", "value": NAIL_SHIPPING_USD, "currency": "USD" },
            "shippingDestination": { "@type": "DefinedRegion", "addressCountry": country },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "DAY" },
              "transitTime": { "@type": "QuantitativeValue", "minValue": 7, "maxValue": 12, "unitCode": "DAY" },
            },
          })),
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": NAIL_SHIP_COUNTRIES,
            "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
            "merchantReturnLink": `${siteUrl}/legal`,
          },
        },
      }
    : null;

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

      {/* Product schema — Halal Nails kits only (not the Amazon glue tabs) */}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
          <script
            dangerouslySetInnerHTML={{
              __html: `window.TallyConfig = {
  "formId": "Medqak",
  "popup": {
    "emoji": { "text": "👋", "animation": "wave" },
    "open": { "trigger": "time", "ms": 30000 },
    "layout": "modal",
    "showOnce": true,
    "doNotShowAfterSubmit": true,
    "formEventsForwarding": true
  }
};`,
            }}
          />
          <script async src="https://tally.so/widgets/embed.js" />
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

              {PAYPAL_SLUGS.includes(product.slug) ? (
                <AddToCartButton
                  initialSlug={product.slug}
                />
              ) : COMING_SOON_SLUGS.includes(product.slug) ? (
                <button
                  disabled
                  aria-disabled="true"
                  className="inline-block bg-gray-300 text-gray-500 font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm w-max mb-6 cursor-not-allowed"
                >
                  Add to Cart
                </button>
              ) : (
                product.images[0]?.amazonLink && (
                  <AmazonButton
                    href={product.images[0].amazonLink}
                    productName={product.name}
                    productSlug={product.slug}
                  />
                )
              )}

              <figure className="mb-8">
                <figcaption className="text-gray-800 text-lg leading-relaxed border-l-4 border-pink-200 pl-6">
                  <div dangerouslySetInnerHTML={{ 
                    __html: `<strong>${product.images[0]?.figcaption || ''}</strong>` 
                  }} />
                </figcaption>
              </figure>

              {(product as any).suggestedAddOns && (product as any).suggestedAddOns.length >= 2 && (
                <div className="mt-4 mb-8">
                  <p className="text-black font-bold mb-4 text-xl capitalize">
                    Related Products:
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

              {introText && (
                <div
                  className="text-gray-800 text-lg leading-relaxed mt-4 mb-8"
                  dangerouslySetInnerHTML={{ __html: introText }}
                />
              )}

              {/* --- SEWING PATTERN SECTION --- */}
              {product.mainCategorySlugs?.includes('muslim-lehenga') &&
               !product.name.toLowerCase().includes('readymade') && (
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
