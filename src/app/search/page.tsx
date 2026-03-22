'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import productData from '@/data/bridal-products.json';
import blogData from '@/data/blog-articles.json'; // Added blog data import
import ProductCard from '@/components/ProductCard'; 

/**
 * SearchContent handles the filtering logic.
 * It must be inside a Suspense boundary because it uses useSearchParams.
 */
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [results, setResults] = useState([]);
  const [blogResults, setBlogResults] = useState([]); // Separate state for blogs

  useEffect(() => {
    if (query) {
      const searchTerms = query.split(/\s+/).filter(word => word.length > 0);

      // 1. ORIGINAL PRODUCT LOGIC (Unchanged)
      const filteredProducts = productData.products.filter((product) => {
        const productSlugs = (product.mainCategorySlugs || []).map(s => s.toLowerCase());
        return searchTerms.every(term => 
          productSlugs.some(slug => slug === term || slug.includes(term))
        );
      });

      // 2. SEPARATE BLOG LOGIC (Title and Slug only)
      const filteredBlogs = (blogData as any).articles.filter((article: any) => {
        const articleMetadata = `${article.pageTitle} ${article.slug}`.toLowerCase();
        return searchTerms.every(term => articleMetadata.includes(term));
      });

      setResults(filteredProducts);
      setBlogResults(filteredBlogs);
    } else {
      setResults([]);
      setBlogResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          {query ? `Results for "${query}"` : 'Search our Collection'}
        </h1>
        <p className="text-gray-500 mt-2">
          {results.length} {results.length === 1 ? 'product' : 'products'} and {blogResults.length} {blogResults.length === 1 ? 'article' : 'articles'} found
        </p>
      </div>
      
      {/* Product Grid (Original Logic) */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {results.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}

      {/* Blog Results (Added Logic) */}
      {blogResults.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="space-y-4">
            {blogResults.map((article: any) => (
              <Link 
                key={article.slug} 
                href={`/blog/${article.slug}`}
                className="block p-6 bg-white border border-gray-100 rounded-xl hover:border-pink-200 transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 hover:text-pink-600">
                  {article.pageTitle}
                </h3>
                <span className="text-pink-500 text-sm font-bold uppercase tracking-widest mt-2 inline-block">
                  Read Article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results Fallback */}
      {results.length === 0 && blogResults.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">No exact matches found.</p>
          <p className="text-gray-500">Try searching for specific categories like "Red", "White", or "Hijab".</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        <p className="ml-4 text-gray-600">Searching collection...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}