"use client"
import React from 'react'

interface ImageItem {
  url: string;
  alt: string;
  amazonLink?: string;
}

interface GalleryProps {
  images: ImageItem[];
  productName: string;
  isGroom?: boolean;
}

export default function ProductGallery({ images, productName, isGroom }: GalleryProps) {
  if (!images || images.length === 0) {
    return <div className="p-10 bg-gray-100 rounded-3xl text-center text-gray-400">No images available</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {images.map((img, index) => {
        // IMAGE PATH FIX: Ensures it correctly targets /public/images/products/
        const cleanUrl = img.url.replace(/^\//, '');
        const imageSrc = `/images/products/${cleanUrl}`;

        const ImageMarkup = (
          <div className="relative overflow-hidden rounded-3xl shadow-xl border border-gray-100">
            <img 
              src={imageSrc} 
              alt={img.alt || `${productName} view ${index + 1}`} 
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x1000?text=Image+Not+Found";
              }}
            />
            {isGroom && img.amazonLink && (
              <div className="bg-[#db2777] text-white text-center py-3 text-xs font-black uppercase tracking-widest">
                View piece on Amazon
              </div>
            )}
          </div>
        );

        return (
          <div key={index}>
            {img.amazonLink ? (
              <a href={img.amazonLink} target="_blank" rel="noopener" className="block cursor-pointer">
                {ImageMarkup}
              </a>
            ) : (
              ImageMarkup
            )}
          </div>
        );
      })}
    </div>
  );
}