import { Metadata } from 'next';
import SearchResults from '@/components/SearchResults';

type PageProps = {
  params: Promise<{ query: string }>;
};

/**
 * THE PLACEHOLDER:
 * This tells Next.js to create a static page at /search/results/
 * This prevents the 404 error during the GitHub build.
 */
export async function generateStaticParams() {
  return [
    { query: 'results' } 
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { query } = await params;
  const decodedQuery = decodeURIComponent(query || "");
  
  return {
    title: `Search: ${decodedQuery} - Hijabi Bridal`,
    description: `Search results for "${decodedQuery}" on Hijabi Bridal`,
    robots: { index: false, follow: true }
  };
}

export default async function SearchPage({ params }: PageProps) {
  const { query } = await params;
  
  // We decode the URL query (e.g., "Pink%20Hijab" becomes "Pink Hijab")
  const decodedQuery = decodeURIComponent(query || "");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SearchResults query={decodedQuery} />
    </div>
  );
}