import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }: { product: any }) {
  // Ensure we are pulling from /public/images/ and handling the filename correctly
  const mainAlt = product.images?.[0]?.alt || product.name;
  const imgSrc = `/images/${product.images?.[0]?.url?.replace(/^\//, '')}`;

  return (
    <Link 
      href={`/shop/product/${product.slug}`} 
      className="group block bg-white rounded-2xl border border-pink-50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image Container: h-80 keeps the grid aligned regardless of image aspect ratio */}
      <div className="relative h-80 w-full bg-gray-50 overflow-hidden">
        <Image 
          src={imgSrc} 
          alt={mainAlt}
          fill
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out"
          unoptimized 
        />
        
        {/* Subtle Pink Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Info */}
      <div className="p-6 bg-white">
        {/* Force Black Text for the Product Name */}
        <h3 className="text-xl font-black text-black uppercase tracking-tighter line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        {/* Pink "View Details" Link */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-[#db2777] font-bold text-xs uppercase tracking-[0.2em]">
            View Details
          </p>
          <span className="text-[#db2777] transform group-hover:translate-x-2 transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  )
}