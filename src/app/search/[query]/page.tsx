import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: { query: string | string[] };
};

// Forces Next.js to treat this as a static export route
export const dynamicParams = false;

export function generateStaticParams() {
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