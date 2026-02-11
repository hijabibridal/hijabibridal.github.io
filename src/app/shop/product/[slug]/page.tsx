import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
    openGraph: {
        title: product.og_title,
        description: product.meta_description,
        images: [{ url: product.og_image || product.images[0]?.url }],
        type: 'website',
    }
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* GLOBAL CSS: Kill Orange, Fix Headers */}
      <style dangerouslySetInnerHTML={{ __html: `
        .prose a { color: #db2777 !important; text-decoration: underline !important; font-weight: bold; }
        .prose h2 { color: #db2777 !important; text-transform: none !important; margin-top: 2.5rem !important; }
        [style*="orange"], .text-orange-500, .bg-orange-500 { color: #db2777 !important; border-color: #db2777 !important; }
      `}} />

      {/* JSON-LD FAQ SCHEMA FIX */}
      {product.FAQ_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: product.FAQ_schema }}
        />
      )}

      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={product.name} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="relative">
          {/* GALLERY: Individual links for Groom, Single link for Bridal */}
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            isGroom={isGroom} 
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          {!isGroom ? (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-2 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg transition-transform hover:scale-105">
              Order this product on Amazon
            </a>
          ) : (
            <div className="mt-2 p-4 bg-pink-50 rounded-2xl border border-pink-100">
                <p className="text-pink-600 font-bold italic text-sm">
                  Groom's Collection: Click individual pieces in the gallery or the links in the description below to purchase on Amazon.
                </p>
            </div>
          )}

          <hr className="my-8 border-pink-50" />

          <div className="prose prose-pink max-w-none">
            <div 
              className="text-gray-700 leading-relaxed text-lg [&_p]:mb-6 last:[&_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-10 inline-block bg-pink-600 hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg">
              Order this product on Amazon
            </a>
          )}

          {/* COMMON QUESTIONS */}
          {product.FAQ_schema && (
            <div className="mt-12 p-8 bg-pink-50 rounded-3xl border border-pink-100">
              <h2 className="text-2xl font-black text-pink-600 mb-6 uppercase tracking-tighter">
                Common Questions
              </h2>
              <div className="space-y-6">
                {(() => {
                  try {
                    const faqs = JSON.parse(product.FAQ_schema);
                    return faqs.map((item: any, i: number) => (
                      <div key={i} className="border-b border-pink-100 pb-4 last:border-0">
                        <p className="font-black text-gray-900 text-lg">Q: {item.name}</p>
                        <p className="text-gray-700 mt-2">A: {item.acceptedAnswer.text}</p>
                      </div>
                    ));
                  } catch (e) { return null; }
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}