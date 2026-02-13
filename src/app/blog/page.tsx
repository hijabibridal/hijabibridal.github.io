import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Keeping Breadcrumbs for SEO consistency */}
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }]} 
        currentPage="Blog" 
      />
      
      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Blog</h1>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div> {/* Branding accent */}
          <h2 className="text-2xl font-medium text-gray-600">Something Beautiful is Coming.</h2>
        </header>

        <p className="max-w-md text-gray-500 mb-10 text-lg">
          We are currently curating insights into American Islamic fashion, 
          wedding traditions, and the joy of new beginnings.
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