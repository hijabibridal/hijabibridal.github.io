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

  // Define the style columns for the table
  const STYLES = [
    "over the head to the back",
    "freestyle",
    "accordioned over the shoulder",
    "over the arm"
  ];

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
            const hasH2 = product.description.includes('<h2');
            let introText = "";
            if (hasH2) {
              const splitIndex = product.description.indexOf('<h2');
              introText = product.description.substring(0, splitIndex);
            } else {
              const paragraphs = product.description.split(/<br\s*\/?>\s*<br\s*\/?>|\n\n/);
              introText = paragraphs[0];
            }
            const cleanDescriptionIntro = introText.replace(/<[^>]*>?/gm, '').trim();

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
                    <figcaption className="sr-only">
                      {cleanDescriptionIntro}
                    </figcaption>
                  </figure>
                  <h3 className="mt-4 text-center text-sm font-bold uppercase tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="sr-only" aria-hidden="true">
                  {product.images.slice(1).map((img: any, idx: number) => (
                    <Link key={idx} href={`/shop/product/${product.slug}`}>
                      <figure>
                        <img 
                          src={`/images/${img.url.replace(/^\//, '')}`} 
                          alt={img.alt || product.name} 
                        />
                        <figcaption>
                          {img.figcaption || img.alt || cleanDescriptionIntro}
                        </figcaption>
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

      {/* Long Content Section */}
      {category.longContent && (
        <section className="mt-24 max-w-4xl mx-auto border-t border-gray-100 pt-16">
          
          {/* DYNAMIC STYLING TABLE */}
          {(category as any).stylingTable && (
            <div className="overflow-x-auto my-12 rounded-[2rem] border border-pink-100 shadow-sm bg-white">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-pink-50/50">
                    <th className="p-6 border-b border-pink-100 w-1/4">
                      <span className="text-[#db2777] font-black uppercase tracking-widest text-sm block mb-2">
                        "Types of Dupattas"
                      </span>
                      <p className="text-xs text-gray-500 font-normal leading-tight normal-case">
                        The base fabric determines the weight, drape, and structural integrity.
                      </p>
                    </th>
                    {STYLES.map((style) => (
                      <th key={style} className="p-6 border-b border-pink-100 text-center">
                        <span className="text-[#db2777] font-bold text-xs uppercase block mb-1">"{style}"</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {Object.entries((category as any).stylingTable).map(([fabric, allowedStyles]: [string, any]) => (
                    <tr key={fabric} className="border-b border-pink-50">
                      <td className="p-6 bg-pink-50/20 font-bold text-black">{fabric}</td>
                      {STYLES.map((style) => (
                        <td key={style} className="p-6 text-center">
                          {allowedStyles.includes(style) ? (
                            <span className="text-pink-500 font-bold text-xl">✓</span>
                          ) : (
                            <span className="text-gray-200">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-pink-50/30 p-4 border-t border-pink-100">
                <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                  <strong>Note on "Double Dupatta Wearing Styles":</strong> Most US-based Muslim brides opt for a lighter "Net" dupatta as the primary head covering while using heavier fabrics for the body drape.
                </p>
              </div>
            </div>
          )}

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