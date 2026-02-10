import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: Promise<{ query: string | string[] }>;
};

// Required for Next.js 15 static export with dynamic routes
export async function generateStaticParams() {
  return [{ query: 'results' }]; // Returns a placeholder to satisfy the builder
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { query } = await params;
  const decodedQuery = decodeURIComponent(Array.isArray(query) ? query[0] : query || "");
  
  return {
    title: `Search: ${decodedQuery} - Hijabi Bridal`,
    description: `Search results for "${decodedQuery}" on Hijabi Bridal`,
    robots: { index: false, follow: true }
  };
}

export default async function SearchPage({ params }: PageProps) {
  const { query } = await params;
  const decodedQuery = decodeURIComponent(Array.isArray(query) ? query[0] : query || "");
  
  return <SearchResults query={decodedQuery} />;
}