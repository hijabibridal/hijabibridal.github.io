import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import Script from 'next/script'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit') || 
                  product.mainCategorySlugs.includes('groom');
                  
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  // ENHANCED FORMATTING SCRIPT
  const formatDescription = (text: string) => {
    // 1. Strip Wix Links & Orange text
    let cleaned = text
      .replace(/<a[^>]*href="[^"]*wix\.com[^"]*"[^>]*>(.*?)<\/a>/gi, '$1')
      .replace(/orange/gi, 'inherit');

    // 2. Formatting logic for plain text blocks
    if (!cleaned.includes('<p>')) {
      return cleaned
        .split('\n') // Split by every line break
        .filter(line => line.trim() !== "") // Remove empty lines
        .map(line => {
          const trimmed = line.trim();
          // Detect Questions, "How to", or "FAQs" and wrap in bold
          if (trimmed.startsWith('Q:') || 
              trimmed.toLowerCase().includes('how to wear') || 
              trimmed.toLowerCase().includes('faq')) {
            return `<p><strong>${trimmed}</strong></p>`;
          }
          // Detect Amazon links in text and make them pink/bold
          if (trimmed.includes('amzn.to') || trimmed.includes('amazon.com')) {
             return `<p><strong>${trimmed}</strong></p>`;
          }
          return `<p>${trimmed}</p>`;
        })
        .join('');
    }

    // 3. Cleanup for existing HTML blocks
    return cleaned.replace(/<a[^>]*href="(?!https?:\/\/(?:www\.)?amzn\.to|https?:\/\/(?:www\.)?amazon\.com)[^"]*"[^>]*>(.*?)<\/a>/gi, '$1');
  };

  const formattedContent = formatDescription(product.description);

  return (
    <div className="container mx-auto px-4 py-8">
      {product.FAQ_schema && (
        <Script id="product-schema" type="application/ld+json" strategy="afterInteractive">
          {product.FAQ_schema}
        </Script>
      )}

      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={product.name} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="relative">
          {!isGroom ? (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" className="cursor-pointer block">
               <ProductGallery images={product.images} productName={product.name} />
            </a>
          ) : (
            <ProductGallery images={product.images} productName={product.name} />
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-2 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg transition-transform hover:scale-105">
              Order this product on Amazon
            </a>
          )}

          <hr className="my-8 border-pink-50" />

          {/* DESCRIPTION SECTION (No header, just the formatted text) */}
          <div className="prose prose-pink max-w-none">
            <div 
              className="text-gray-700 leading-relaxed text-lg 
                         [&_strong]:text-gray-900 [&_strong]:font-black
                         [&_p]:mb-6 last:[&_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-10 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg transition-transform hover:scale-105">
              Order this product on Amazon
            </a>
          )}

          {/* FAQ SECTION (Only if JSON has schema) */}
          {product.FAQ_schema && (
            <div className="mt-12 p-8 bg-pink-50 rounded-3xl border border-pink-100">
              <h3 className="text-2xl font-black text-pink-600 mb-6 uppercase tracking-tighter">
                Common Questions
              </h3>
              <div className="space-y-6">
                {JSON.parse(product.FAQ_schema).map((item: any, i: number) => (
                  <div key={i} className="border-b border-pink-100 pb-4 last:border-0">
                    <p className="font-black text-gray-900 text-lg">Q: {item.name}</p>
                    <p className="text-gray-700 mt-2">A: {item.acceptedAnswer.text}</p>
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