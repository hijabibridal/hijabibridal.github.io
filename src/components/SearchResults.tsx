'use client' // Essential for client-side filtering

import { useState, useEffect } from 'react'
import productData from '@/data/bridal-products.json'
import ProductCard from '@/components/ProductCard'

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (!query) return;

    // Filter products locally from the JSON data
    const filtered = productData.products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Results for "{query}"</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found matching your search.</p>
      )}
    </div>
  )
}