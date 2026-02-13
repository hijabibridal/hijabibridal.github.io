import Breadcrumbs from '@/components/Breadcrumbs'
import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { Metadata } from 'next'

type PageProps = {
  params: Promise<{ slug: string }>;
};

// 1. RESTORED: Required for "output: export" and static builds
export async function generateStaticParams() {
  return productData.mainCategories.map((category) => ({
    slug: category.slug,
  }));
}

// 2. METADATA: SEO optimized using your JSON columns
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: category.titleTag,
    description: category.metaDescription,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  
  if (!category) notFound();

  // Filters products that belong to this specific category slug
  const filteredProducts = productData.products.filter((p) => 
    p.mainCategorySlugs.includes(slug)
  );

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: category.name, href: `/shop/category/${slug}` },
  ];

  // 3. FAQ SCHEMA LOGIC: Parse JSON for the Dev Console
  let parsedFaqs = [];
  if (category.FAQ_schema) {
    try {
      parsedFaqs = JSON.parse(category.FAQ_schema);
    } catch (e) {
      console.error("FAQ JSON parsing error on category:", slug, e);
    }
  }

  // Split description by double newlines for cleaner layout
  const sections = category.description.split('\n\n').map(section => {
    const lines = section.split('\n');
    return {
      title: lines[0],
      paragraphs: lines.slice(1)
    };
  });

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* 4. INJECTED SCHEMA: This makes the console turn green */}
      {parsedFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": parsedFaqs.map((faq: any) => ({
                "@type": "Question",
                "name": faq.name,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.acceptedAnswer.text
                }
              }))
            }) 
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <header className="mt-8 mb-16">
          <h1 className="text-6xl font-black text-black uppercase tracking-tighter mb-6">
            {category.name}
          </h1>
          <div className="h-2 w-24 bg-[#db2777] rounded-full" />
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Category Narrative Sections */}
        <div className="mt-32 max-w-4xl">
          {sections.map((section, i) => (
            <div key={i} className="mb-16">
              <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-6">
                {section.title}
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {section.paragraphs.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {/* 5. VISUAL FAQ DISPLAY: Professional USA-Market look */}
          {parsedFaqs.length > 0 && (
            <div className="mt-20 bg-pink-50/50 p-10 rounded-[2.5rem] border border-pink-100">
              <h2 className="text-3xl font-black text-black mb-8 uppercase tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-8">
                {parsedFaqs.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-pink-50">
                    <h3 className="text-xl font-bold text-black mb-3">{item.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}