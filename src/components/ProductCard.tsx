'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  // Track which image to show (0 = first, 1 = second on hover)
  const [imgIndex, setImgIndex] = useState(0);

  const hasSecondImage = product.images && product.images.length > 1;
  
  // Target the specific image object based on hover state
  const currentImageData = product.images?.[imgIndex] || product.images?.[0];
  
  // Construct path and handle the lowercase keys: 'alt' and 'figcaption'
  const imgSrc = `/images/${currentImageData?.url?.replace(/^\//, '')}`;
  
  // We combine the alt and figcaption into the Image 'alt' prop.
  // This "passes" the data to the page source for SEO/Screen Readers 
  // without displaying any text on the UI.
  const currentAlt = currentImageData?.alt || currentImageData?.figcaption || product.name;

  return (
    <Link 
      href={`/shop/product/${product.slug}`} 
      className="group block bg-white rounded-2xl border border-pink-50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => hasSecondImage && setImgIndex(1)}
      onMouseLeave={() => setImgIndex(0)}
    >
      {/* Image Container */}
      <div className="relative h-80 w-full bg-gray-50 overflow-hidden">
        <Image 
          src={imgSrc} 
          alt={currentAlt}
          fill
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out"
          unoptimized 
        />
        
        {/* Subtle Pink Gradient Overlay (Visual only, no text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Info */}
      <div className="p-6 bg-white">
        <h3 className="text-xl font-black text-black uppercase tracking-tighter line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mt-6 flex items-center justify-between">
          <p className="text-[#db2777] font-bold text-xs uppercase tracking-[0.2em]">
            View Details
          </p>
          <svg 
            className="w-5 h-5 text-[#db2777] transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}