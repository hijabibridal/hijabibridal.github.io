import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-black text-gray-100 uppercase tracking-tighter absolute z-0">
        404
      </h1>
      <div className="relative z-10">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">
          Oh No! <span className="text-pink-600">It's Out of Stock</span>
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium uppercase tracking-widest text-sm">
          The item you are looking for isn't available through Hijabi Bridal on Amazon.com any longer. They sell out quickly! Please use our Shop button to browse, get inspiration and shop.
        </p>
        <Link 
          href="/shop" 
          className="bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-pink-600 transition-all inline-block"
        >
          Browse & Shop
        </Link>
      </div>
    </div>
  )
}