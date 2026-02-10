'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!query.trim()) {
          setResults([]);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
        if (!res.ok) {
          throw new Error(await res.text());
        }
        
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to load search results. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2">Searching for "{query}"...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-primary">"{query}"</span>
      </h1>

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.url} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {result.breadcrumbs && (
                    <div className="text-sm text-gray-500 mb-1">
                      {result.breadcrumbs}
                    </div>
                  )}
                  <Link href={result.url} className="block">
                    <h2 className="text-xl font-semibold text-primary hover:underline">
                      {result.title}
                    </h2>
                  </Link>
                  {result.description && (
                    <p className="text-gray-600 mt-2">{result.description}</p>
                  )}
                </div>
                
                {/* Percentage match display */}
                {typeof result.score === 'number' && (
                  <div className="flex flex-col items-end">
                    <div className={`
                      text-2xl font-bold 
                      ${result.score === 100 ? 'text-green-600' : 
                        result.score >= 80 ? 'text-blue-600' : 
                        'text-orange-500'}
                    `}>
                      {result.score}%
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Match</div>
                    {result.score === 100 && (
                      <span className="mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Perfect Match
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p>No results found for "{query}". Try different keywords.</p>
          <div className="mt-4">
            <Link href="/blog" className="text-blue-600 hover:underline">
              Browse all articles
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}