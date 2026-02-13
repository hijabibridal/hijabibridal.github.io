import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import Image from "next/image";
import { Metadata } from "next";

// Define the data structure to match your JSON
interface BlogData {
  mainCategories: any[];
  subCategories: any[];
  articles: any[];
}

type PageProps = { params: Promise<{ category: string; subcategory: string }> };

// This is the function GitHub needs to pass the build
export async function generateStaticParams() {
  const data = blogData as BlogData;
  
  // Safety check: If subCategories is empty or undefined, return an empty array
  if (!data.subCategories || data.subCategories.length === 0) {
    return [];
  }

  return data.subCategories.map((sub) => ({
    category: sub.mainCategorySlug,
    subcategory: sub.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const data = blogData as BlogData;
  
  const foundSub = data.subCategories?.find(sub => 
    sub.mainCategorySlug === category && sub.slug === subcategory
  );

  if (!foundSub) return { title: 'Coming Soon' };

  return {
    title: `${foundSub.name} | Hijabi Bridal`,
    description: foundSub.metaDescription || foundSub.description,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;
  const data = blogData as BlogData;
  
  const currentSub = data.subCategories?.find(sub => 
    sub.mainCategorySlug === category && sub.slug === subcategory
  );

  // If no subcategory exists, show the "Coming Soon" vibe for the USA market
  if (!currentSub) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black uppercase mb-4 text-black">Coming Soon</h1>
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
        <p className="text-gray-600 max-w-md mx-auto">
          We are currently curating the best in American Islamic fashion 
          and wedding traditions for this section.
        </p>
        <Link href="/blog" className="mt-8 inline-block text-red-600 font-bold underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  const filteredArticles = data.articles.filter(a => a.subCategorySlug === subcategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        links={[
          { href: '/', text: 'Home' },
          { href: '/blog', text: 'Blog' },
          { href: `/blog/category/${category}`, text: category }
        ]}
        currentPage={currentSub.name}
      />
      <h1 className="text-3xl font-bold mt-6 mb-2">{currentSub.name}</h1>
      <div className="h-1 w-20 bg-red-600 mb-8"></div>
      
      {filteredArticles.length === 0 ? (
        <p className="text-gray-500 italic">No articles available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Article mapping logic here */}
        </div>
      )}
    </div>
  );
}