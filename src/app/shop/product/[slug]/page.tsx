import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'

type PageProps = { params: Promise<{ slug: string }> };

// 1. Required for Static Export: Tells Next.js to create a page for the green dress and others
export async function generateStaticParams() {
  return productData.products.map((p) => ({ 
    slug: p.slug 
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);

  if (!product) notFound();

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: product.name, href: `/shop/product/${product.slug}` },
  ];

  return (
    // FIXED: Removed the "font.className" that caused the ReferenceError
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            fallbackLink={product.images[0]?.amazonLink}
          />

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4">
              {product.name}
            </h1>
            
            {/* Pink Branding for the USA Market */}
            <div className="mt-4">
              <div 
                className="text-black text-lg leading-relaxed whitespace-pre-wrap 
                           [&_h2]:text-[#db2777] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}