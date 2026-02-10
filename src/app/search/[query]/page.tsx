import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: { query: string | string[] };
};

// 1. ADDED: This function is required for GitHub Pages (Static Export)
// It tells Next.js not to pre-build any search result pages at build time.
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
    // Updated titles to match your USA Bridal focus
    title: `Search: ${decodedQuery} - Hijabi Bridal`,
    description: `Search results for "${decodedQuery}" on Hijabi Bridal`,
    openGraph: {
      title: `Search: ${decodedQuery} - Hijabi Bridal`,
      description: `Find the best bridal accessories related to ${decodedQuery}`,
    },
    twitter: {
      title: `Search: ${decodedQuery} - Hijabi Bridal`,
      description: `Discover bridal wear for ${decodedQuery}`,
    },
    robots: {
      index: true,
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