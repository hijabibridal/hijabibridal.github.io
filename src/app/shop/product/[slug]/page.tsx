import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. GLOBAL CSS OVERRIDE: This kills all orange and fixes headers */}
      <style dangerouslySetInnerHTML={{ __html: `
        .prose a { color: #db2777 !important; text-decoration: underline !important; font-weight: bold; }
        .prose h2 { color: #db2777 !important; text-transform: none !important; margin-top: 2rem !important; margin-bottom: 1rem !important; font-weight: 900 !important; }
        /* Target any leftover orange from the data */
        [style*="orange"], .text-orange-500 { color: #db2777 !important; }
        .bg-orange-500 { background-color: #db2777 !important; }
      `}} />

      {/* 2. FAQ SCHEMA FIX */}
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
        {/* LEFT: IMAGE GALLERY (Fixed path logic) */}
        <div className="relative">
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            isGroom={isGroom} 
          />
        </div>

        {/* RIGHT: CONTENT */}
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
            <p className="mt-2 text-pink-600 font-bold italic">
              Groom Collection: Click individual pieces below to purchase on Amazon.
            </p>
          )}

          <hr className="my-8 border-pink-50" />

          {/* THE DESCRIPTION (Fixed the visible code error) */}
          <div className="prose prose-pink max-w-none">
            <div 
              className="text-gray-700 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          {/* ... FAQ section remains same ... */}
        </div>
      </div>
    </div>
  );
}