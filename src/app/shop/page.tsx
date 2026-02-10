import Link from 'next/link'
import Image from 'next/image'
import productData from '@/data/bridal-products.json'

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Shop Hijabi Bridal Collections</h1>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData.mainCategories.map((category) => (
          <Link 
            key={category.slug} 
            href={`/shop/category/${category.slug}`}
            className="group block border rounded-2xl overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-8 text-center bg-pink-50 group-hover:bg-pink-100 transition-colors">
              <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
              <p className="text-gray-600 mt-2">Explore Collection →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}