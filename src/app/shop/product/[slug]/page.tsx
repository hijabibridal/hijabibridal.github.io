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

  // SEO image using the primary image path
  const imageUrl = `/images/${product.images[0]?.url.replace(/^\//, '')}`;

  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
    openGraph: {
      title: product.og_title || product.name,
      description: product.meta_description,
      images: [{ url: imageUrl }],
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Find the 'Page Link' (the first image that actually has a link) to use as fallback
  const pageFallbackLink = product.images.find(img => img.amazonLink && img.amazonLink !== "")?.amazonLink || "#";

  // Process description: remove HTML tags and split into lines
  const paragraphs = product.description
    .replace(/<[^>]*>/g, ' ') 
    .split('\n')
    .map(p => p.trim())
    .filter(p => p !== '');

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
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            fallbackLink={pageFallbackLink} 
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <div className="description-area mt-4 space-y-4">
            {paragraphs.map((text, i) => {
              const lowerText = text.toLowerCase();
              
              // Pink Bold H2 for "How to wear"
              if (lowerText.startsWith('how to wear')) {
                return (
                  <h2 key={i} className="text-[#db2777] text-xl font-bold mt-6">
                    {text}
                  </h2>
                );
              }

              // Hide raw links in the description body
              if (text.includes('amzn.to') || text.includes('http')) return null;

              // All other text is plain black
              return (
                <p key={i} className="text-black leading-relaxed text-lg">
                  {text}
                </p>
              );
            })}
          </div>

          {faqData && (
            <div className="mt-16 border-t border-gray-100 pt-10">
              <h3 className="text-2xl font-black text-gray-900 uppercase mb-8">Questions & Answers</h3>
              <div className="space-y-4">
                {faqData.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-2xl">
                    <p className="font-bold text-gray-900 mb-2">{faq.name}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
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