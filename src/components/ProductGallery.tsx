"use client"
import React from 'react'

export default function ProductGallery({ images, productName, isGroom }: any) {
  if (!images || images.length === 0) return <div className="p-10 bg-gray-100 rounded-2xl">No images found</div>;

  return (
    <div className="flex flex-col gap-8">
      {images.map((img: any, i: number) => {
        // This ensures the image is looked for in /public/images/products/
        const url = img.url.replace(/^\//, '');
        const src = `/images/products/${url}`;

        return (
          <div key={i} className="relative rounded-3xl overflow-hidden shadow-lg">
            <img 
              src={src} 
              alt={img.alt || productName} 
              className="w-full h-auto"
              onError={(e: any) => { e.target.src = 'https://via.placeholder.com/600?text=Image+Not+Found'; }}
            />
            {isGroom && img.amazonLink && (
              <a href={img.amazonLink} target="_blank" rel="noopener" 
                 className="block bg-[#db2777] text-white text-center py-2 text-xs font-bold uppercase">
                View on Amazon
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}