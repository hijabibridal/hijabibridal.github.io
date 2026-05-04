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

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i => (i - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i => (i + 1) % images.length);
  };

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
          />
          {activeLink && (
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full shadow-lg">
               <span className="text-black text-xs font-bold uppercase tracking-widest">Shop on Amazon</span>
            </div>
          )}
        </a>

        {/* Prev / Next arrows — only render when there's more than one image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 flex items-center justify-center
                         bg-white/80 hover:bg-white
                         rounded-full shadow-md
                         transition-all duration-200 hover:scale-110
                         border border-pink-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-5 h-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 flex items-center justify-center
                         bg-white/80 hover:bg-white
                         rounded-full shadow-md
                         transition-all duration-200 hover:scale-110
                         border border-pink-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i); }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === index
                      ? 'w-5 h-2 bg-[#db2777]'
                      : 'w-2 h-2 bg-white/70 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
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