import Breadcrumbs from '@/components/Breadcrumbs'
import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return productData.mainCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: category.titleTag,
    description: category.metaDescription,
    openGraph: {
      title: category.titleTag,
      description: category.metaDescription,
      images: [
        {
          url: category.imageUrl || '/images/default-share.jpg',
          width: 1200,
          height: 630,
          alt: category.imageAlt || category.name,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  
  if (!category) notFound();

  const COLOR_PRIORITY = ['white', 'red', 'champagne'];
  const TYPE_PRIORITY = ['sharara', 'muslim-lehenga', 'muslim-wedding-dresses'];

  const filteredProducts = productData.products
    .filter((p) => p.mainCategorySlugs.includes(slug))
    .sort((a, b) => {
      const aColorMatch = COLOR_PRIORITY.findIndex(color => a.mainCategorySlugs.includes(color));
      const bColorMatch = COLOR_PRIORITY.findIndex(color => b.mainCategorySlugs.includes(color));
      if (aColorMatch !== bColorMatch) {
        if (aColorMatch !== -1 && bColorMatch !== -1) return aColorMatch - bColorMatch;
        if (aColorMatch !== -1) return -1;
        if (bColorMatch !== -1) return 1;
      }
      const aTypeMatch = TYPE_PRIORITY.findIndex(type => a.mainCategorySlugs.includes(type));
      const bTypeMatch = TYPE_PRIORITY.findIndex(type => b.mainCategorySlugs.includes(type));
      if (aTypeMatch !== bTypeMatch) {
        if (aTypeMatch !== -1 && bTypeMatch !== -1) return aTypeMatch - bTypeMatch;
        if (aTypeMatch !== -1) return -1;
        if (bTypeMatch !== -1) return 1;
      }
      return 0;
    });

  const descriptionLines = category.description.split('\n').filter(line => line.trim() !== '');
  const boldIntroTitle = descriptionLines[0];
  const regularParagraphs = descriptionLines.slice(1);

  let parsedFaqs = [];
  if (category.FAQ_schema) {
    try {
      parsedFaqs = JSON.parse(category.FAQ_schema);
    } catch (e) {
      console.error("FAQ Parsing Error:", e);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={category.name} 
      />
      
      <div className="max-w-4xl mb-12">
        <h1 className="text-5xl font-black text-gray-900 mt-8 mb-6 uppercase tracking-tighter">
          {category.name} <span className="text-pink-600">Collection</span>
        </h1>

        <div className="relative mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-600 rounded-full"></div>
          <p className="text-xl text-gray-700 leading-relaxed pl-8 font-bold italic">
            {boldIntroTitle}
          </p>
        </div>

        {regularParagraphs.map((para, i) => (
          <p key={i} className="text-lg text-gray-600 leading-relaxed mt-4">
            {para}
          </p>
        ))}
      </div>

      <hr className="mb-12 border-pink-100" />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => {
            
            // EXACT MATCH TO PRODUCT PAGE LOGIC
            const hasH2 = product.description.includes('<h2');
            let introText = "";
            if (hasH2) {
              const splitIndex = product.description.indexOf('<h2');
              introText = product.description.substring(0, splitIndex);
            } else {
              const paragraphs = product.description.split(/<br\s*\/?>\s*<br\s*\/?>|\n\n/);
              introText = paragraphs[0];
            }
            // Strip HTML and trim whitespace
            const cleanCaption = introText.replace(/<[^>]*>?/gm, '').trim();

            return (
              <div key={product.slug} className="group flex flex-col">
                <Link href={`/shop/product/${product.slug}`} className="block">
                  <figure className="relative overflow-hidden rounded-2xl border border-pink-50 bg-gray-50">
                    <div className="relative h-[450px] w-full p-4"> 
                      <Image 
                        src={`/images/${product.images[0].url.replace(/^\//, '')}`} 
                        alt={product.images[0].alt || product.name}
                        fill 
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                    {/* INVISIBLE CAPTION: Product name removed as requested */}
                    <figcaption className="sr-only">
                      {cleanCaption}
                    </figcaption>
                  </figure>
                  <h3 className="mt-4 text-center text-sm font-bold uppercase tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* INVISIBLE SECONDARY GALLERY */}
                <div className="sr-only" aria-hidden="true">
                  {product.images.slice(1).map((img, idx) => (
                    <Link key={idx} href={`/shop/product/${product.slug}`}>
                      <figure>
                        <img 
                          src={`/images/${img.url.replace(/^\//, '')}`} 
                          alt={img.alt || `${product.name} - view ${idx + 2}`} 
                        />
                        {/* Secondary Invisible Caption: Prefix removed here too */}
                        <figcaption>{img.alt || cleanCaption}</figcaption>
                      </figure>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg font-medium">
            Coming soon! We are currently curating the finest {category.name} pieces.
          </p>
        </div>
      )}

      {category.longContent && (
        <section className="mt-24 max-w-4xl mx-auto border-t border-gray-100 pt-16">
          {category.longContent.map((section: any, index: number) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                {section.heading}
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                {section.paragraphs.map((p: string, pi: number) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {parsedFaqs.length > 0 && (
            <div className="mt-20 bg-pink-50/50 p-10 rounded-[2.5rem] border border-pink-100">
              <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-8">
                {parsedFaqs.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ 
                  __html: JSON.stringify([
                    {
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": parsedFaqs
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "ImageObject",
                      "contentUrl": category.imageUrl,
                      "description": category.imageAlt,
                      "digitalSourceType": category.iptc
                    }
                  ]) 
                }}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}