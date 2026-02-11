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

  // FALLBACK LINK: If an image has no link, find the first available one in the list
  const fallbackLink = product.images.find(img => img.amazonLink && img.amazonLink !== "")?.amazonLink || "#";

  // FULL DESCRIPTION: We split by newline and filter out empty strings
  // This ensures the FIRST half and SECOND half are both kept.
  const paragraphs = product.description
    .replace(/<[^>]*>/g, ' ') // Strip any residual HTML tags safely
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

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
          {/* Gallery handles the images and the fallback Amazon links */}
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
            fallbackLink={fallbackLink}
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <div className="mt-4 space-y-6">
            {paragraphs.map((text, i) => {
              const lowerText = text.toLowerCase();
              
              // 1. HEADER: Pink and Bold (No Caps)
              if (lowerText.startsWith('how to wear')) {
                return (
                  <h2 key={i} className="text-[#db2777] text-2xl font-bold mt-8">
                    {text}
                  </h2>
                );
              }

              // 2. Filter out raw URL strings from the display
              if (text.includes('amzn.to') || text.includes('http')) return null;

              // 3. BODY TEXT: Forced Plain Black
              return (
                <p key={i} className="text-black text-lg leading-relaxed">
                  {text}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}