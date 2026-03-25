'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
  const [imgIndex, setImgIndex] = useState(0);

  // 1. Identify the 'og_image' as the sticky default
  const stickyImage = product.og_image;

  // 2. Identify a secondary image by finding the first image in the array 
  // that is not the 'og_image'
  const secondaryImage = product.images?.find((img: any) => img.url !== stickyImage) || product.images?.[0];

  // 3. Logic to toggle: 0 = Sticky (OG), 1 = Secondary
  const currentImageVisible = imgIndex === 0 ? stickyImage : secondaryImage?.url;

  // Construct image path and Alt text
  const imgSrc = `/images/${currentImageVisible?.replace(/^\//, '')}`;
  const currentAlt = product.images?.find((img: any) => img.url === currentImageVisible)?.alt || product.name;

  return (
    <div className="group flex flex-col">
      <Link 
        href={`/shop/product/${product.slug}`} 
        className="block"
        // 4. Trigger image swap on mouseover
        onMouseEnter={() => setImgIndex(1)}
        onMouseLeave={() => setImgIndex(0)}
      >
        <figure className="relative overflow-hidden rounded-2xl border border-pink-50 bg-gray-50 aspect-[2/3] w-full">
          <Image 
            src={imgSrc} 
            alt={currentAlt}
            fill
            className="object-contain transition-all duration-500 group-hover:scale-105"
            unoptimized 
          />
          <figcaption className="sr-only">
            {currentAlt}
          </figcaption>
        </figure>
        
        <div className="mt-4 px-2 text-center">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <div className="mt-2">
            <span className="text-pink-600 font-black text-xl">
              {product.price}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}