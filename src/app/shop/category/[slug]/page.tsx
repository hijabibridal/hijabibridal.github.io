import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function CategoryPage() {
  // Find the category that has the FAQ schema (e.g., "Red Bridal Dresses")
  const categoryData = productData.categories.find(cat => cat.FAQ_schema);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Red Bridal Dresses', href: '/shop/red-bridal-dresses' },
  ];

  // Safely parse and build the Schema
  let faqSchema = null;
  if (categoryData?.FAQ_schema) {
    try {
      const faqs = JSON.parse(categoryData.FAQ_schema);
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: any) => ({
          "@type": "Question",
          "name": faq.name,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.acceptedAnswer.text
          }
        }))
      };
    } catch (e) {
      console.error("FAQ JSON parsing error:", e);
    }
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* INJECTED SCHEMA - This makes the console turn green */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <header className="mt-8 mb-12">
          <h1 className="text-5xl font-black text-black uppercase tracking-tighter mb-4">
            Red Bridal Dresses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Explore our curated collection of stunning red bridal attire, 
            symbolizing new beginnings and joy for your special day.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productData.products
            .filter(p => p.category === "red-bridal-dresses")
            .map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))
          }
        </div>

        {/* VISUAL FAQS AT BOTTOM */}
        {faqSchema && (
          <section className="mt-20 pt-12 border-t border-pink-100">
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-8">
              Expert Bridal Advice
            </h2>
            <div className="grid gap-6">
              {faqSchema.mainEntity.map((faq: any, i: number) => (
                <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-pink-50">
                  <h3 className="text-xl font-bold text-black mb-3">{faq.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}