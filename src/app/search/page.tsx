'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import Breadcrumbs from '@/components/Breadcrumbs';

// We wrap the content in Suspense because useSearchParams() 
// requires it during static site generation.
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage="Search Results" 
      />
      
      <div className="mt-8">
        <SearchResults query={query} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Loading results...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}