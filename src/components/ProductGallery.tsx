"use client"
import React from 'react'

interface ProductGalleryProps {
  images: Array<{ url: string; alt: string; amazonLink?: string }>;
  productName: string;
  isGroom?: boolean;
}

export default function ProductGallery({ images, productName, isGroom }: ProductGalleryProps) {
  // Use your preferred slider library logic here (Swiper, Keen, etc.)
  // The key is to wrap the slide in the amazonLink if it exists
  return (
    <div className="space-y-4">
      {images.map((img, index) => (
        <div key={index} className="overflow-hidden rounded-3xl shadow-xl">
          {/* If it's a groom product, each image links to its specific Amazon URL */}
          {isGroom && img.amazonLink ? (
            <a href={img.amazonLink} target="_blank" rel="noopener" className="block hover:opacity-90 transition-opacity">
               <img src={`/images/products/${img.url}`} alt={img.alt || productName} className="w-full h-auto" />
               <div className="bg-pink-600 text-white text-center py-2 text-xs font-bold uppercase tracking-widest">
                 View piece on Amazon
               </div>
            </a>
          ) : (
            <img src={`/images/products/${img.url}`} alt={img.alt || productName} className="w-full h-auto" />
          )}
        </div>
      ))}
    </div>
  )
}