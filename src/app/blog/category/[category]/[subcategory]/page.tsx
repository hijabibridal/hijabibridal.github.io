import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import Image from "next/image";
import { Metadata } from "next";

interface BlogData {
  mainCategories: any[];
  subCategories: any[];
  articles: any[];
}

// Updated to match the dynamic segment [subcategory]
type PageProps = { 
  params: Promise<{ category: string; subcategory: string }> 
};

export async function generateStaticParams() {
  const { subCategories } = blogData as BlogData;
  // If subCategories is empty, this returns [], preventing the build error
  return subCategories.map((sub) => ({
    category: sub.mainCategorySlug,
    subcategory: sub.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const { subCategories } = blogData as BlogData;
  
  const foundSubCategory = subCategories.find(sub => 
    sub.mainCategorySlug?.toLowerCase() === category.toLowerCase() &&
    sub.slug?.toLowerCase() === subcategory.toLowerCase()
  );

  if (!foundSubCategory) return { title: 'Coming Soon' };

  return {
    title: `${foundSubCategory.name} | Hijabi Bridal`,
    description: foundSubCategory.description,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;
  const { mainCategories, subCategories, articles } = blogData as BlogData;
  
  const currentSubCategory = subCategories.find(sub => 
    sub.mainCategorySlug?.toLowerCase() === category.toLowerCase() &&
    sub.slug?.toLowerCase() === subcategory.toLowerCase()
  );
  
  // If no subcategory exists yet (common for "Coming Soon" phase), show a placeholder
  if (!currentSubCategory) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Coming Soon</h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
        <p className="text-gray-600">We are curating specific subcategories for your wedding inspiration.</p>
        <Link href="/blog" className="text-red-600 font-bold mt-4 inline-block underline">Back to Blog</Link>
      </div>
    );
  }
  
  const mainCategory = mainCategories.find(cat => cat.slug === category);
  const filteredArticles = articles.filter(article => article.subCategorySlug === subcategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        links={[
          { href: '/', text: 'Home' },
          { href: '/blog', text: 'Blog' }, // Cleaned from 'Pet Supplies'
          { href: `/blog/category/${category}`, text: mainCategory?.name || 'Category' }
        ]}
        currentPage={currentSubCategory.name}
      />

      <header className="mb-10 mt-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">{currentSubCategory.name}</h1>
        <div className="h-1 w-20 bg-red-600"></div> {/* Red for happiness and new beginnings */}
      </header>
      
      {filteredArticles.length === 0 ? (
        <div className="bg-gray-50 p-10 rounded-2xl border border-dashed border-gray-300 text-center">
          <p className="text-gray-600 text-lg">New articles for {currentSubCategory.name} are arriving soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="block border rounded-lg hover:shadow-lg transition-shadow bg-white">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.pageTitle}</h2>
                <p className="text-gray-600 line-clamp-2">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}