import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import Script from 'next/script'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  // CLEANUP LOGIC: Remove Wix links and orange styling
  const cleanDescription = product.description
    .replace(/<a[^>]*href="[^"]*wix\.com[^"]*"[^>]*>(.*?)<\/a>/gi, '$1') // Strip Wix links, keep text
    .replace(/orange/gi, '#FF1493') // Replace "orange" color names with Hot Pink hex
    .replace(/text-orange-500|text-orange-600/gi, 'text-pink-600'); // Purge Tailwind orange

  const AmazonButton = () => {
    if (isGroom) return null;
    return (
      <a 
        href={primaryAmazonLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full shadow-lg transition-all uppercase tracking-widest text-sm text-center"
      >
        Order this product on Amazon
      </a>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {product.FAQ_schema && (
        <Script id="product-schema" type="application/ld+json" strategy="beforeInteractive">
          {product.FAQ_schema}
        </Script>
      )}

      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={product.name} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Gallery: If not groom, whole section links to primary amazon link */}
        <div className="relative">
          {isGroom ? (
            <ProductGallery images={product.images} productName={product.name} />
          ) : (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" className="cursor-zoom-in">
              <ProductGallery images={product.images} productName={product.name} />
            </a>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-pink-600 leading-tight uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <div className="mt-2"><AmazonButton /></div>

          <hr className="my-8 border-pink-50" />

          {/* Formatted Description */}
          <div className="prose prose-pink max-w-none">
            <div 
              className="text-gray-700 leading-relaxed text-lg 
                         [&_b]:text-pink-700 [&_strong]:text-pink-700 [&_strong]:font-black
                         [&_p:first-of-type]:font-bold [&_p:first-of-type]:text-pink-600 [&_p:first-of-type]:text-xl"
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
            />
          </div>

          <div className="mt-10"><AmazonButton /></div>

          {/* FAQ Section */}
          {product.FAQ_schema && (
            <div className="mt-12 p-8 bg-pink-50 rounded-3xl border border-pink-100">
              <h3 className="text-2xl font-black text-pink-600 mb-6 uppercase tracking-tighter">Common Questions</h3>
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