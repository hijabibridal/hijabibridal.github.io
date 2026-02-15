import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ 
    slug: p.slug 
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) return {};

  const siteUrl = "https://hijabibridal.github.io"; 
  const ogImageUrl = `${siteUrl}/images/${product.og_image}`;

  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
    openGraph: {
      title: product.og_title || product.name,
      description: product.meta_description,
      url: `${siteUrl}/shop/product/${product.slug}`,
      siteName: "Hijabi Bridal",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: product.name, href: `/shop/product/${product.slug}` },
  ];

  // Safely parse FAQs or default to empty array
  const faqs = product.FAQ_schema ? JSON.parse(product.FAQ_schema) : [];

  return (
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
            
            {product.images.find((img: any) => img.amazonLink)?.amazonLink && (
              <a 
                href={product.images.find((img: any) => img.amazonLink).amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-6"
              >
                Purchase on Amazon.com
              </a>
            )}

            <div className="mt-4">
              <div 
                className="text-black text-lg leading-relaxed whitespace-pre-wrap 
                           [&_h2]:text-[#db2777] [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {faqs.length > 0 && (
              <div className="mt-12 border-t border-pink-100 pt-8">
                <h2 className="text-[#db2777] font-black text-3xl uppercase tracking-tighter mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq: any, index: number) => (
                    <div key={index} className="bg-pink-50/30 p-6 rounded-2xl">
                      <h3 className="text-black font-bold text-xl mb-2">
                        {faq.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.acceptedAnswer.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}