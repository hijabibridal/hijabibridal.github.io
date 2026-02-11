"use client"
import React, { useState } from 'react'

export default function ProductGallery({ images, productName }: any) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return <div className="p-10 bg-gray-50 rounded-2xl text-center">No Image</div>;

  const currentImage = images[activeIndex];
  const mainSrc = `/images/products/${currentImage.url.replace(/^\//, '')}`;
  const amazonLink = currentImage.amazonLink || "#";

  return (
    <div className="flex flex-col gap-6">
      {/* MAIN IMAGE: Clickable link to Amazon page */}
      <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white relative group">
        <a href={amazonLink} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
          <img 
            src={mainSrc} 
            alt={currentImage.alt || productName} 
            className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <span className="bg-white/90 text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Shop on Amazon
            </span>
          </div>
        </a>
      </div>

      {/* THUMBNAILS: Grid display under main image */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {images.map((img: any, i: number) => {
          const thumbSrc = `/images/products/${img.url.replace(/^\//, '')}`;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === i 
                  ? 'border-[#db2777] ring-2 ring-pink-100' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img 
                src={thumbSrc} 
                alt={`View ${i + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}