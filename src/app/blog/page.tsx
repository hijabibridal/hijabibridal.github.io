import Link from "next/link";
import blogData from "@/data/blog-articles.json";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Hijabi Bridal",
  description: "Expert advice and inspiration for modest bridal fashion.",
};

export default function BlogIndex() {
  // This pulls your articles and reverses them so the newest is first
  const articles = blogData.articles ? [...blogData.articles].reverse() : [];

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }]} 
        currentPage="Blog" 
      />
      
      <header className="text-center mt-10 mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">The Blog</h1>
        <div className="h-1.5 w-24 bg-pink-600 mx-auto"></div>
      </header>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500 italic">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: any) => (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`}
              className="group border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all bg-white"
            >
              <h3 className="font-bold text-2xl mb-3 group-hover:text-pink-600 transition-colors">
                {article.pageTitle}
              </h3>
              <p className="text-gray-600 line-clamp-3">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}