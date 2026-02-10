import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ query: string | string[] }>;
};

/**
 * FIX: Next.js 15 requires at least one value in the array 
 * for static exports to succeed.
 */
export async function generateStaticParams() {
  return [{ query: 'results' }]; 
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const query = Array.isArray(resolvedParams.query) 
    ? resolvedParams.query[0] 
    : resolvedParams.query || "";
  
  const decodedQuery = decodeURIComponent(query);
  
  return {
    title: `Search: ${decodedQuery} - Hijabi Bridal`,
    description: `Search results for "${decodedQuery}" on Hijabi Bridal`,
    robots: { index: false, follow: true }
  };
}

export default async function SearchPage({ params }: PageProps) {
  const resolvedParams = await params;
  const query = Array.isArray(resolvedParams.query) 
    ? resolvedParams.query[0] 
    : resolvedParams.query || "";

  // Optional: If someone visits the literal placeholder, you can handle it
  // but usually, it's fine to just let the SearchResults handle it.
  
  return <SearchResults query={decodeURIComponent(query)} />;
}