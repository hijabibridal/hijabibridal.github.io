'use client'

import { useState, useEffect, useMemo } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const results = useMemo(() => {
    if (!query) return [];

    // 1. Clean and split the query into individual words (e.g., "white", "hijab")
    const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
    
    return productData.products
      .filter(product => {
        // 2. Get the tags (slugs) for this specific product
        const productSlugs = (product.mainCategorySlugs || []).map(s => s.toLowerCase());

        // 3. THE STRICT RULE: Every word searched MUST be in the slugs array
        // If I search "white hijab", the product must have the "white" tag AND the "hijab" tag.
        return searchTerms.every(term => productSlugs.includes(term));
      });
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-12 border-b border-pink-100 pb-8">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
          Search <span className="text-pink-600">Results</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
            Showing {results.length} items matching your categories for "{query}"
        </p>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {results.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-900 font-black uppercase tracking-tight">No Items Found</p>
          <p className="text-gray-500 mt-2">
            This search only matches category names (like "Red", "White", "Lehenga", or "Hijab").
          </p>
        </div>
      )}
    </div>
  )
}