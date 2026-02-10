import Breadcrumbs from '@/components/Breadcrumbs'
import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return productData.mainCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.titleTag} - Hijabi Bridal`,
    description: category.metaDescription,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  
  if (!category) notFound();

  const filteredProducts = productData.products.filter((p) => 
    p.mainCategorySlugs.includes(slug)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} currentPage={category.name} />
      <h1 className="text-4xl font-bold my-8">{category.name} Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.slug} className="border rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-xl mb-4">{product.name}</h2>
            <Link href={`/shop/product/${product.slug}`} className="text-pink-600 hover:underline">
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}