import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import blogData from '@/data/blog-articles.json' // New Import

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }]} 
        currentPage="Blog" 
      />
      
      <header className="text-center my-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.articles.map((article) => (
          <div key={article.id} className="border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6">
              <span className="text-pink-600 text-sm font-semibold uppercase">{article.category}</span>
              <h2 className="text-2xl font-bold mt-2 mb-4">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <Link href={`/blog/${article.slug}`} className="text-pink-600 font-bold hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}