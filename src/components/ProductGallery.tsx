'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, productName }: { images: any[], productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = images[activeIndex];

  return (
    <div className="flex flex-col">
      {/* Main Image View */}
      {/* Note: The parent link in page.tsx will handle the Amazon redirect for this main image only */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-pink-50 bg-white shadow-sm cursor-pointer">
        <Image
          src={`/images/${currentImage.url}`}
          alt={currentImage.alt || productName}
          fill
          className="object-contain p-4"
          unoptimized
          priority
        />
      </div>

      {/* Thumbnails Section */}
      <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              // This ensures clicking the thumbnail DOES NOT trigger 
              // the parent <a> link to Amazon on page.tsx
              e.preventDefault();
              e.stopPropagation();
              setActiveIndex(index);
            }}
            className={`relative h-20 w-20 flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all cursor-pointer ${
              activeIndex === index 
                ? 'border-pink-600 shadow-md' 
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <Image
              src={`/images/${img.url}`}
              alt={img.alt || `Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Helper text for the bride */}
      <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-widest text-center">
        Click main image to view on Amazon
      </p>
    </div>
  );
}