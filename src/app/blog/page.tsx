import blogData from '@/data/blog-articles.json'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hijabi Bridal Blog | Islamic Wedding Traditions',
  description: 'Insights on Muslim groom outfits, bridal lehengas, and the significance of red for new beginnings.',
}

export default function BlogPage() {
  const articles = (blogData as any).articles || [];

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs links={[{ href: '/', text: 'Home' }]} currentPage="Blog" />
        
        <header className="my-10">
          <h1 className="text-5xl font-black uppercase tracking-tighter">The Bridal Blog</h1>
          {/* Decorative Pink Line */}
          <div className="h-1.5 w-24 bg-pink-600 mt-4"></div>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
            <p className="text-xl text-gray-500 italic">Our bridal collections and traditions are arriving soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => {
              const categorySlug = article.mainCategorySlug?.replace(/\s+/g, '-').toLowerCase() || 'traditions';
              
              return (
                <Link 
                  key={article.slug} 
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col border border-gray-100 p-0 rounded-2xl hover:shadow-xl transition-all bg-white overflow-hidden"
                >
                  {/* Image Container: Changed to object-contain to prevent cutting */}
                  <div className="relative w-full h-64 bg-gray-50">
                    <Image 
                      src={article.featuredImageUrl} 
                      alt={article.featuredImageAlt}
                      fill
                      className="object-contain p-2" 
                      unoptimized
                    />
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-2 block">
                      {article.mainCategorySlug || 'Wedding Tradition'}
                    </span>
                    {/* Fixed Headers: Explicitly pink and styled */}
                    <h3 className="text-2xl font-serif italic font-normal text-pink-600 mb-3 group-hover:text-pink-500 transition-colors">
                      {article.pageTitle}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {article.description || "Read more about this traditional look..."}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}