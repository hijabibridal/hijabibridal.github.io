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

  const fullCaption = activeImage.figcaption || "";
  const firstPeriodIndex = fullCaption.indexOf('.');
  const firstSentence = firstPeriodIndex !== -1 ? fullCaption.substring(0, firstPeriodIndex + 1) : fullCaption;
  const remainingText = firstPeriodIndex !== -1 ? fullCaption.substring(firstPeriodIndex + 1).trim() : "";

  return (
    <div className="flex flex-col gap-6">
      <div 
        className="rounded-3xl overflow-hidden shadow-2xl border border-pink-50 bg-gray-50 relative w-full"
        style={{ height: '640px', maxHeight: '80vh' }} 
      >
        {/* Updated: <a> tag now conditionally handles the link and cursor based on activeLink presence */}
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
            className="w-full h-full object-contain p-6 transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          {/* Updated: Amazon overlay only shows if a valid link exists */}
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

      {fullCaption && (
        <figure className="mt-4 border-t border-pink-100 pt-4">
          <details className="cursor-pointer group" key={index}>
            <summary className="list-none text-[13px] text-gray-600 leading-relaxed italic border-l-2 border-pink-200 pl-4">
              {firstSentence} 
              <span className="inline-block ml-2 text-xs font-bold text-[#db2777] uppercase tracking-widest group-open:hidden">
                ... See More
              </span>
            </summary>
            {remainingText && (
              <figcaption className="mt-2 text-[13px] text-gray-600 leading-relaxed italic border-l-2 border-pink-200 pl-4">
                {remainingText}
              </figcaption>
            )}
          </details>
        </figure>
      )}
    </div>
  );
}