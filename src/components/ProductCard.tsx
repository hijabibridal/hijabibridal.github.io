'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  const [imgIndex, setImgIndex] = useState(0);
  
  // Check if a second image exists to enable hover functionality
  const hasSecondImage = product.images && product.images.length > 1;
  
  // Always default to index 0 (Primary/Sticky) unless actively hovering
  const currentImageData = product.images?.[imgIndex] || product.images?.[0];
  
  // Construct image path and handle potential leading slashes
  const imgSrc = `/images/${currentImageData?.url?.replace(/^\//, '')}`;
  const currentAlt = currentImageData?.alt || currentImageData?.figcaption || product.name;

  return (
    <div className="group flex flex-col">
      <Link 
        href={`/shop/product/${product.slug}`} 
        className="block"
        // Update index to 1 on hover if available; revert to 0 on leave
        onMouseEnter={() => hasSecondImage && setImgIndex(1)}
        onMouseLeave={() => setImgIndex(0)}
      >
        <figure className="relative overflow-hidden rounded-2xl border border-pink-50 bg-gray-50 aspect-[2/3] w-full">
          <Image 
            src={imgSrc} 
            alt={currentAlt}
            fill
            // Smooth transition during the image swap
            className="object-contain transition-all duration-500 group-hover:scale-105"
            unoptimized 
          />
          <figcaption className="sr-only">
            {currentImageData?.figcaption || product.name}
          </figcaption>
        </figure>
        
        <div className="mt-4 px-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-pink-600 font-black text-xl">
              {product.price || 'View Details'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}