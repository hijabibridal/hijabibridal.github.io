'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  const [imgIndex, setImgIndex] = useState(0);
  const hasSecondImage = product.images && product.images.length > 1;
  
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
        {/* 1. aspect-[2/3] or [3/4] is best for full-length bridal wear. 
          2. object-contain ensures the TOP and BOTTOM are never cut off.
          3. We removed the 'p-6' padding so the image stays large.
        */}
        <figure className="relative overflow-hidden rounded-2xl border border-pink-50 bg-gray-50 aspect-[2/3] w-full">
          <Image 
            src={imgSrc} 
            alt={currentAlt}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            unoptimized 
          />
          <figcaption className="sr-only">
            {currentImageData?.figcaption || product.name}
          </figcaption>
        </figure>
        
        <h3 className="mt-4 text-center text-sm font-bold uppercase tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
      </Link>
    </div>
  );
}