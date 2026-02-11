"use client"
import React from 'react'

export default function ProductGallery({ images, productName, isGroom }: any) {
  if (!images || images.length === 0) return <div className="p-10 bg-gray-50 rounded-2xl">No Image</div>;

  return (
    <div className="flex flex-col gap-8">
      {images.map((img: any, i: number) => {
        // This ensures the image is ALWAYS found in /public/images/products/
        const src = `/images/products/${img.url.replace(/^\//, '')}`;

        return (
          <div key={i} className="rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <img 
              src={src} 
              alt={img.alt || productName} 
              className="w-full h-auto"
              onError={(e: any) => e.target.src = 'https://via.placeholder.com/600?text=Image+Missing'}
            />
            {isGroom && img.amazonLink && (
              <a href={img.amazonLink} target="_blank" className="block bg-[#db2777] text-white text-center py-3 font-bold uppercase text-xs">
                View on Amazon
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}