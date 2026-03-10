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

  // Split logic: Find the first <h2> to separate intro from body
  const hasH2 = product.description.includes('<h2');
  let introText = "";
  let remainingDescription = "";

  if (hasH2) {
    const splitIndex = product.description.indexOf('<h2');
    introText = product.description.substring(0, splitIndex);
    remainingDescription = product.description.substring(splitIndex);
  } else {
    // If no <h2>, split by the first double-break to isolate the first paragraph
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-white min-h-screen text-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs 
            items={[
              { label: 'Shop', href: '/shop' },
              { label: product.name, href: `/shop/product/${product.slug}` }
            ]} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-start">
            {/* LEFT COLUMN: Gallery */}
            <div>
              <ProductGallery 
                productName={product.name}
                images={product.images.map(img => ({
                  ...img,
                  // Amazon links removed unless type is 'collection'
                  amazonLink: product.type === 'collection' ? img.amazonLink : null
                }))} 
              />
            </div>

            {/* RIGHT COLUMN: Product Info & Descriptions */}
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

              {/* Combined Block: Original Figcaption + Intro Paragraph */}
              <figure className="mb-8">
                <figcaption className="text-gray-800 text-lg leading-relaxed border-l-4 border-pink-200 pl-6">
                  <div dangerouslySetInnerHTML={{ 
                    __html: `<strong>${product.images[0]?.figcaption || ''}</strong><br/><br/>${introText}` 
                  }} />
                </figcaption>
              </figure>

              {/* Remaining Content: Headings, Links, and Body Text */}
              {remainingDescription && (
                <div className="mt-4">
                  <div 
                    className="text-black text-lg leading-relaxed whitespace-pre-wrap 
                               [&_h2]:text-[#db2777] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4"
                    dangerouslySetInnerHTML={{ __html: remainingDescription }}
                  />
                </div>
              )}

              {/* FAQ Section */}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}