"use client"
import React, { useState } from 'react'

export default function ProductGallery({ images, productName, fallbackLink }: any) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return <div className="p-10 bg-gray-50 rounded-2xl">No Image</div>;

  const activeImage = images[index];
  const activeLink = (activeImage.amazonLink && activeImage.amazonLink !== "") 
    ? activeImage.amazonLink 
    : fallbackLink;

  // Standard path for public/images/
  const mainSrc = `/images/${activeImage.url.replace(/^\//, '')}`;

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN IMAGE CONTAINER - Forced to 320px to match Category Cards */}
      <div 
        className="rounded-3xl overflow-hidden shadow-xl border border-pink-50 bg-gray-50 relative w-full"
        style={{ height: '320px' }} 
      >
        <a href={activeLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer group">
          <img 
            src={mainSrc} 
            alt={activeImage.alt || productName} 
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </a>
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img: any, i: number) => {
          const thumbSrc = `/images/${img.url.replace(/^\//, '')}`;
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                index === i 
                  ? 'border-[#db2777] shadow-md' 
                  : 'border-transparent opacity-60'
              }`}
            >
              <img 
                src={thumbSrc} 
                alt="thumbnail" 
                className="w-full h-full object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  );
}