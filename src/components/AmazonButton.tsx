'use client';

type Props = {
  href: string;
  productName: string;
  productSlug: string;
};

// STORE NAMES
// The button says "Purchase on Amazon.com" unless a product's link contains
// one of the pieces of text in this list. To add a company, add a line with
// part of its link (the website name is enough) and the name you want shown
// on the button. Example:
//   { linkContains: 'someoneelse.com', name: 'SomeoneElse' },
// The link itself still goes in "amazonLink" in bridal-products.json.
const STORE_NAMES: { linkContains: string; name: string }[] = [
  // Add new companies here, one line each.
  { linkContains: 'ayeshanails.com', name: 'AyeshaNails.com' },
];

const DEFAULT_STORE_NAME = 'Amazon.com';

function storeNameFor(href: string): string {
  const link = href.toLowerCase();
  const match = STORE_NAMES.find((store) => link.includes(store.linkContains.toLowerCase()));
  return match ? match.name : DEFAULT_STORE_NAME;
}

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
      Purchase on {storeNameFor(href)}
    </a>
  );
}
