import Link from 'next/link';
import Image from 'next/image';
import productData from '@/data/bridal-products.json';

export default function ShopPage() {
  const colors = ['blue', 'green', 'maroon', 'pink', 'red', 'white'];
  const colorCats = productData.mainCategories.filter(c => colors.includes(c.slug));
  const itemCats = productData.mainCategories.filter(c => !colors.includes(c.slug));

  const CategorySection = ({ title, cats }: { title: string, cats: any[] }) => (
    <section className="mb-16">
      <h2 className="text-3xl font-black text-gray-900 mb-8 border-l-8 border-pink-600 pl-4 uppercase tracking-tighter">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map((cat) => (
          <Link key={cat.slug} href={`/shop/category/${cat.slug}`} className="group relative aspect-square rounded-xl overflow-hidden bg-pink-50">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-pink-600/40 transition-all z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span className="text-white font-black text-xl md:text-2xl uppercase text-center px-2">{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <CategorySection title="Shop by Color" cats={colorCats} />
      <CategorySection title="Shop by Item" cats={itemCats} />
    </div>
  );
}