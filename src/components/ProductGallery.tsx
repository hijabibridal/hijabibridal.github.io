"use client"
import React from 'react'

export default function ProductGallery({ images, productName }: any) {
  if (!images || images.length === 0) return <div className="p-10 bg-gray-50 rounded-2xl text-center">No images found</div>;

  return (
    <div className="flex flex-col gap-10">
      {images.map((img: any, i: number) => {
        const src = `/images/products/${img.url.replace(/^\//, '')}`;

        return (
          <div key={i} className="rounded-[2rem] overflow-hidden shadow-xl shadow-pink-50 border border-gray-100 bg-white">
            <img 
              src={src} 
              alt={img.alt || productName} // 4. DATA: Uses individual Alt Text per image
              className="w-full h-auto"
              onError={(e: any) => e.target.src = 'https://via.placeholder.com/800x1000?text=Image+Coming+Soon'}
            />
            {img.amazonLink && (
              <a 
                href={img.amazonLink} 
                target="_blank" 
                className="block bg-[#db2777] text-white text-center py-5 font-bold uppercase text-sm tracking-widest hover:bg-black transition-colors"
              >
                Shop this Item
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}