import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import { Metadata } from "next";

// Define the Data Structure based on your uploaded file
interface BlogData {
  mainCategories: any[];
  subCategories: any[];
  articles: any[];
}

type PageProps = { params: Promise<{ category: string }> };

// FIXED: Required for "output: export". This tells Next.js which categories to build.
export async function generateStaticParams() {
  const data = blogData as BlogData;
  // This maps through your mainCategories in the JSON to create the static paths
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

  // Filters articles to only show those belonging to the current category
  const categoryArticles = data.articles?.filter(
    (article: any) => article.mainCategorySlug === category
  ) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs
        links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]}
        currentPage={mainCategory.name}
      />

      <header className="flex flex-col items-center justify-center text-center mt-10 mb-16">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-black">
          {mainCategory.name}
        </h1>
        {/* Decorative branding line in Pink */}
        <div className="h-1.5 w-24 bg-pink-600 mx-auto mb-8"></div>
      </header>

      {categoryArticles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
           <p className="text-xl text-gray-500 italic">Coming Soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryArticles.map((article: any) => (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`}
              className="group border border-gray-100 p-6 rounded-2xl hover:shadow-xl transition-all bg-white"
            >
              {/* Category label is Pink */}
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-2 block">
                {mainCategory.name}
              </span>
              {/* FIXED: Article Title is Black, turns pink only on hover */}
              <h3 className="font-bold text-2xl mb-3 text-black group-hover:text-pink-600 transition-colors">
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