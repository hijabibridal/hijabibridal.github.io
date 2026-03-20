'use client'

import { useState, useEffect } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (!query) return;

    const lowerQuery = query.toLowerCase().trim();
    // Split query into individual words (e.g., ["white", "hijab"])
    const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 0);
    
    const scoredResults = productData.products
      .map(product => {
        const productName = product.name.toLowerCase();
        const slugs = product.mainCategorySlugs.map(s => s.toLowerCase());
        const description = product.description.toLowerCase();
        
        // 1. STRICT MATCH CHECK: Every word in the query MUST appear somewhere in the product
        const matchesAllWords = queryWords.every(word => 
          productName.includes(word) || 
          slugs.includes(word) || 
          description.includes(word)
        );

        // If it doesn't match all words, it gets a score of 0 and is filtered out
        if (!matchesAllWords) return { ...product, score: 0 };

        let score = 0;

        // 2. SCORING FOR RANKING (The "Best" matches go to the top)
        
        // Exact full phrase match in name is the gold standard
        if (productName.includes(lowerQuery)) score += 1000;

        // Matches in the slugs (categories/colors) are high priority
        queryWords.forEach(word => {
          if (slugs.includes(word)) score += 500;
        });

        // Matches in the product name
        queryWords.forEach(word => {
          if (productName.includes(word)) score += 200;
        });

        // Matches in description are low priority
        if (description.includes(lowerQuery)) score += 50;

        return { ...product, score };
      })
      .filter(p => p.score > 0) // Only show products that passed the "All Words" test
      .sort((a, b) => b.score - a.score);

    setResults(scoredResults)
  }, [query])

  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">
        {results.length} {results.length === 1 ? 'result' : 'results'} found for "{query}"
      </h2>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {results.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg font-bold">
            No items match all your search terms.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try a simpler search like "White" or "Hijab" separately.
          </p>
        </div>
      )}
    </div>
  )
}