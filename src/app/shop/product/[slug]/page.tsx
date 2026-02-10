import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import productData from '@/data/bridal-products.json'
import type { Metadata } from 'next'

interface Product {
  name: string
  slug: string
  description: string
  mainCategorySlugs: string[]
  images: {
    url: string
    alt: string
    amazonLink?: string
  }[]
  FAQ_schema?: string
  title_tag?: string
  meta_description?: string
  [key: string]: any 
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = productData.products.find((p: Product) => p.slug === params.slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.title_tag || product.name,
    description: product.meta_description,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productData.products.find((p: Product) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  // The "Master" link for this product
  const mainAmazonLink = product.images[0]?.amazonLink || "#"

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[
          { href: '/', text: 'Home' },
          { href: '/blog', text: 'Bridal Resources' },
        ]} 
        currentPage={product.name} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        {/* --- LEFT SIDE: IMAGE GALLERY --- */}
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <a href={mainAmazonLink} target="_blank" rel="noopener noreferrer">
              <img 
                src={`/images/${product.images[0]?.url}`} 
                alt={product.images[0]?.alt} 
                className="w-full h-auto object-cover hover:opacity-95 transition-opacity"
              />
            </a>
          </div>
          
          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((img, idx) => (
              <a 
                key={idx} 
                href={img.amazonLink || mainAmazonLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-black transition-all"
              >
                <img 
                  src={`/images/${img.url}`} 
                  alt={img.alt} 
                  className="w-full h-24 object-cover" 
                />
              </a>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: PRODUCT DETAILS --- */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div 
            className="prose prose-slate max-w-none text-gray-700 mb-8 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }} 
          />

          <div className="mt-auto pt-6 border-t border-gray-100">
            <a 
              href={mainAmazonLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-gray-900 text-white text-xl font-semibold py-4 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
            >
              View on Amazon
            </a>
            <p className="text-center text-xs text-gray-400 mt-4 uppercase tracking-widest">
              Available via Amazon Affiliate
            </p>
          </div>
        </div>
      </div>

      {/* --- UPDATED FAQ SECTION --- */}
      {product.FAQ_schema && (
        <div className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-serif font-bold mb-10 text-gray-900 text-center">
            Expert Styling Advice & FAQs
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {product.FAQ_schema.split('\n\n').filter(item => item.trim() !== '').map((item, index) => {
              const lines = item.split('\n').filter(line => line.trim() !== '');
              const question = lines[0]?.replace(/^Q:\s*/i, '') || '';
              const answer = lines.slice(1).join(' ').replace(/^A:\s*/i, '') || '';

              return (
                <div key={index} className="group">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-bold text-sm">
                      Q
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                        {question}
                      </h3>
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-pink-50 text-pink-700 font-bold text-sm">
                          A
                        </span>
                        <p className="text-gray-600 leading-relaxed pt-1">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  )
}