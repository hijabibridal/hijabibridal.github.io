'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import productData from '@/data/bridal-products.json';
import ProductCard from '@/components/ProductCard'; 

/**
 * SearchContent handles the filtering logic.
 * It must be inside a Suspense boundary because it uses useSearchParams.
 */
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      // 1. Split the user's search into individual words (e.g., "white", "hijab")
      const searchTerms = query.split(/\s+/).filter(word => word.length > 0);

      const filtered = productData.products.filter((product) => {
        // 2. Get the tags (slugs) for this specific product
        const productSlugs = (product.mainCategorySlugs || []).map(s => s.toLowerCase());
        
        // 3. THE FLEXIBLE ORDER RULE: 
        // For every word the user typed, check if it exists ANYWHERE in the product's tags.
        // This allows "white hijab" to match tags like ["bridal", "white", "hijab"]
        return searchTerms.every(term => 
          productSlugs.some(slug => slug === term || slug.includes(term))
        );
      });

      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          {query ? `Results for "${query}"` : 'Search our Collection'}
        </h1>
        <p className="text-gray-500 mt-2">
          {results.length} {results.length === 1 ? 'product' : 'products'} found
        </p>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      ) : (
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