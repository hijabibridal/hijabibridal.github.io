import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ slug: p.slug }));
}

// SEO & Social Media (OG/Twitter) Meta Tags
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return {};

  const imageUrl = `/images/products/${product.images[0]?.url.replace(/^\//, '')}`;

  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
    openGraph: {
      title: product.title_tag || product.name,
      description: product.meta_description,
      images: [{ url: imageUrl, alt: product.images[0]?.alt || product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title_tag || product.name,
      description: product.meta_description,
      images: [imageUrl],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Split the description by lines to identify headers and paragraphs
  const paragraphs = product.description.split('\n');

  // FAQ Schema Injection
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
          {/* Gallery with Main Image Link and Thumbnails */}
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <div className="description-area mt-4 space-y-6">
            {paragraphs.map((text, i) => {
              const lowerText = text.toLowerCase();
              
              // IDENTIFY HEADERS: Starts with "How to wear", "About this", or "Shop this color"
              const isHeader = lowerText.startsWith('how to wear') || 
                               lowerText.startsWith('about this') || 
                               lowerText.startsWith('shop this color');

              if (isHeader) {
                return (
                  <h2 key={i} className="text-[#db2777] text-xl font-bold mt-8">
                    {text}
                  </h2>
                );
              }

              // Filter out raw Amazon URLs from the text to keep it clean (since the image is the link)
              if (text.includes('amzn.to') || text.includes('https://')) return null;

              // DEFAULT: Plain Black Text
              return (
                <p key={i} className="text-black leading-relaxed text-lg">
                  {text}
                </p>
              );
            })}
          </div>

          {/* Visual FAQ Section */}
          {faqData && (
            <div className="mt-16 border-t border-gray-100 pt-10">
              <h3 className="text-2xl font-black text-gray-900 uppercase mb-8">Questions & Answers</h3>
              <div className="space-y-6">
                {faqData.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-pink-50/30 p-6 rounded-2xl border border-pink-100">
                    <p className="font-bold text-gray-900 mb-2">{faq.name}</p>
                    <p className="text-gray-700">{faq.acceptedAnswer.text}</p>
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