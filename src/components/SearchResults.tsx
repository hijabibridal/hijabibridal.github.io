'use client'

import { useState, useEffect, useMemo } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const results = useMemo(() => {
    if (!query) return [];

    // Split query into individual words (e.g., "white", "hijab")
    const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
    
    return productData.products.filter(product => {
      // Get the category tags (slugs) for this specific product
      const productSlugs = (product.mainCategorySlugs || []).map(s => s.toLowerCase());

      // STRICT RULE: Every word searched MUST exist in the product's tags (slugs)
      // This allows "white hijab" to match slugs in any order.
      return searchTerms.every(term => 
        productSlugs.some(slug => slug === term || slug.includes(term))
      );
    });
  }, [query]);

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
          <p className="text-xl text-gray-900 font-black uppercase tracking-tight">No Exact Matches</p>
          <p className="text-gray-500 mt-2">Try searching for categories like "White" or "Hijab".</p>
        </div>
      )}
    </div>
  )
}