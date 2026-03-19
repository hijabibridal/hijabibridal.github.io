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
        {/* Aspect ratio 4/5 provides a tall portrait look that won't cut off heads or feet */}
        <figure className="relative overflow-hidden rounded-2xl border border-pink-50 bg-gray-50 aspect-[4/5] w-full">
          <Image 
            src={imgSrc} 
            alt={currentAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized 
          />
        </figure>
        
        <h3 className="mt-4 text-center text-sm font-bold uppercase tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>
      </Link>
    </div>
  );
}