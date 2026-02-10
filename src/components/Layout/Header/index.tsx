'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import productData from '@/data/bridal-products.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Grouping categories for the dropdowns
  const colorCollections = productData.mainCategories.filter(c => 
    ['blue', 'green', 'maroon', 'pink', 'red', 'white'].includes(c.slug)
  );
  const itemCollections = productData.mainCategories.filter(c => 
    !['blue', 'green', 'maroon', 'pink', 'red', 'white'].includes(c.slug)
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-pink-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Hamburger (Mobile Only) */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-pink-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-pink-600 tracking-tighter">
          HIJABI BRIDAL
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <div className="group relative py-4">
            <button className="text-gray-700 hover:text-pink-600 font-bold flex items-center">
              SHOP <span className="ml-1 text-xs">▼</span>
            </button>
            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 hidden group-hover:flex bg-white shadow-xl border border-pink-50 p-6 w-[450px] rounded-b-xl grid-cols-2 gap-8">
              <div>
                <p className="text-pink-600 font-black text-xs uppercase tracking-widest mb-3">Color Collections</p>
                {colorCollections.map(c => (
                  <Link key={c.slug} href={`/shop/category/${c.slug}`} className="block py-1 text-sm text-gray-600 hover:text-pink-500">{c.name}</Link>
                ))}
              </div>
              <div>
                <p className="text-pink-600 font-black text-xs uppercase tracking-widest mb-3">Item Collections</p>
                {itemCollections.map(c => (
                  <Link key={c.slug} href={`/shop/category/${c.slug}`} className="block py-1 text-sm text-gray-600 hover:text-pink-500">{c.name}</Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/blog" className="text-gray-700 hover:text-pink-600 font-bold">BRIDE & GROOM GUIDE</Link>
          <Link href="/faq" className="text-gray-700 hover:text-pink-600 font-bold">FAQ</Link>
        </nav>

        <div className="hidden md:block w-64"><SearchBar /></div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-pink-50 p-4 space-y-4 font-bold">
           <Link href="/shop" className="block text-pink-600">ALL SHOP</Link>
           <div className="pl-4 space-y-2">
              <p className="text-[10px] text-gray-400 uppercase">Colors</p>
              {colorCollections.slice(0, 4).map(c => <Link key={c.slug} href={`/shop/category/${c.slug}`} className="block text-sm">{c.name}</Link>)}
           </div>
           <Link href="/blog" className="block">GUIDE</Link>
        </div>
      )}
    </header>
  );
}