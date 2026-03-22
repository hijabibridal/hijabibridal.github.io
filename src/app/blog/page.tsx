import Link from "next/link";
import blogData from "@/data/blog-articles.json";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Hijabi Bridal",
  description: "Expert advice and inspiration for modest bridal fashion.",
};

export default function BlogIndex() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: any) => {
          // FIX: Handles path whether it starts with /images/ or not
          const imagePath = article.featuredImageUrl.startsWith('/images/') 
            ? article.featuredImageUrl 
            : `/images/${article.featuredImageUrl}`;

          return (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`}
              className="group border border-gray-100 p-4 rounded-2xl hover:shadow-xl transition-all bg-white flex flex-col"
            >
              <div className="relative aspect-video mb-4 overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={imagePath}
                  alt={article.pageTitle}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="font-bold text-xl mb-3 group-hover:text-pink-600 transition-colors leading-tight">
                {article.pageTitle}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {article.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}