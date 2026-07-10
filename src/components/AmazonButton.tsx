'use client';

type Props = {
  href: string;
  productName: string;
  productSlug: string;
};

export default function AmazonButton({ href, productName, productSlug }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-6"
      onClick={() => {
        if (typeof window !== 'undefined') {
          // Push to dataLayer — works with GTM (how GA4 is loaded on this site)
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: 'amazon_click',
            link_url: href,
            product_name: productName,
            product_slug: productSlug,
            outbound: true,
          });
        }
      }}
    >
      Purchase on Amazon.com
    </a>
  );
}