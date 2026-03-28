"use client"
import React, { useState } from 'react'

export default function ProductGallery({ images, productName, fallbackLink }: any) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return <div className="p-10 bg-gray-50 rounded-2xl">No Image</div>;

  const activeImage = images[index];
  const activeLink = (activeImage.amazonLink && activeImage.amazonLink !== "") 
    ? activeImage.amazonLink 
    : fallbackLink;

  const mainSrc = `/images/${activeImage.url.replace(/^\//, '')}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-3xl border border-pink-50 bg-gray-50 shadow-2xl">
        <a 
          href={activeLink || '#'} 
          onClick={(e) => !activeLink && e.preventDefault()}
          target={activeLink ? "_blank" : "_self"} 
          rel="noopener noreferrer" 
          className={`block w-full h-full group ${activeLink ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <img 
            src={mainSrc} 
            alt={activeImage.alt || productName} 
            className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
            // Removed "p-6" to match the card's full-bleed look
          />
          {activeLink && (
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full shadow-lg">
               <span className="text-black text-xs font-bold uppercase tracking-widest">Shop on Amazon</span>
            </div>
          )}
        </a>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {images.map((img: any, i: number) => {
          const thumbSrc = `/images/${img.url.replace(/^\//, '')}`;
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                index === i ? 'border-[#db2777] ring-4 ring-pink-50' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={thumbSrc} alt={img.alt || productName} className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>
    </div>
  );
}