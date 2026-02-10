import Link from 'next/link'
import Image from 'next/image'
import productData from '@/data/bridal-products.json'

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Hijabi Bridal Collections</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our curated selections for the modern bride in the USA market. 
          Quality and elegance for your special day.
        </p>
      </header>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData.mainCategories.map((category) => {
          // Find the first product in this category to use as a featured image
          const featuredProduct = productData.products.find(p => 
            p.mainCategorySlugs.includes(category.slug)
          );
          
          return (
            <Link 
              key={category.slug} 
              href={`/shop/category/${category.slug}`}
              className="group block border rounded-2xl overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-80 w-full bg-pink-50">
                {featuredProduct && featuredProduct.images && featuredProduct.images.length > 0 ? (
                  <Image 
                    src={`/images/products/${featuredProduct.images[0].url}`} 
                    alt={featuredProduct.images[0].alt || category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-pink-200 font-bold">
                    COLLECTION IMAGE
                  </div>
                )}
              </div>
              <div className="p-6 text-center bg-white group-hover:bg-pink-50 transition-colors">
                <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                <p className="text-pink-600 mt-2 font-medium">Explore Collection →</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  )
}