'use client'

import { useState, useEffect } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (!query) return;

    const keywords = query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
    
    const filtered = productData.products.filter(product => {
      // 1. Get the product slug
      const productSlug = (product.slug || "").toLowerCase();
      
      // 2. Get all image URLs from the images array
      const imageUrls = (product.images || []).map(img => (img.url || "").toLowerCase());

      // Search pool restricted to slug and url only
      const searchPool = [productSlug, ...imageUrls];

      // "AND" Logic: Every keyword must match something in the pool
      return keywords.every(keyword => 
        searchPool.some(item => item.includes(keyword))
      );
    });

    setResults(filtered);
  }, [query])

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
        {results.length} {results.length === 1 ? 'Result' : 'Results'} for "{query}"
      </h2>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {results.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-900 font-black uppercase">No Matches Found</p>
        </div>
      )}
    </div>
  )
}