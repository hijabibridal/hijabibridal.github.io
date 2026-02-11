import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return productData.products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const isGroom = product.mainCategorySlugs.includes('muslim-groom-outfit');
  const primaryAmazonLink = product.images[0]?.amazonLink || "#";

  // RESCUE LOGIC: Strip out ALL tags (broken or not) to get back to your original words
  const rawText = product.description.replace(/<[^>]*>/g, '').replace(/\[insert alt text.*?linking images\]/gi, '');
  
  // Split into paragraphs based on new lines
  const paragraphs = rawText.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* THE BRAND OVERRIDE: Forces Pink and removes Orange */}
      <style dangerouslySetInnerHTML={{ __html: `
        .brand-p { color: #374151; margin-bottom: 1.5rem; line-height: 1.7; font-weight: 400; }
        .brand-h2 { color: #db2777 !important; font-weight: 900; font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem; }
        .brand-footer { color: #db2777 !important; font-weight: 600; margin-top: 2rem; }
        .brand-link { color: #db2777 !important; font-weight: bold; text-decoration: underline; }
        /* Kills stubborn orange */
        [style*="orange"], .text-orange-600 { color: #db2777 !important; }
      `}} />

      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={product.name} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        <div className="relative">
          <ProductGallery images={product.images} productName={product.name} isGroom={isGroom} />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          <div className="description-area mt-4">
            {paragraphs.map((text, i) => {
              // 1. Logic for Headers
              if (text.toLowerCase().startsWith('how to wear')) {
                return <h2 key={i} className="brand-h2">{text}</h2>;
              }
              // 2. Logic for Footer Links
              if (text.toLowerCase().includes('shop this color') || text.toLowerCase().includes('view all')) {
                return <p key={i} className="brand-footer">{text}</p>;
              }
              // 3. Logic for Amazon Links (Makes them clickable)
              if (text.includes('amzn.to')) {
                const urlMatch = text.match(/https?:\/\/amzn\.to\/\S+/);
                const url = urlMatch ? urlMatch[0] : '#';
                return (
                  <p key={i} className="brand-p font-bold">
                    Order on Amazon: <a href={url} target="_blank" className="brand-link">{url}</a>
                  </p>
                );
              }
              // 4. Standard Paragraph
              return <p key={i} className="brand-p">{text}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}