import Link from 'next/link';
import Image from 'next/image';
import productData from '@/data/bridal-products.json';

export default function HomePage() {
  const categories = productData.mainCategories;

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bridal.jpg" 
            alt="Hijabi Bridal Excellence"
            fill
            className="object-cover opacity-60"
            priority
            unoptimized
          />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
            Hijabi <span className="text-pink-500">Bridal</span>
          </h1>
          <p className="text-white text-lg md:text-2xl font-light tracking-[0.3em] uppercase mb-10">
            Premium USA Handcrafted Collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all transform hover:scale-105">
              Shop All
            </Link>
            <Link href="/about" className="bg-transparent border-2 border-white text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY ENTRY GRID */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-12 border-l-8 border-pink-600 pl-6">
          Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop/category/${cat.slug}`} className="group relative h-[400px] overflow-hidden bg-gray-100">
              <Image 
                src={`/images/categories/${cat.slug}.jpg`}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center border-2 border-white/0 group-hover:border-white/20 m-4 transition-all">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white text-center px-4">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}