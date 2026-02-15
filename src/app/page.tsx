import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[100vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-bridal.jpg" 
            alt="Hijabi Bridal"
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
          <p className="text-white text-lg md:text-2xl font-light tracking-[0.4em] uppercase mb-10">
            Premium Collections
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
    </div>
  );
}