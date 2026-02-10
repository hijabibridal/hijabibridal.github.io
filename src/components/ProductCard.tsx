'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    images: { url: string; alt: string }[];
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  // Defensive check to ensure images exist
  const firstImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Link 
      href={`/shop/product/${product.slug}`} 
      className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full"
    >
      <div className="relative h-64 w-full bg-gray-50">
        {firstImage ? (
          <Image 
            // Updated path: pointing directly to /images/ as per your folder structure
            src={`/images/${firstImage.url}`} 
            alt={firstImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-pink-50 text-pink-200">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-pink-600 font-medium mt-2 text-sm uppercase tracking-wider">
          View Details →
        </p>
      </div>
    </Link>
  )
}