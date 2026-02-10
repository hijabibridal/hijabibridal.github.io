import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import blogData from '@/data/blog-articles.json'
import productData from '@/data/bridal-products.json' 
import type { Metadata } from 'next'

interface Category {
  slug: string
  name: string
  description: string
}

interface DataStructure {
  mainCategories: Category[]
}

export const metadata: Metadata = {
  title: 'Bridal Collections & Style Guides | Hijabi Bridal',
  description: 'Explore our curated bridal product collections including hijabi lehengas and Muslim groom outfits, alongside our expert bridal style and planning blog.',
}

export default function BlogHomePage() {
  const { mainCategories: blogCategories } = blogData as DataStructure
  const { mainCategories: productCategories } = productData as DataStructure

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[
          { href: '/', text: 'Home' }
        ]} 
        currentPage="Bridal Resources" 
      />

      {/* --- SECTION 1: SHOP BY PRODUCT CATEGORY --- */}
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Bridal Product Collections</h1>
      <p className="mb-6 text-gray-600 text-lg">
        Discover curated accessories for your <strong>Muslim wedding</strong>, from <strong>gold</strong> rhinestone belts to traditional <strong>fuschia</strong> dupattas.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {productCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/category/${category.slug}`} 
            className="block border border-pink-100 rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-white hover:bg-pink-50/20"
            passHref
          >
            <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
            <p className="mt-2 text-gray-600 line-clamp-2">{category.description}</p>
            <span className="inline-block mt-4 text-sm font-semibold text-pink-600 uppercase tracking-wider">
              Explore Collection →
            </span>
          </Link>
        ))}
      </div>

      <hr className="mb-16 border-gray-200" />

      {/* --- SECTION 2: BLOG & STYLE GUIDES --- */}
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Bridal Style & Planning Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {blogCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`} // Make sure this says /shop/ now!
            className="block border border-gray-100 rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-white"
            passHref
          >
            <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
            <p className="mt-2 text-gray-600 line-clamp-2">{category.description}</p>
            <span className="inline-block mt-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Read More Articles →
            </span>
          </Link>
        ))}
      </div>

      {/* --- ENHANCED SEO CONTENT SECTION WITH ENTITIES --- */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">Elevating Your Modest Bridal Journey</h2>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 md:p-10 max-w-5xl mx-auto text-gray-800">
        <p className="text-lg leading-relaxed">
          At Hijabi Bridal, we specialize in perfecting the <strong>muslim bride lehenga look</strong>. Whether you are searching for a regal <strong>hijabi lehenga</strong> in <strong>blue</strong> tones or a classic <strong>red Muslim wedding dress</strong>, our resources guide you through every choice. We understand that details like <strong>hijabi nails</strong> and <strong>nikkah jewelry</strong> are the finishing touches that complete your unique <strong>Muslim bridal</strong> aesthetic.
        </p>
        
        <p className="text-lg leading-relaxed mt-6">
          Our collections go beyond the bride; we offer insights into the ideal <strong>Muslim groom outfit</strong>, including the <strong>Islamic nikah dress for groom</strong>. From <strong>sharara suits</strong> with intricate embroidery to a versatile <strong>sharara</strong> in <strong>gold</strong> or <strong>silver</strong>, our styling tips ensure the entire bridal party looks cohesive. Whether you are draping a <strong>dupatta</strong> for a <strong>lilac</strong> themed Nikah or selecting <strong>peach</strong> accents for a Walimah, we help you navigate <strong>Muslim wedding</strong> traditions with contemporary ease.
        </p>

        <p className="text-lg leading-relaxed mt-6 italic text-gray-600">
          Explore our expert guides today to find the perfect <strong>hijabi lehenga</strong> styles or to refine your own <strong>Hijabi Bridal</strong> ensemble with pieces curated from top-rated vendors.
        </p>
      </div>
    </div>
  )
}