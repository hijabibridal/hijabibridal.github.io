import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: { query: string | string[] };
};

/**
 * Required for GitHub Pages (Static Export).
 * This tells Next.js not to pre-build any search result pages at build time,
 * allowing the search to function as a client-side feature.
 */
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
    twitter: {
      title: `Search: ${decodedQuery} - Hijabi Bridal`,
      description: `Discover bridal wear for ${decodedQuery}`,
    },
    robots: {
      index: false, // Standard practice to keep search results out of search engines
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