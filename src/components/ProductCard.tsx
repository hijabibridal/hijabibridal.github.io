import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }: { product: any }) {
  const displayAlt = product.images[0]?.alt || product.name;

  return (
    <Link href={`/shop/product/${product.slug}`} className="group block bg-white rounded-2xl border border-pink-50 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-80 w-full bg-gray-50">
        <Image 
          src={`/images/${product.images[0]?.url}`} 
          alt={displayAlt}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          unoptimized 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-4 text-[#db2777] font-bold text-sm uppercase tracking-widest">
          View Details →
        </p>
      </div>
    </Link>
  )
}