import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return productData.products.map((product) => ({
    slug: product.slug,
  }));
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={product.name} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* LEFT COLUMN: IMAGES */}
        <div>
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border bg-white">
            {product.images?.[0] && (
              <Image
                src={`/images/products/${product.images[0].url}`}
                alt={product.images[0].alt || product.name}
                fill
                className="object-contain"
                unoptimized
                priority
              />
            )}
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
            {product.images?.map((img, index) => (
              <div key={index} className="relative h-24 w-24 flex-shrink-0 border rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={`/images/products/${img.url}`}
                  alt={img.alt || `${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-6 prose text-gray-700">
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Amazon Button */}
          <div className="mt-10">
            <a 
              href={product.images[0]?.amazonLink || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-center shadow-md transition-all w-full md:w-auto"
            >
              Check Price on Amazon
            </a>
            <p className="text-xs text-gray-500 mt-2 text-center md:text-left">
              * As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}