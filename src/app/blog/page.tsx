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

  const categories = [
    { "slug": "groom-style", "name": "Groom Style" },
    { "slug": "bridal-style", "name": "Bridal Style" },
    { "slug": "nikkah-guests", "name": "Nikkah and Guests" }
  ];

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs links={[{ href: '/', text: 'Home' }]} currentPage="Blog" />
        
        <header className="my-10">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-black">The Bridal Blog</h1>
          <div className="h-1.5 w-24 bg-pink-600 mt-4"></div>

          <div className="flex flex-wrap gap-6 mt-8">
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/blog/category/${cat.slug}`}
                className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-pink-600 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
            <p className="text-xl text-gray-500 italic">Our bridal collections and traditions are arriving soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <Link 
                key={article.slug} 
                href={`/blog/${article.slug}`}
                className="group flex flex-col border border-gray-100 rounded-2xl hover:shadow-xl transition-all bg-white overflow-hidden h-full"
              >
                {/* Image container with forced aspect ratio */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  {article.featuredImageUrl ? (
                    <Image
                      src={article.featuredImageUrl}
                      alt={article.featuredImageAlt || article.pageTitle}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 italic">
                      No image available
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-2 block">
                    {article.mainCategorySlug || 'Wedding Tradition'}
                  </span>
                  <h3 className="font-bold text-2xl mb-3 text-black group-hover:text-pink-600 transition-colors line-clamp-2">
                    {article.pageTitle}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {article.description || "Read more about this traditional look..."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}