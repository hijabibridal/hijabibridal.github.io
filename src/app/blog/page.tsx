import blogData from '@/data/blog-articles.json'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hijabi Bridal Blog | Islamic Wedding Traditions',
  description: 'Insights on Muslim groom outfits, bridal lehengas, and the significance of red for new beginnings.',
}

export default function BlogPage() {
  // Safe access to the articles array from your JSON
  const articles = (blogData as any).articles || [];

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs links={[{ href: '/', text: 'Home' }]} currentPage="Blog" />
        
        <header className="my-10">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-black">The Bridal Blog</h1>
          {/* Branding: Pink decorative line for the USA market */}
          <div className="h-1.5 w-24 bg-pink-600 mt-4"></div>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
            <p className="text-xl text-gray-500 italic">Our bridal collections and traditions are arriving soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => {
              return (
                <Link 
                  key={article.slug} 
                  href={`/blog/${article.slug}`}
                  className="group border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all bg-white"
                >
                  {/* Category slug name is pink */}
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-2 block">
                    {article.mainCategorySlug || 'Wedding Tradition'}
                  </span>
                  {/* FIXED: Article title is black, changes to pink only on hover */}
                  <h3 className="font-bold text-2xl mb-3 text-black group-hover:text-pink-600 transition-colors">
                    {article.pageTitle}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {article.description || "Read more about this traditional look..."}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}