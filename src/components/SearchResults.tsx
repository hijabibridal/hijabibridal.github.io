'use client'

import { useState, useEffect, useMemo } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const results = useMemo(() => {
    if (!query) return [];

    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    
    return productData.products
      .map(product => {
        const productName = product.name.toLowerCase();
        const productDescription = (product.description || "").toLowerCase();
        const productSlugs = (product.mainCategorySlugs || []).map(s => s.toLowerCase());
        
        // COMBINE ALL RELEVANT TEXT INTO ONE STRING FOR THE SEARCH TO CHECK
        const searchableText = `${productName} ${productSlugs.join(' ')} ${productDescription}`;

        // THE "STRICT" CHECK: Every single word from the search must be in the searchableText
        const matchesAll = searchTerms.every(term => searchableText.includes(term));

        if (!matchesAll) return null;

        // SCORING: If it matches all words, we then decide which one goes FIRST
        let score = 0;
        
        // Exact name matches are the highest priority
        if (productName.includes(query.toLowerCase())) score += 100;
        
        // Category/Slug matches (like "white" or "hijab") are second priority
        searchTerms.forEach(term => {
          if (productSlugs.includes(term)) score += 50;
          if (productName.includes(term)) score += 10;
        });

        return { ...product, score };
      })
      .filter((p): p is any => p !== null) // Remove items that didn't match all words
      .sort((a, b) => b.score - a.score);   // Sort the "Survivors" by relevance
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
        <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-bold">No items found matching all terms.</p>
          <p className="text-gray-400 text-sm mt-2">Try searching for just "{query.split(' ')[0]}"</p>
        </div>
      )}
    </div>
  )
}