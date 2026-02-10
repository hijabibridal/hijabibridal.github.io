import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: { query: string | string[] };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const query = Array.isArray(params.query) 
    ? params.query[0] 
    : params.query || "";
  const decodedQuery = decodeURIComponent(query);
  
  return {
    title: `Search: ${decodedQuery} - Pet Gadget Insider`,
    description: `Search results for "${decodedQuery}" on Pet Gadget Insider`,
    openGraph: {
      title: `Search: ${decodedQuery} - Pet Gadget Insider`,
      description: `Find the best pet gadgets related to ${decodedQuery}`,
    },
    twitter: {
      title: `Search: ${decodedQuery} - Pet Gadget Insider`,
      description: `Discover pet gadgets for ${decodedQuery}`,
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