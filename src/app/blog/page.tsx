import blogData from '@/data/blog-articles.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

// Defining the props structure similar to your product page
type PageProps = { 
  params: Promise<{ category: string; subcategory: string }> 
};

// This function tells Next.js which paths to pre-render for the USA market
export async function generateStaticParams() {
  // Ensure we map over the blogData array to create the required params
  return blogData.map((article) => ({
    category: article.category.toLowerCase().replace(/ /g, '-'),
    subcategory: 'general', // Defaulting to 'general' if subcategory isn't in your JSON
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const displayCategory = category.replace(/-/g, ' ');

  return {
    title: `${displayCategory.toUpperCase()} | Hijabi Bridal Blog`,
    description: `Explore the latest in ${displayCategory} and American Islamic wedding traditions.`,
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;
  const displayCategory = category.replace(/-/g, ' ');

  // Filter articles to show only relevant content for this category
  const filteredArticles = blogData.filter(
    (a) => a.category.toLowerCase().replace(/ /g, '-') === category
  );

  if (filteredArticles.length === 0) {
    // If no articles exist for a category, show the Coming Soon vibe
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} 
          currentPage={displayCategory} 
        />
        <main className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tighter">
            {displayCategory}
          </h1>
          {/* Red symbolizes new beginnings and happiness in your brand */}
          <div className="h-1 w-24 bg-red-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-medium text-gray-600">Coming Soon</h2>
        </main>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Breadcrumbs 
          links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} 
          currentPage={displayCategory} 
        />
        <h1 className="text-4xl font-black uppercase mt-8 mb-4">{displayCategory}</h1>
        <p className="text-gray-600 mb-12">Insights and traditions for the American Muslim community.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapping over the data as requested, similar to product page logic */}
          {filteredArticles.map((article) => (
            <div key={article.id} className="border p-6 rounded-xl">
               <h3 className="font-bold text-xl mb-2">{article.title}</h3>
               <p className="text-gray-600">{article.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}