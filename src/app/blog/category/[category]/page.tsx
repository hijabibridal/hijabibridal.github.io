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

// CRITICAL: Tells GitHub Pages which categories to build
export async function generateStaticParams() {
  const data = blogData as BlogData;
  if (!data.mainCategories) return []; // Safety check to prevent .map error
  
  return data.mainCategories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const data = blogData as BlogData;
  const mainCategory = data.mainCategories?.find(cat => cat.slug === category);

  if (!mainCategory) return { title: 'Category' };

  return {
    title: `${mainCategory.name} | Hijabi Bridal`,
    description: mainCategory.metaDescription,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const data = blogData as BlogData;
  const mainCategory = data.mainCategories?.find(cat => cat.slug === category);

  if (!mainCategory) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs
        links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]}
        currentPage={mainCategory.name}
      />

      <main className="flex flex-col items-center justify-center min-h-[50vh] text-center mt-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
          {mainCategory.name}
        </h1>
        {/* Branding: Red for happiness and new beginnings */}
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
        
        <div className="bg-gray-50 p-10 rounded-3xl border border-dashed border-gray-300 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 leading-relaxed">
            We are currently curating the finest content regarding {mainCategory.name.toLowerCase()} 
            for the American Muslim community.
          </p>
        </div>
      </main>
    </div>
  );
}