'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import productData from '@/data/bridal-products.json';
import { useCart } from '@/context/CartContext';

// ASSUMPTION FLAGGED: path follows the same /images/halal-nails/attachments/
// pattern as your other product images — double-check this matches your
// actual /public/images folder.
const PROMO_IMAGE = '/images/halal-nails/attachments/berries-halal-nails-five.png';
const PROMO_LINK = 'https://hijabibridal.github.io/shop/category/halal-nails';

function CartIcon() {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" className="relative inline-flex items-center" aria-label="Cart">
      <svg className="w-7 h-7 text-gray-800 hover:text-pink-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

function PromoBanner({ compact = false }: { compact?: boolean }) {
  return (
    <Link href={PROMO_LINK} className="flex items-center gap-3 group">
      <div className={`relative shrink-0 rounded-lg overflow-hidden ${compact ? 'w-12 h-12' : 'w-16 h-16'}`}>
        <Image src={PROMO_IMAGE} alt="Halal Nails" fill className="object-cover" />
      </div>
      <span className="font-black text-pink-600 uppercase tracking-tight group-hover:underline">
        Halal Nails here
      </span>
    </Link>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const colors = [
    'blue', 'champagne', 'fuschia', 'gold', 'green', 
    'lilac', 'peach', 'pink', 'red', 'silver', 'white'
  ];

  const colorCollections = productData.mainCategories.filter(c => 
    colors.includes(c.slug)
  );
  
  const itemCollections = productData.mainCategories.filter(c => 
    !colors.includes(c.slug)
  );

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Mobile Hamburger */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-pink-600 focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m4 6h16"} />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
            Hijabi <span className="text-pink-600">Bridal</span>
          </span>
        </Link>

        {/* Desktop Nav with Mega-Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="group relative py-4">
            <Link 
              href="/shop" 
              className="text-gray-800 hover:text-pink-600 font-black uppercase tracking-tight flex items-center"
            >
              Shop
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* MEGA MENU PANEL */}
            <div className="absolute left-0 top-full hidden group-hover:block w-[450px] bg-white border border-pink-50 shadow-xl rounded-b-2xl p-8 z-50">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="text-pink-600 font-black text-[11px] uppercase mb-4 tracking-widest border-b border-pink-50 pb-1">
                    By Color
                  </p>
                  <div className="space-y-2">
                    {colorCollections.map(c => (
                      <Link 
                        key={c.slug} 
                        href={`/shop/category/${c.slug}`} 
                        className="block text-sm font-bold text-gray-700 hover:text-pink-600 transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-pink-600 font-black text-[11px] uppercase mb-4 tracking-widest border-b border-pink-50 pb-1">
                    By Item
                  </p>
                  <div className="space-y-2">
                    {itemCollections.map(c => (
                      <Link 
                        key={c.slug} 
                        href={`/shop/category/${c.slug}`} 
                        className="block text-sm font-bold text-gray-700 hover:text-pink-600 transition-colors"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/blog" className="text-gray-800 hover:text-pink-600 font-black uppercase tracking-tight">Bride and Groom Guide</Link>
          <Link href="/about" className="text-gray-800 hover:text-pink-600 font-black uppercase tracking-tight">About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <PromoBanner compact />
          <div className="w-64">
            <SearchBar />
          </div>
          <CartIcon />
        </div>

        {/* Mobile cart icon — always visible next to hamburger */}
        <div className="md:hidden">
          <CartIcon />
        </div>
      </div>

      {/* Mobile Search Bar + Promo Banner — always visible below logo row */}
      <div className="md:hidden px-4 pb-3 flex items-center gap-3">
        <div className="flex-1">
          <SearchBar />
        </div>
        <PromoBanner compact />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-pink-50 p-6 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-pink-600 font-black text-[10px] uppercase mb-2">By Color</p>
                {colorCollections.map(c => (
                  <Link 
                    key={c.slug} 
                    href={`/shop/category/${c.slug}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-1 text-sm font-bold text-gray-700"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <div>
                <p className="text-pink-600 font-black text-[10px] uppercase mb-2">By Item</p>
                {itemCollections.map(c => (
                  <Link 
                    key={c.slug} 
                    href={`/shop/category/${c.slug}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-1 text-sm font-bold text-gray-700"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
           </div>

           <div className="space-y-4 border-t pt-4">
            <Link 
              href="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-black text-gray-800 hover:text-pink-600 uppercase"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-black text-gray-800 hover:text-pink-600 uppercase"
            >
              About
            </Link>
           </div>
        </div>
      )}
    </header>
  );
}