"use client"
import React from 'react'

interface ProductGalleryProps {
  images: Array<{ url: string; alt: string; amazonLink?: string }>;
  productName: string;
  isGroom?: boolean;
}

export default function ProductGallery({ images, productName, isGroom }: ProductGalleryProps) {
  if (!images || images.length === 0) return <div className="bg-gray-100 aspect-square rounded-2xl flex items-center justify-center">No Image Available</div>;

  return (
    <div className="flex flex-col gap-6">
      {images.map((img, index) => {
        // IMPORTANT: Ensure the URL starts with /images/products/
        const imageSrc = img.url.startsWith('http') 
          ? img.url 
          : `/images/products/${img.url.replace(/^\//, '')}`;

        const Content = (
          <div className="relative group overflow-hidden rounded-2xl shadow-md border border-gray-100">
            <img 
              src={imageSrc} 
              alt={img.alt || `${productName} - view ${index + 1}`} 
              className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />
            {isGroom && img.amazonLink && (
              <div className="absolute bottom-0 left-0 right-0 bg-pink-600/90 text-white py-2 text-center text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                View this piece on Amazon
              </div>
            )}
          </div>
        );

        // For Grooms, each image is its own link. For Bridal, the whole gallery is usually wrapped in a link in page.tsx
        if (isGroom && img.amazonLink) {
          return (
            <a key={index} href={img.amazonLink} target="_blank" rel="noopener" className="cursor-pointer">
              {Content}
            </a>
          );
        }

        return <div key={index}>{Content}</div>;
      })}
    </div>
  );
}