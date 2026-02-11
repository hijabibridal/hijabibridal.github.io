'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import productData from '@/data/bridal-products.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // FULL LIST OF COLORS FROM YOUR JSON
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-pink-600 tracking-tighter">
          HIJABI BRIDAL
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          <div className="group relative py-4">
            <button className="text-gray-800 hover:text-pink-600 font-black flex items-center uppercase tracking-tight">
              Shop <span className="ml-1 text-[10px] text-pink-500">▼</span>
            </button>
            {/* Mega Dropdown */}
            <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-2xl border border-pink-50 p-8 w-[600px] rounded-b-2xl grid grid-cols-2 gap-10">
              <div>
                <p className="text-pink-600 font-black text-[11px] uppercase tracking-[0.2em] mb-4 border-b border-pink-50 pb-2">Color Collections</p>
                <div className="grid grid-cols-2 gap-x-4">
                  {colorCollections.map(c => (
                    <Link key={c.slug} href={`/shop/category/${c.slug}`} className="block py-1.5 text-sm text-gray-600 hover:text-pink-500 transition-colors font-medium lowercase first-letter:uppercase">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-pink-600 font-black text-[11px] uppercase tracking-[0.2em] mb-4 border-b border-pink-50 pb-2">Item Collections</p>
                <div className="grid grid-cols-1">
                  {itemCollections.map(c => (
                    <Link key={c.slug} href={`/shop/category/${c.slug}`} className="block py-1.5 text-sm text-gray-600 hover:text-pink-500 transition-colors font-medium">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link href="/blog" className="text-gray-800 hover:text-pink-600 font-black uppercase tracking-tight">Bride & Groom Guide</Link>
          <Link href="/faq" className="text-gray-800 hover:text-pink-600 font-black uppercase tracking-tight">FAQ</Link>
        </nav>

        <div className="hidden md:block w-64">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-pink-50 p-6 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-pink-600 font-black text-[10px] uppercase mb-2">By Color</p>
                {colorCollections.slice(0, 8).map(c => <Link key={c.slug} href={`/shop/category/${c.slug}`} className="block py-1 text-sm font-bold text-gray-700">{c.name}</Link>)}
              </div>
              <div>
                <p className="text-pink-600 font-black text-[10px] uppercase mb-2">By Item</p>
                {itemCollections.slice(0, 8).map(c => <Link key={c.slug} href={`/shop/category/${c.slug}`} className="block py-1 text-sm font-bold text-gray-700">{c.name}</Link>)}
              </div>
           </div>
           <Link href="/blog" className="block text-lg font-black text-gray-800 border-t pt-4">GUIDE</Link>
        </div>
      )}
    </header>
  );
}