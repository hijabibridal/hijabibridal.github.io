import productData from '@/data/bridal-products.json'
import blogData from '@/data/blog-articles.json'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PatternSelector from '@/components/PatternSelector';
import Script from 'next/script'; // Added this for Tally

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
    metadataBase: new URL("https://hijabibridal.github.io"), 
    title: product.title_tag || product.name,
    description: product.meta_description,
    openGraph: {
      title: product.og_title || product.name,
      description: product.meta_description,
      url: `${siteUrl}/shop/product/${product.slug}`,
      siteName: "Hijabi Bridal",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.og_title || product.name,
      description: product.meta_description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${siteUrl}/shop/product/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = productData.products
    .filter((p) => p.color === product.color && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      {/* Tally Logic for Server Components */}
      {product.description.includes('AI-visualized') && (
        <>
          <Script id="tally-config" strategy="afterInteractive">
            {`
              window.TallyConfig = {
                "formId": "Medqak",
                "popup": {
                  "emoji": { "text": "👋", "animation": "wave" },
                  "open": { "trigger": "time", "ms": 30000 },
                  "layout": "modal",
                  "showOnce": true,
                  "doNotShowAfterSubmit": true,
                  "formEventsForwarding": true
                }
              };
            `}
          </Script>
          <Script 
            src="https://tally.so/widgets/embed.js" 
            strategy="afterInteractive" 
          />
        </>
      )}

      <div className="bg-white min-h-screen text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            
            {/* Left: Product Images */}
            <div className="space-y-4">
               <ProductGallery images={product.images} />
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                  <li><Link href="/" className="hover:text-[#db2777]">Home</Link></li>
                  <li><span className="mx-2">/</span></li>
                  <li><Link href="/shop" className="hover:text-[#db2777]">Shop</Link></li>
                  <li><span className="mx-2">/</span></li>
                  <li className="font-medium text-gray-900 truncate">{product.name}</li>
                </ol>
              </nav>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tighter uppercase mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-8">
                <div className="flex text-pink-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">(Over 142 reviews)</span>
              </div>

              <div 
                className="prose prose-pink prose-lg text-gray-600 mb-10 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <div className="space-y-8 mb-10">
                <PatternSelector product={product} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="flex-1 bg-[#db2777] text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-pink-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-200">
                  Consult for custom order
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>USA Shipping</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <span>Custom Fit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Content for SEO (The "Deep Dive") */}
          <div className="mt-20 border-t border-gray-100 pt-16">
            <div className="max-w-3xl mx-auto">
               {/* This is where your 1500 word text would be injected or mapped */}
            </div>
          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 border-t border-pink-100 pt-12">
              <h3 className="text-black font-bold text-2xl uppercase tracking-wider mb-8">
                More in this Color
              </h3>
              <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar">
                {relatedProducts.map((rp) => (
                  <Link 
                    key={rp.slug} 
                    href={`/shop/product/${rp.slug}`}
                    className="flex-shrink-0 w-48 group"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src={`/images/${rp.images[0].url}`}
                        alt={rp.name}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#db2777]">
                      {rp.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}