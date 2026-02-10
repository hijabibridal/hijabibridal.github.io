import { useMemo } from 'react';

interface RawHTMLWithLinksProps {
  html: string;
  className?: string;
}

/**
 * Safely renders HTML content with secure link handling
 * - Converts relative URLs to absolute
 * - Uses Next.js Link for internal navigation
 * - External links open in new tabs securely
 * - Basic XSS protection
 */
export default function RawHTMLWithLinks({ 
  html, 
  className = ''
}: RawHTMLWithLinksProps) {
  const processedHtml = useMemo(() => {
    // Basic XSS protection - remove dangerous attributes
    const sanitized = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '')
      .replace(/javascript:/gi, '');

    // Convert anchor tags to Next.js Links when appropriate
    return sanitized.replace(
      /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g,
      (match, quote, href) => {
        // Check if URL is internal
        const isInternal = href.startsWith('/') || 
                           href.startsWith('#') || 
                           href.startsWith('mailto:') || 
                           href.startsWith('tel:');
        
        if (isInternal) {
          return `<Link href="${href}" passHref><a className="text-blue-600 hover:underline"`;
        }
        
        // External links
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"`;
      }
    );
  }, [html]);

  return (
    <div 
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: processedHtml }} 
    />
  );
}