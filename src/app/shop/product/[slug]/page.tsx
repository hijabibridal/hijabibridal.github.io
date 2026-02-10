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

  const siteUrl = 'https://hijabibridal.github.io'; 
  const imageUrl = `${siteUrl}/images/${product.images[0]?.url}`;

  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
    openGraph: {
      title: product.title_tag || product.name,
      description: product.meta_description,
      images: [{ url: imageUrl }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('groom');

  const AmazonButton = ({ className }: { className?: string }) => {
    if (isGroom) return null;
    return (
      <a 
        href={product.images[0]?.amazonLink || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`inline-block bg-[#FF1493] hover:bg-[#C71585] text-white font-black py-4 px-10 rounded-full shadow-lg transition-all uppercase tracking-widest text-sm text-center ${className}`}
      >
        Shop This Item on Amazon
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
        <ProductGallery images={product.images} productName={product.name} />

        <div className="flex flex-col">
          {/* BOLDED HEADER */}
          <h1 className="text-4xl font-black text-gray-900 leading-tight uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <AmazonButton className="mt-2" />

          <hr className="my-8 border-pink-50" />

          {/* FORMATTED DESCRIPTION */}
          <div className="prose prose-pink max-w-none">
            <h3 className="text-2xl font-black text-gray-800 mb-6 uppercase tracking-wide">
              Product Details
            </h3>
            
            {/* Targeting the first paragraph (Amazon link part) via CSS 
              and ensuring HTML from your JSON renders correctly.
            */}
            <div 
              className="text-gray-700 leading-relaxed text-lg 
                         [&>p:first-of-type]:font-bold [&>p:first-of-type]:text-pink-700 
                         [&_a]:text-pink-600 [&_a]:underline [&_a]:font-bold"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          <AmazonButton className="mt-10" />

          {/* BOLDED FAQ SECTION */}
          {product.FAQ_schema && (
            <div className="mt-12 p-8 bg-pink-50 rounded-3xl border border-pink-100">
              <h3 className="text-2xl font-black text-pink-600 mb-6 uppercase tracking-tighter">
                Common Questions
              </h3>
              <div className="space-y-6">
                {JSON.parse(product.FAQ_schema).map((item: any, i: number) => (
                  <div key={i} className="border-b border-pink-100 pb-4 last:border-0">
                    {/* BOLDED QUESTION */}
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