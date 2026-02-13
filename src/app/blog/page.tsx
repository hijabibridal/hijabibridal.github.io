import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import blogData from '@/data/blog-articles.json'

type Props = {
  params: Promise<{ category: string; subcategory: string }>
}

// This function fixes the build error by telling Next.js exactly which paths to create
export async function generateStaticParams() {
  // If your JSON has categories and subcategories, map them here.
  // For a "Coming Soon" page, we return at least one valid path from your data.
  return blogData.map((article) => ({
    category: article.category.toLowerCase().replace(/ /g, '-'),
    subcategory: 'general', // Or article.subcategory if you have that field
  }))
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category, subcategory } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[
          { href: '/', text: 'Home' },
          { href: '/blog', text: 'Blog' }
        ]} 
        currentPage={category.charAt(0).toUpperCase() + category.slice(1)} 
      />
      
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tighter">
            {category.replace(/-/g, ' ')}
          </h1>
          {/* Branding accent: Red for happiness and new beginnings */}
          <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-medium text-gray-600">Something Beautiful is Coming.</h2>
        </header>

        <p className="max-w-md text-gray-500 mb-10 text-lg">
          We are currently curating the latest in American Islamic fashion 
          and wedding traditions for this category.
        </p>

        <Link 
          href="/" 
          className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Return to Shop
        </Link>
      </main>
    </div>
  )
}