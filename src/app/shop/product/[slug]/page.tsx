import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const fallbackLink = product.images.find(img => img.amazonLink && img.amazonLink !== "")?.amazonLink || "#";

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <Breadcrumbs 
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.name, href: `/shop/product/${product.slug}` },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <div>
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            fallbackLink={fallbackLink}
          />
        </div>

        <div className="flex flex-col">
          <h1 style={{ 
            color: '#db2777',
            fontWeight: 900, 
            textTransform: 'uppercase', 
            fontSize: '3rem', 
            lineHeight: '1',
            letterSpacing: '-0.05em',
            marginBottom: '1rem' 
          }}>
            {product.name}
          </h1>

          {!isGroom && (
            <a 
              href={fallbackLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-6"
            >
              Purchase on Amazon.com
            </a>
          )}

          <div className="mt-4">
            {/* This is the critical fix. 
                dangerouslySetInnerHTML allows the <br />, <a>, and <h2> tags 
                we added in the Python script to actually work.
            */}
            <div 
              className="text-black text-lg leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}