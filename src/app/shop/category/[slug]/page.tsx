import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'

/**
 * Required for GitHub Pages (Static Export).
 * This tells Next.js to treat this as a static route during the build.
 */
export function generateStaticParams() {
  return []; 
}

interface Product {
  name: string
  slug: string
  description: string
  mainCategorySlugs: string[]
  images: {
    url: string
    alt: string
    amazonLink: string
  }[]
  title_tag?: string
  meta_description?: string
  [key: string]: any 
}

interface Category {
  slug: string
  name: string
  titleTag: string
  metaDescription: string
  description: string
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = (productData.mainCategories as Category[]).find((c) => c.slug === params.slug)
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `${category.titleTag} - Hijabi Bridal`,
    description: category.metaDescription,
  }
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = (productData.mainCategories as Category[]).find((c) => c.slug === params.slug)
  
  if (!category) {
    notFound()
  }

  const filteredProducts = (productData.products as Product[]).filter((product) => 
    product.mainCategorySlugs.includes(params.slug)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[
          { href: '/', text: 'Home' },
          { href: '/shop', text: 'Bridal Shop' }
        ]} 
        currentPage={category.name} 
      />

      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name} Collection</h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </header>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.slug} className="group border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 w-full bg-gray-50 overflow-hidden">
                {product.images && product.images[0] ? (
                  <Image
                    src={`/images/products/${product.images[0].url}`} 
                    alt={product.images[0].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">No Image Available</div>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <div 
                  className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }} 
                />
                
                <div className="flex flex-col gap-3 mt-auto">
                  <a 
                    href={product.images[0]?.amazonLink || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-center bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                  >
                    View on Amazon
                  </a>
                  <Link 
                    href={`/shop/product/${product.slug}`}
                    className="w-full text-center text-gray-500 text-sm hover:underline"
                  >
                    View Full Styling Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No products found in this collection yet.</p>
          <Link href="/blog" className="text-pink-600 font-medium mt-4 inline-block">Return to Collections</Link>
        </div>
      )}
    </div>
  )
}