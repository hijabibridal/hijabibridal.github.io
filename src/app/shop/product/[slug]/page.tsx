import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ slug: p.slug }));
}

// FULL SEO SUITE: Includes OG Title, OG Image, Twitter, and Meta Description
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return {};

  const siteUrl = "https://yourdomain.com"; // Update to your actual domain
  const imageUrl = `${siteUrl}/images/products/${product.images[0]?.url.replace(/^\//, '')}`;

  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
    alternates: { canonical: `/shop/product/${product.slug}` },
    openGraph: {
      title: product.title_tag || product.name,
      description: product.meta_description,
      url: `/shop/product/${product.slug}`,
      images: [{ url: imageUrl, alt: product.images[0]?.alt || product.name }],
      type: 'article',
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

  const paragraphs = product.description.split('\n');

  // FAQ SCHEMA (JSON-LD)
  const faqData = product.FAQ_schema ? JSON.parse(product.FAQ_schema) : null;
  const jsonLd = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData
  } : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. SEO Schema Injection */}
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
          {/* 2. Image Gallery with specific Alt Text */}
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <div className="description-area mt-4 space-y-6">
            {paragraphs.map((text, i) => {
              const lowerText = text.toLowerCase();
              
              // PINK HEADERS logic
              const isHeader = lowerText.startsWith('how to wear') || 
                               lowerText.startsWith('about this') || 
                               lowerText.startsWith('shop this color');

              if (isHeader) {
                return (
                  <h2 key={i} className="text-[#db2777] text-xl font-bold mt-8 uppercase tracking-tight border-b border-pink-100 pb-2">
                    {text}
                  </h2>
                );
              }

              // AMAZON LINK BUTTONS logic
              if (text.includes('amzn.to')) {
                const urlMatch = text.match(/https?:\/\/amzn\.to\/\S+/);
                const url = urlMatch ? urlMatch[0] : '#';
                return (
                  <div key={i} className="pt-2">
                    <a href={url} target="_blank" className="inline-block bg-[#db2777] text-white px-8 py-3 rounded-full font-bold uppercase text-xs hover:bg-black transition-colors shadow-lg">
                      Order on Amazon
                    </a>
                  </div>
                );
              }

              return (
                <p key={i} className="text-gray-700 leading-relaxed text-lg">
                  {text}
                </p>
              );
            })}
          </div>

          {/* 3. VISUAL FAQ Display */}
          {faqData && (
            <div className="mt-16 border-t border-gray-100 pt-10">
              <h3 className="text-2xl font-black text-gray-900 uppercase mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqData.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-white border border-pink-100 p-6 rounded-2xl">
                    <p className="font-bold text-gray-900 mb-2 text-lg">{faq.name}</p>
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