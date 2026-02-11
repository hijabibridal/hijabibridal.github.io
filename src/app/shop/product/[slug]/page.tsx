import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import Script from 'next/script'

type PageProps = { params: Promise<{ slug: string }> };

// 1. STATIC PATH GENERATION (Fixes Build Error)
export async function generateStaticParams() {
  return productData.products.map((product) => ({
    slug: product.slug,
  }));
}

// 2. DYNAMIC SEO METADATA
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

  // Logic to identify grooming items (adjust slug name if necessary)
  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit') || 
                  product.mainCategorySlugs.includes('groom');
                  
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  // 3. LOGIC: CLEANUP & AUTO-FORMATTING
  const formatDescription = (text: string) => {
    // A. Strip Wix/Internal links but keep the anchor text
    let cleaned = text.replace(/<a[^>]*href="[^"]*wix\.com[^"]*"[^>]*>(.*?)<\/a>/gi, '$1');
    
    // B. Strip "Check price on Amazon" text leftovers
    cleaned = cleaned.replace(/Check price on Amazon:?\s*/gi, '');

    // C. Convert plain text blocks to HTML paragraphs
    if (!cleaned.includes('<p>')) {
      cleaned = cleaned
        .split('\n\n')
        .map(para => {
          // Auto-bold Questions (Q:) or styling headers
          if (para.trim().startsWith('Q:') || 
              para.includes('How to wear') || 
              para.includes('FAQs') || 
              para.includes('Shop this color')) {
            return `<p><strong>${para.trim()}</strong></p>`;
          }
          return `<p>${para.trim()}</p>`;
        })
        .join('');
    }

    // D. Final Purge: Force black text for bolds and remove any other internal links
    return cleaned
      .replace(/orange/gi, 'inherit')
      .replace(/<a[^>]*href="(?!https?:\/\/(?:www\.)?amzn\.to|https?:\/\/(?:www\.)?amazon\.com)[^"]*"[^>]*>(.*?)<\/a>/gi, '$1');
  };

  const formattedContent = formatDescription(product.description);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 4. SCHEMA INJECTION */}
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
        {/* LEFT: GALLERY */}
        <div className="relative">
          {!isGroom ? (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" className="cursor-pointer block">
               <ProductGallery images={product.images} productName={product.name} />
            </a>
          ) : (
            <ProductGallery images={product.images} productName={product.name} />
          )}
        </div>

        {/* RIGHT: CONTENT */}
        <div className="flex flex-col">
          {/* Page Name: Bold Black */}
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          {/* Primary Action Button */}
          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-2 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg transition-transform hover:scale-105">
              Order this product on Amazon
            </a>
          )}

          <hr className="my-8 border-pink-50" />

          {/* PRODUCT DETAILS SECTION */}
          <div className="prose prose-pink max-w-none">
            {/* Subheader: Hot Pink */}
            <h3 className="text-2xl font-black text-pink-600 mb-6 uppercase tracking-wide">
              Product Details
            </h3>
            
            <div 
              className="text-gray-700 leading-relaxed text-lg 
                         [&_strong]:text-gray-900 [&_strong]:font-black
                         [&_b]:text-gray-900 [&_b]:font-black
                         [&_p:first-of-type]:font-bold [&_p:first-of-type]:text-gray-900 [&_p:first-of-type]:text-xl mb-8"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-4 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg transition-transform hover:scale-105">
              Order this product on Amazon
            </a>
          )}

          {/* FAQ SECTION */}
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