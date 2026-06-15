import Breadcrumbs from '@/components/Breadcrumbs'
import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'

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

// ─── Helper: slugify heading text for anchor IDs ──────────────────────────────
function toAnchor(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  
  if (!category) notFound();

  const COLOR_PRIORITY = ['pink', 'red', 'green'];
  const TYPE_PRIORITY = ['sharara', 'muslim-lehenga', 'muslim-wedding-dresses'];

  const filteredProducts = productData.products
    .filter((p) => p.mainCategorySlugs.includes(slug))
    .sort((a, b) => {
      const aNameRed = slug === 'red' && a.name.toLowerCase().includes('red');
      const bNameRed = slug === 'red' && b.name.toLowerCase().includes('red');
      if (aNameRed !== bNameRed) return aNameRed ? -1 : 1;const aColorMatch = COLOR_PRIORITY.findIndex(color => a.mainCategorySlugs.includes(color));
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

  const stylingTable = (category as any).stylingTable;

  // Build TOC entries from longContent headings (+ stylingTable if present)
  const tocEntries: { label: string; anchor: string }[] = [];
  if (stylingTable?.chartName) {
    tocEntries.push({ label: stylingTable.chartName, anchor: toAnchor(stylingTable.chartName) });
  }
  if (category.longContent) {
    (category.longContent as any[]).forEach((section: any) => {
      if (section.heading) {
        tocEntries.push({ label: section.heading, anchor: toAnchor(section.heading) });
      }
    });
  }
  if (parsedFaqs.length > 0) {
    tocEntries.push({ label: 'Frequently Asked Questions', anchor: 'faq' });
  }

  // Build schemas
  const imageSchema = category.imageUrl
    ? {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": `https://hijabibridal.github.io/images/${category.imageUrl}`,
        "url": `https://hijabibridal.github.io/images/${category.imageUrl}`,
        "name": category.imageAlt || category.name,
        "description": category.imageAlt || category.metaDescription,
        "representativeOfPage": true,
        ...(category.iptc ? { "digitalSourceType": category.iptc } : {}),
      }
    : null;

  const faqSchema = parsedFaqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": parsedFaqs,
      }
    : null;

  return (
    <div className="container mx-auto px-4 py-8">

      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
      )}

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
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

          {/* ── Table of Contents (category) ── */}
          {tocEntries.length > 0 && (
            <nav className="mb-16 border border-pink-100 rounded-2xl bg-pink-50/40 overflow-hidden">
              <div className="flex items-start gap-6 p-6">

                {/* TOC list */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold mb-3">
                    Scroll Down to Read
                  </p>
                  <ol className="space-y-1.5 list-none">
                    {tocEntries.map((entry, i) => (
                      <li key={i}>
                        <a
                          href={`#${entry.anchor}`}
                          className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors flex items-start gap-2"
                        >
                          <span className="text-pink-300 font-black shrink-0">{String(i + 1).padStart(2, '0')}</span>
                          <span>{entry.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </nav>
          )}

          {/* DECOUPLED DYNAMIC STYLING TABLE */}
          {stylingTable && (
            <div id={toAnchor(stylingTable.chartName)} className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">
                {stylingTable.chartName}
              </h2>
              
              <div className="overflow-x-auto rounded-[2rem] border border-pink-100 shadow-sm bg-white">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-pink-50/30">
                      <th className="p-6 border-b border-pink-100"></th>
                      <th colSpan={stylingTable.columns.length} className="p-4 border-b border-pink-100 text-center">
                        <span className="text-[#db2777] font-black uppercase tracking-widest text-sm block">
                          "{stylingTable.topEntity.label}"
                        </span>
                        <p className="text-[10px] text-gray-500 font-normal normal-case italic mt-1">
                          {stylingTable.topEntity.description}
                        </p>
                      </th>
                    </tr>
                    
                    <tr className="bg-white">
                      <th className="p-6 border-b border-pink-100 bg-pink-50/10 w-[220px]">
                        <span className="text-gray-900 font-black uppercase text-xs tracking-tighter">
                          "{stylingTable.leftEntity.label}"
                        </span>
                      </th>
                      {stylingTable.columns.map((colName: string) => (
                        <th key={colName} className="p-6 border-b border-pink-100 text-center">
                          <span className="text-gray-900 font-bold text-[10px] uppercase leading-tight block">
                            "{colName}"
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {Object.entries(stylingTable.rows).map(([rowName, allowedStyles]: [string, any], index: number) => (
                      <tr key={rowName} className="border-b border-pink-50 hover:bg-pink-50/5 transition-colors">
                        <td className="p-6 font-bold text-black border-r border-pink-50 bg-gray-50/30">
                          {rowName}
                        </td>
                        {stylingTable.columns.map((colName: string) => (
                          <td key={colName} className="p-6 text-center">
                            {allowedStyles.includes(colName) ? (
                              <span className="text-pink-500 font-bold text-xl">✓</span>
                            ) : (
                              <span className="text-gray-200">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {stylingTable.leftEntity.description && (
                      <tr className="bg-pink-50/10">
                         <td colSpan={stylingTable.columns.length + 1} className="p-4 text-center">
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">
                              <strong>"{stylingTable.leftEntity.label}":</strong> {stylingTable.leftEntity.description}
                            </p>
                         </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(category.longContent as any[]).map((section: any, index: number) => (
            <div key={index} id={toAnchor(section.heading)} className="mb-16">
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

          {/* FAQ */}
          {parsedFaqs.length > 0 && (
            <div id="faq" className="mt-20 bg-pink-50/50 p-10 rounded-[2.5rem] border border-pink-100">
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
            </div>
          )}
        </section>
      )}
    </div>
  );
}