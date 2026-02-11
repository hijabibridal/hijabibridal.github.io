import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }: { product: any }) {
  const mainAlt = product.images[0]?.alt || product.name;

  return (
    <Link href={`/shop/product/${product.slug}`} className="group block bg-white rounded-3xl border border-pink-50 overflow-hidden hover:shadow-2xl transition-all duration-500">
      <div className="relative h-96 w-full bg-gray-50">
        <Image 
          src={`/images/${product.images[0]?.url}`} 
          alt={mainAlt} // 5. DATA: Alt text on the shop floor
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
          unoptimized 
        />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-4 text-[#db2777] font-bold text-xs uppercase tracking-widest">
          View Details →
        </p>
      </div>
    </Link>
  )
}