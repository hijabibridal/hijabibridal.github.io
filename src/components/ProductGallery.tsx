'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, productName }: { images: any[], productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = images[activeIndex];

  return (
    <div className="flex flex-col">
      {/* Amazon Button - MOVED TO TOP OF GALLERY SECTION FOR MOBILE VISIBILITY */}
      <div className="mb-6 md:hidden">
         <a 
          href={currentImage?.amazon_link || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-[#FF9900] text-white text-center font-bold py-4 rounded-full shadow-lg"
        >
          Check Price on Amazon
        </a>
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden border bg-white shadow-inner">
        <Image
          src={`/images/${currentImage.url}`}
          alt={currentImage.alt || productName}
          fill
          className="object-contain p-4"
          unoptimized
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative h-20 w-20 flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all ${
              activeIndex === index ? 'border-pink-500 ring-2 ring-pink-200' : 'border-gray-200 hover:border-pink-300'
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

      {/* Amazon Link for Desktop (updates based on active image) */}
      <div className="mt-8 hidden md:block">
        <a 
          href={currentImage?.amazon_link || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-[#FF9900] hover:bg-[#e68a00] text-white font-bold py-4 px-12 rounded-full text-center shadow-md transition-all w-full"
        >
          Check Price on Amazon
        </a>
        <p className="text-xs text-gray-400 mt-3 text-center italic">
          * Price and availability linked to this specific item/color.
        </p>
      </div>
    </div>
  );
}