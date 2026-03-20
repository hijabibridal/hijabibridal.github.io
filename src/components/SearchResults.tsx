'use client'

import { useState, useEffect } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (!query) return;

    const lowerQuery = query.toLowerCase().trim();
    // Split query into individual words for better matching
    const queryWords = lowerQuery.split(/\s+/);
    
    const scoredResults = productData.products
      .map(product => {
        let score = 0;
        const productName = product.name.toLowerCase();
        const slugs = product.mainCategorySlugs.map(s => s.toLowerCase());
        const description = product.description.toLowerCase();

        // 1. TOP PRIORITY: Exact Name Match (1000 points)
        if (productName === lowerQuery) score += 1000;

        // 2. HIGH PRIORITY: Exact Category/Color Match (500 points per word)
        // This makes "Red" actually find red items by checking your slugs
        queryWords.forEach(word => {
          if (slugs.includes(word)) score += 500;
        });

        // 3. MEDIUM PRIORITY: Name starts with or contains query (100 - 200 points)
        if (productName.startsWith(lowerQuery)) score += 200;
        else if (productName.includes(lowerQuery)) score += 100;

        // 4. LOW PRIORITY: Description contains query (10 points)
        // Only count this if no other matches found to prevent "fluff" results
        if (score === 0 && description.includes(lowerQuery)) score += 10;

        return { ...product, score };
      })
      .filter(p => p.score > 0)
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
            No exact matches found. 
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Try searching for a color like "Red" or an item like "Lehenga".
          </p>
        </div>
      )}
    </div>
  )
}