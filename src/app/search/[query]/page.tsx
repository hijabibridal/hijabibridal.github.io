// Force Cache Refresh - Hijabi Bridal Search Fix
import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: { query: string | string[] };
};

// This export is required for GitHub Pages static export
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const query = Array.isArray(params.query) 
    ? params.query[0] 
    : params.query || "";
  const decodedQuery = decodeURIComponent(query);
  
  return {
    title: `Search: ${decodedQuery} - Hijabi Bridal`,
    description: `Search results for "${decodedQuery}" on Hijabi Bridal`,
    openGraph: {
      title: `Search: ${decodedQuery} - Hijabi Bridal`,
      description: `Find the best bridal accessories related to ${decodedQuery}`,
    },
    robots: {
      index: false,
      follow: true
    }
  };
}

export default function SearchPage({ params }: PageProps) {
  const query = Array.isArray(params.query) 
    ? params.query[0] 
    : params.query || "";
  
  return <SearchResults query={decodeURIComponent(query)} />;
}