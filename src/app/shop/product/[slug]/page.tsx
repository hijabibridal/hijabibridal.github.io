import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import Script from 'next/script'

export default async function ProductPage({ params }: any) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  // --- LOGIC: TEXT CLEANUP & AUTO-FORMATTING ---
  const formatDescription = (text: string) => {
    // 1. Remove Wix/Internal links but keep the text
    let cleaned = text.replace(/<a[^>]*href="[^"]*wix\.com[^"]*"[^>]*>(.*?)<\/a>/gi, '$1');
    
    // 2. Remove "Check price on Amazon" phrases entirely
    cleaned = cleaned.replace(/Check price on Amazon:?\s*/gi, '');

    // 3. If it's a block of text (not HTML), convert line breaks to paragraphs
    if (!cleaned.includes('<p>')) {
      cleaned = cleaned
        .split('\n\n')
        .map(para => {
          // Auto-bold lines that look like Questions or Headers
          if (para.startsWith('Q:') || para.includes('How to wear') || para.includes('FAQs')) {
            return `<p><strong>${para}</strong></p>`;
          }
          return `<p>${para}</p>`;
        })
        .join('');
    }

    // 4. Final Purge of Orange & Internal Links
    return cleaned
      .replace(/orange/gi, 'inherit')
      .replace(/<a[^>]*href="(?!https?:\/\/(?:www\.)?amzn\.to|https?:\/\/(?:www\.)?amazon\.com)[^"]*"[^>]*>(.*?)<\/a>/gi, '$1');
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
          {/* Main Image links to Amazon, thumbnails in ProductGallery will NOT link until active */}
          {!isGroom ? (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" className="cursor-pointer">
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
               className="mt-2 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg">
              Order this product on Amazon
            </a>
          )}

          <hr className="my-8 border-pink-50" />

          <div className="prose prose-pink max-w-none">
            <h3 className="text-2xl font-black text-pink-600 mb-6 uppercase tracking-wide">
              Product Details
            </h3>
            
            <div 
              className="text-gray-700 leading-relaxed text-lg 
                         [&_strong]:text-gray-900 [&_strong]:font-black
                         [&_p:first-of-type]:font-bold [&_p:first-of-type]:text-gray-900 [&_p:first-of-type]:text-xl"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>

          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-10 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg">
              Order this product on Amazon
            </a>
          )}
        </div>
      </div>
    </div>
  );
}