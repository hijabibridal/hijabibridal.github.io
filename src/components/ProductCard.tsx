'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  // 1. Internal state for hover
  const [imgIndex, setImgIndex] = useState(0);
  const hasSecondImage = product.images && product.images.length > 1;
  
  // 2. Internal logic for image path and SEO
  const currentImageData = product.images?.[imgIndex] || product.images?.[0];
  const imgSrc = `/images/${currentImageData?.url?.replace(/^\//, '')}`;
  const currentAlt = currentImageData?.alt || currentImageData?.figcaption || product.name;

  return (
    <div className="group flex flex-col">
      <Link 
        href={`/shop/product/${product.slug}`} 
        className="block"
        onMouseEnter={() => hasSecondImage && setImgIndex(1)}
        onMouseLeave={() => setImgIndex(0)}
      >
        {/* FIGURE: This keeps your original size and shape */}
        <figure className="relative overflow-hidden rounded-2xl border border-pink-50 bg-gray-50 aspect-[4/5] w-full">
          <Image 
            src={imgSrc} 
            alt={currentAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized 
          />
        </figure>
        
        {/* TEXT: This keeps your original styling */}
        <h3 className="mt-4 text-center text-sm font-bold uppercase tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
      </Link>
    </div>
  );
}