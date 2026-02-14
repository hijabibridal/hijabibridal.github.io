import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import blogData from "@/data/blog-articles.json";
import type { Metadata } from "next";

const typedBlogData = blogData as any;

export async function generateStaticParams() {
  // Check if articles exist
  const articles = typedBlogData?.articles || [];
  
  // If empty, we MUST return a placeholder slug so the build doesn't fail
  if (articles.length === 0) {
    return [{ slug: "coming-soon" }];
  }
  
  return articles.map((article: any) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = typedBlogData?.articles?.find((a: any) => a.slug === slug);

  if (!article) return { title: "Coming Soon | Hijabi Bridal" };

  return {
    title: article.titleTag || article.pageTitle,
    description: article.metaDescription || article.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = typedBlogData?.articles?.find((a: any) => a.slug === slug);

  // If no article matches (or it's our placeholder), show the branded Coming Soon page
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Breadcrumbs links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} currentPage="Coming Soon" />
        <h1 className="text-4xl font-black uppercase tracking-tighter mt-10 mb-4">Something Beautiful is Coming</h1>
        {/* Red symbolizes new beginnings and happiness in your brand */}
        <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
        <p className="text-gray-600 max-w-md mx-auto">
          We are currently curating the finest Islamic wedding traditions and bridal fashion 
          insights for the American Muslim community.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Breadcrumbs links={[{ href: '/', text: 'Home' }, { href: '/blog', text: 'Blog' }]} currentPage={article.pageTitle} />
      <header className="my-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{article.pageTitle}</h1>
        <div className="h-1 w-24 bg-red-600 mt-4"></div>
      </header>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.htmlBody }} />
    </div>
  );
}