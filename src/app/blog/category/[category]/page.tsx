import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import { Metadata } from "next";
import Image from "next/image";

interface BlogData {
  mainCategories: any[];
  subCategories: any[];
  articles: any[];
}

type PageProps = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const data = blogData as BlogData;
  if (!data.mainCategories) return []; 
  
  return data.mainCategories.map((category: any) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const data = blogData as BlogData;
  const mainCategory = data.mainCategories?.find((cat: any) => cat.slug === category);

  if (!mainCategory) return { title: 'Category' };

  return {
    title: `${mainCategory.name} | Hijabi Bridal`,
    description: mainCategory.metaDescription,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const data = blogData as BlogData;
  
  const mainCategory = data.mainCategories?.find((cat: any) => cat.slug === category);
  if (!mainCategory) notFound();

  // Filter for the sub-categories that belong to this main category
  const relatedSubCategories = data.subCategories?.filter(
    (sub: any) => sub.parentCategorySlug === category
  ) || [];

  const filtered = data.articles?.filter(
    (article: any) => article.mainCategorySlug === category
  ) || [];
  
  const categoryArticles = [...filtered].reverse();

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs
        links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]}
        currentPage={mainCategory.name}
      />

      <header className="flex flex-col items-center justify-center text-center mt-10 mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-black">
          {mainCategory.name}
        </h1>
        <div className="h-1.5 w-24 bg-pink-600 mx-auto mb-8"></div>

        {/* Restored Sub-category Navigation */}
        {relatedSubCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {relatedSubCategories.map((sub: any) => (
              <Link
                key={sub.slug}
                href={`/blog/category/${sub.slug}`}
                className="px-6 py-2 rounded-full border border-pink-100 text-sm font-bold uppercase tracking-widest text-pink-600 hover:bg-pink-600 hover:text-white transition-all bg-white"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {categoryArticles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
           <p className="text-xl text-gray-500 italic">Coming Soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryArticles.map((article: any) => {
            // FIX: Remove extra /images/ prefix if the JSON already contains it
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

                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600 mb-2 block">
                  {mainCategory.name}
                </span>
                <h3 className="font-bold text-xl mb-3 text-black group-hover:text-pink-600 transition-colors leading-tight">
                  {article.pageTitle}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {article.description}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}