import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'

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

  const siteUrl = "https://hijabibridal.github.io";

  let faqs = [];
  if (product.FAQ_schema) {
    try {
      faqs = typeof product.FAQ_schema === 'string' 
        ? JSON.parse(product.FAQ_schema) 
        : product.FAQ_schema;
    } catch (e) {
      console.error("Error parsing FAQ schema", e);
    }
  }

  // Logic to split the figcaption for the "See More" effect
  const fullCaption = product.images[0]?.figcaption || "";
  const firstPeriodIndex = fullCaption.indexOf('.');
  const firstSentence = firstPeriodIndex !== -1 ? fullCaption.substring(0, firstPeriodIndex + 1) : fullCaption;
  const remainingText = firstPeriodIndex !== -1 ? fullCaption.substring(firstPeriodIndex + 1).trim() : "";

  const imageSchema = {
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    "contentUrl": `${siteUrl}/images/${product.images[0]?.url}`,
    "creator": { "@type": "Organization", "name": "Hijabi Bridal" },
    "iptcDigitalSourceType": product.images[0]?.iptc_type || "http://cv.iptc.org/newscodes/digitalsourcetype/compositeWithTrainedAlgorithmicMedia",
    "caption": fullCaption || product.meta_description
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />

      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs 
            items={[
              { label: 'Shop', href: '/shop' },
              { label: product.name, href: `/shop/product/${product.slug}` }
            ]} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <div>
              <ProductGallery images={product.images} />
              
              {/* --- DYNAMIC COLLAPSIBLE FIGCAPTION --- */}
              {fullCaption && (
                <figure className="mt-6 border-t border-pink-100 pt-4">
                  <details className="cursor-pointer group">
                    <summary className="list-none text-[13px] text-gray-600 leading-relaxed italic border-l-2 border-pink-200 pl-4">
                      {firstSentence} 
                      <span className="inline-block ml-2 text-xs font-bold text-[#db2777] uppercase tracking-widest group-open:hidden">
                        ... See More
                      </span>
                    </summary>
                    {remainingText && (
                      <figcaption className="mt-2 text-[13px] text-gray-600 leading-relaxed italic border-l-2 border-pink-200 pl-4">
                        {remainingText}
                      </figcaption>
                    )}
                  </details>
                </figure>
              )}
            </div>

            <div className="flex flex-col">
              <h1 className="text-black font-black text-4xl lg:text-6xl uppercase tracking-tighter leading-none mb-6">
                {product.name}
              </h1>

              {product.images[0]?.amazonLink && (
                <a 
                  href={product.images[0].amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-6"
                >
                  Purchase on Amazon.com
                </a>
              )}

              <div className="mt-4">
                <div 
                  className="text-black text-lg leading-relaxed whitespace-pre-wrap 
                             [&_h2]:text-[#db2777] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              {faqs.length > 0 && (
                <div className="mt-12 border-t border-pink-100 pt-8">
                  <h2 className="text-[#db2777] font-black text-3xl uppercase tracking-tighter mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq: any, index: number) => (
                      <div key={index} className="bg-pink-50/30 p-6 rounded-2xl">
                        <h3 className="text-black font-bold text-xl mb-2">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}