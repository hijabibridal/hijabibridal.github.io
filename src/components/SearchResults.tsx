'use client'

import { useState, useEffect } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (!query) return;

    const lowerQuery = query.toLowerCase();
    
    const scoredResults = productData.products
      .map(product => {
        let score = 0;
        if (product.name.toLowerCase() === lowerQuery) score += 100; // Perfect name match
        if (product.name.toLowerCase().includes(lowerQuery)) score += 50; // Name contains
        if (product.mainCategorySlugs.some(s => s.includes(lowerQuery))) score += 25; // Category match
        if (product.description.toLowerCase().includes(lowerQuery)) score += 10; // Description match
        return { ...product, score };
      })
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score); // Sort by highest score

    setResults(scoredResults)
  }, [query])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">
        {results.length} results found for "{query}"
      </h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-gray-500 text-lg">No products found. Try searching for "Hijab" or "Dupatta".</p>
        </div>
      )}
    </div>
  )
}