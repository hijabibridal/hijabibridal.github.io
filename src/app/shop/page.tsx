import productData from '@/data/bridal-products.json';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function ShopPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <header className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">
            The <span className="text-pink-600">Boutique</span>
          </h1>
          <p className="mt-2 text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">
            Viewing Entire Collection • {productData.products.length} Items
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16">
        {/* SIDEBAR */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-28">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 mb-8">
              Filter by Collection
            </h3>
            <ul className="space-y-6">
              {productData.mainCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/shop/category/${cat.slug}`} 
                    className="text-sm font-black text-gray-400 hover:text-pink-600 transition-all uppercase tracking-widest block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* FULL GRID */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
            {productData.products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}