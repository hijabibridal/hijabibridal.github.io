'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import productData from '@/data/bridal-products.json';
import ProductCard from '@/components/ProductCard'; 

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      // Split the query into individual keywords for "AND" logic
      const keywords = query.split(/\s+/).filter(word => word.length > 0);

      const filtered = productData.products.filter((product) => {
        // 1. Get the product slug
        const productSlug = (product.slug || "").toLowerCase();
        
        // 2. Get all image URLs from the images array
        const imageUrls = (product.images || []).map(img => (img.url || "").toLowerCase());

        // Create the search pool using only slug and url
        const searchPool = [productSlug, ...imageUrls];

        // "AND" Logic: Every keyword must be found in at least one item in the search pool
        return keywords.every(keyword => 
          searchPool.some(item => item.includes(keyword))
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
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">No exact matches found.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchContent />
    </Suspense>
  );
}