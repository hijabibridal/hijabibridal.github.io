import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const fallbackLink = product.images.find(img => img.amazonLink && img.amazonLink !== "")?.amazonLink || "#";

  // 1. Parse the FAQ string into an object for the Schema and the UI
  let faqs = [];
  try {
    if (product.FAQ_schema) {
      faqs = JSON.parse(product.FAQ_schema);
    }
  } catch (e) {
    console.error("Error parsing FAQ schema", e);
  }

  // 2. Prepare the JSON-LD object
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.name,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.acceptedAnswer.text
      }
    }))
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Invisible Schema for Search Engines */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Breadcrumbs 
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.name, href: `/shop/product/${product.slug}` },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <div>
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            fallbackLink={fallbackLink}
          />
        </div>

        <div className="flex flex-col">
          <h1 style={{ 
            color: '#db2777',
            fontWeight: 900, 
            textTransform: 'uppercase', 
            fontSize: '3rem', 
            lineHeight: '1',
            letterSpacing: '-0.05em',
            marginBottom: '1rem' 
          }}>
            {product.name}
          </h1>

          {!isGroom && (
            <a 
              href={fallbackLink} 
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

          {/* VISUAL FAQ SECTION: Displays the data from bridal-products.json */}
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
  );
}