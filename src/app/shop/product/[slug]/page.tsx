import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* NUCLEAR CSS OVERRIDE: This forces Pink (#db2777) and regular font weights */}
      <style dangerouslySetInnerHTML={{ __html: `
        .product-content h2 { color: #db2777 !important; font-weight: 900 !important; font-size: 1.5rem !important; margin-top: 2rem !important; text-transform: none !important; }
        .product-content a { color: #db2777 !important; font-weight: bold !important; text-decoration: underline !important; }
        .product-content p { color: #374151 !important; font-weight: normal !important; margin-bottom: 1.25rem !important; line-height: 1.6 !important; }
        .product-content strong, .product-content b { color: #db2777 !important; font-weight: bold !important; }
        /* Forces any orange from JSON to Pink */
        [style*="orange"], .text-orange-500 { color: #db2777 !important; }
        .bg-pink-600 { background-color: #db2777 !important; }
      `}} />

      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={product.name} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="relative">
          <ProductGallery images={product.images} productName={product.name} isGroom={isGroom} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-2 inline-block bg-[#db2777] hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg transition-transform hover:scale-105">
              Order this product on Amazon
            </a>
          )}

          <hr className="my-8 border-pink-50" />

          <div className="prose prose-pink max-w-none">
            <div 
              className="product-content"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          {!isGroom && (
            <a href={primaryAmazonLink} target="_blank" rel="noopener" 
               className="mt-10 inline-block bg-[#db2777] hover:bg-pink-700 text-white font-black py-4 px-10 rounded-full text-center uppercase tracking-widest text-sm shadow-lg">
              Order this product on Amazon
            </a>
          )}
        </div>
      </div>
    </div>
  );
}