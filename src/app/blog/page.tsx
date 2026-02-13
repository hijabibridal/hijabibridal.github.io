import blogData from '@/data/blog-articles.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

// Match the type structure from your product page
type PageProps = { params: Promise<{ slug: string }> };

// Fixes the "output: export" build error by defining all blog paths
export async function generateStaticParams() {
  return blogData.map((article) => ({
    slug: article.slug,
  }));
}

// Adapted from your product page metadata logic
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogData.find((a) => a.slug === slug);
  if (!article) return {};

  const siteUrl = "https://hijabibridal.github.io"; 

  return {
    title: `${article.title} | Hijabi Bridal`,
    description: article.description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt,
      url: `${siteUrl}/blog/${article.slug}`,
      siteName: "Hijabi Bridal",
      type: 'article',
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = blogData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: article.title, href: `/blog/${article.slug}` },
  ];

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <article className="mt-8">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4">
              {article.title}
            </h1>
            <div className="h-1 w-24 bg-red-600 mb-6"></div> {/* Branding: Red for new beginnings */}
            <p className="text-gray-500 italic">Coming Soon</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed">
              We are currently preparing this article about {article.title.toLowerCase()}. 
              Stay tuned for insights into American Islamic fashion and wedding traditions.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}