"use client"
import React, { useState } from 'react'

export default function ProductGallery({ images, productName, fallbackLink }: any) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return <div className="p-10 bg-gray-50 rounded-2xl">No Image</div>;

  const currentImage = images[activeIndex];
  
  // Use the image's specific link if it exists, otherwise use the product fallback
  const amazonLink = (currentImage.amazonLink && currentImage.amazonLink !== "") 
    ? currentImage.amazonLink 
    : fallbackLink;

  // Standard path for public/images/
  const mainSrc = `/images/${currentImage.url.replace(/^\//, '')}`;

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN IMAGE: Clickable to Amazon */}
      <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white relative group">
        <a href={amazonLink} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          <img 
            src={mainSrc} 
            alt={currentImage.alt || productName} 
            className="w-full h-auto transition-opacity hover:opacity-95"
          />
        </a>
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-5 gap-3">
        {images.map((img: any, i: number) => {
          const thumbSrc = `/images/${img.url.replace(/^\//, '')}`;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === i ? 'border-[#db2777]' : 'border-transparent opacity-60'
              }`}
            >
              <img src={thumbSrc} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>
    </div>
  );
}