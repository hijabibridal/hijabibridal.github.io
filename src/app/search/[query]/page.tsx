import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: Promise<{ query: string | string[] }>;
};

// This is critical for static export: it tells Next.js not to attempt
// to generate any dynamic paths beyond what is in generateStaticParams.
export const dynamicParams = false;

/**
 * Required for GitHub Pages (Static Export).
 * We return an empty array because search is handled on the client-side.
 */
export async function generateStaticParams() {
  return [];
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
    robots: {
      index: false,
      follow: true
    }
  };
}

export default async function SearchPage({ params }: PageProps) {
  const resolvedParams = await params;
  const query = Array.isArray(resolvedParams.query) 
    ? resolvedParams.query[0] 
    : resolvedParams.query || "";
  
  return <SearchResults query={decodeURIComponent(query)} />;
}