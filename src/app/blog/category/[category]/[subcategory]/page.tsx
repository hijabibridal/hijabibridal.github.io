import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import Image from "next/image";
import { Metadata } from "next";

interface BlogCategory {
  slug: string;
  name: string;
}

interface BlogSubCategory {
  slug: string;
  name: string;
  description: string;
  mainCategorySlug: string;
  titleTag?: string;
  metaDescription?: string;
}

interface BlogArticle {
  slug: string;
  pageTitle: string;
  description: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  mainCategorySlug: string;
  subCategorySlug: string;
}

interface BlogData {
  mainCategories: BlogCategory[];
  subCategories: BlogSubCategory[];
  articles: BlogArticle[];
}

interface PageProps {
  params: { 
    category: string;
    subcategory: string;
  };
}

export async function generateStaticParams() {
  const { subCategories } = blogData as BlogData;
  return subCategories.map((sub) => ({
    category: sub.mainCategorySlug,
    subcategory: sub.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = params;
  const { subCategories } = blogData as BlogData;
  
  const categorySlug = category?.trim().toLowerCase() || '';
  const subcategorySlug = subcategory?.trim().toLowerCase() || '';
  
  const foundSubCategory = subCategories.find(sub => 
    sub.mainCategorySlug?.trim().toLowerCase() === categorySlug &&
    sub.slug?.trim().toLowerCase() === subcategorySlug
  );

  if (!foundSubCategory) {
    return {
      title: 'Subcategory Not Found',
      description: 'The requested subcategory does not exist.'
    };
  }

  return {
    metadataBase: new URL('https://petgadgetinsider.org'),
    title: foundSubCategory.titleTag || foundSubCategory.name,
    description: foundSubCategory.metaDescription || foundSubCategory.description,
    openGraph: {
      title: foundSubCategory.titleTag || foundSubCategory.name,
      description: foundSubCategory.metaDescription || foundSubCategory.description,
    },
    twitter: {
      title: foundSubCategory.titleTag || foundSubCategory.name,
      description: foundSubCategory.metaDescription || foundSubCategory.description,
    }
  };
}

export default function SubcategoryPage({ params }: { params: { category: string; subcategory: string } }) {
  const { category, subcategory } = params;
  const { mainCategories, subCategories, articles } = blogData as BlogData;
  
  const categorySlug = category?.trim().toLowerCase() || '';
  const subcategorySlug = subcategory?.trim().toLowerCase() || '';
  
  const currentSubCategory = subCategories.find(sub => 
    sub.mainCategorySlug?.trim().toLowerCase() === categorySlug &&
    sub.slug?.trim().toLowerCase() === subcategorySlug
  );
  
  if (!currentSubCategory) {
    notFound();
  }
  
  const mainCategory = mainCategories.find(
    cat => cat.slug?.trim().toLowerCase() === categorySlug
  );
  
  if (!mainCategory) {
    notFound();
  }
  
  const filteredArticles = articles.filter(article => 
    article.mainCategorySlug?.trim().toLowerCase() === categorySlug &&
    article.subCategorySlug?.trim().toLowerCase() === subcategorySlug
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        links={[
          { href: '/', text: 'Home' }, // Added Home
          { href: '/blog', text: 'Pet Supplies Reviews' }, // Changed from 'Blog'
          { 
            href: `/blog/category/${encodeURIComponent(category)}`, 
            text: mainCategory.name,
            prefetch: false
          }
        ]}
        currentPage={currentSubCategory.name}
      />

      <h1 className="text-3xl font-bold mb-6">{currentSubCategory.name}</h1>
      
      {currentSubCategory.description && (
        <p className="text-lg mb-6">{currentSubCategory.description}</p>
      )}

      {filteredArticles.length === 0 ? (
        <p className="text-gray-600">No articles available in this subcategory.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${encodeURIComponent(article.slug)}`}
              className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
              prefetch={false}
            >
              <div className="h-36 overflow-hidden bg-gray-100 relative">
                <Image
                  src={article.featuredImageUrl}
                  alt={article.featuredImageAlt || article.pageTitle}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.pageTitle}</h2>
                {article.description && (
                  <p className="text-gray-600 line-clamp-2">{article.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}