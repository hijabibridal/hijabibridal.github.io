import productData from '@/data/bridal-products.json';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const metadata = {
  title: 'Shop Hijabi Bridal | Exclusive Muslim Wedding Dresses & Accessories',
  description: 'Discover our Amazon collection of Muslim bridal dresses and accessories. From timeless classics to modern silhouettes, find the perfect look for your special day.',
  openGraph: {
    title: 'Shop Hijabi Bridal | Exclusive Muslim Wedding Dresses',
    description: 'Browse our curated Amazon collection of Muslim bridal wear.',
  },
}

// Simple shuffle function to mix the products
function shuffle(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ShopPage() {
  const shuffledProducts = shuffle(productData.products);

  const colorSlugs = ['blue', 'pink', 'ivory', 'red', 'gold', 'silver', 'green', 'black', 'maroon', 'peach', 'white', 'champagne', 'nude'];
  
  const colorCategories = productData.mainCategories.filter(cat => 
    colorSlugs.includes(cat.slug)
  );
  
  const itemCategories = productData.mainCategories.filter(cat => 
    !colorSlugs.includes(cat.slug)
  );

  return (
    <div className="bg-white min-h-screen">
      <header className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">
            The <span className="text-pink-600">Boutique</span>
          </h1>
          <p className="mt-2 text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">
            {productData.products.length} Items Available
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16">
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-28 space-y-4">
            
            {/* ITEM TYPE DROPDOWN */}
            <details className="group border-b border-gray-100 pb-4" open>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">
                  Shop by Item
                </h3>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </summary>
              <ul className="mt-4 space-y-3 pl-2">
                {itemCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/shop/category/${cat.slug}`} className="text-sm font-bold text-gray-500 hover:text-pink-600 transition-all uppercase tracking-widest block">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            {/* COLOR DROPDOWN */}
            <details className="group border-b border-gray-100 pb-4">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">
                  Shop by Color
                </h3>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M19 9l-7 7-7-7"></path></svg>
                </span>
              </summary>
              <ul className="mt-4 space-y-3 pl-2">
                {colorCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/shop/category/${cat.slug}`} className="text-sm font-bold text-gray-500 hover:text-pink-600 transition-all uppercase tracking-widest block">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

          </div>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
            {shuffledProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}