'use client'

import { useState, useEffect, useMemo } from 'react'
import productData from '@/data/bridal-products.json'
import blogData from '@/data/blog-articles.json'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default function SearchResults({ query }: { query: string }) {
  const { productResults, blogResults } = useMemo(() => {
    if (!query) return { productResults: [], blogResults: [] };

    const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
    
    // 1. Filter Products
    const filteredProducts = productData.products.filter(product => {
      const productSlugs = (product.mainCategorySlugs || []).map(s => s.toLowerCase());
      return searchTerms.every(term => 
        productSlugs.some(slug => slug === term || slug.includes(term))
      );
    });

    // 2. Filter Blog Articles (STRICT: Title and Slug only)
    const filteredBlogs = (blogData as any).articles.filter((article: any) => {
      const articleMetadata = `${article.pageTitle} ${article.slug}`.toLowerCase();
      return searchTerms.every(term => articleMetadata.includes(term));
    });

    return { 
      productResults: filteredProducts, 
      blogResults: filteredBlogs 
    };
  }, [query]);

  const totalResults = productResults.length + blogResults.length;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
        {totalResults} {totalResults === 1 ? 'Result' : 'Results'} for "{query}"
      </h2>
      
      {totalResults > 0 ? (
        <div className="space-y-16">
          {/* Product Results Section - Primary */}
          {productResults.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-pink-600 uppercase tracking-widest mb-6 border-b border-pink-100 pb-2">
                Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {productResults.map(product => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Blog Results Section - Secondary */}
          {blogResults.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {blogResults.map((article: any) => (
                  <Link 
                    key={article.slug} 
                    href={`/blog/${article.slug}`}
                    className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-pink-200 transition-all"
                  >
                    <span className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                      {article.pageTitle}
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-300 group-hover:text-pink-500">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
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