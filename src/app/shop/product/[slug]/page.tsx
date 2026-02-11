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
    openGraph: {
      title: product.title_tag || product.name,
      description: product.meta_description,
      images: [{ url: `/images/${product.images[0]?.url}` }],
    }
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Split description into lines and filter empty ones
  const paragraphs = product.description.split('\n').filter(p => p.trim() !== '');

  // Parse FAQ Schema
  const faqData = product.FAQ_schema ? JSON.parse(product.FAQ_schema) : null;
  const jsonLd = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData
  } : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          {/* Gallery handles the main linked image and thumbnails */}
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <div className="description-area mt-4 space-y-4">
            {paragraphs.map((text, i) => {
              const lowerText = text.toLowerCase();
              
              // CREATE H2: Detect "How to wear" and make it Pink + Bold (No forced caps)
              if (lowerText.startsWith('how to wear')) {
                return (
                  <h2 key={i} className="text-[#db2777] text-xl font-bold mt-6 mb-2">
                    {text}
                  </h2>
                );
              }

              // Filter out the raw URL strings from the text to keep it clean
              if (text.includes('amzn.to') || text.includes('http')) return null;

              // DEFAULT: Plain Black Text for everything else
              return (
                <p key={i} className="text-black text-base leading-relaxed">
                  {text}
                </p>
              );
            })}
          </div>

          {/* Visual FAQ */}
          {faqData && (
            <div className="mt-12 border-t border-gray-100 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-widest italic">Product FAQs</h3>
              <div className="space-y-4">
                {faqData.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <p className="font-bold text-black mb-1">{faq.name}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
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