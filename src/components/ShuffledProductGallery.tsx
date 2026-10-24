"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  slug: string;
  name: string;
  images: { url: string }[];
  mainCategorySlugs?: string[];
}

interface Props {
  pool: Product[];
  galleryIndex: number;
}

// The three current kits, in the order they should appear at the top of the
// page: Pink Neutrals, Autumn Berries, Cool Neutrals.
const FEATURED_SLUGS = [
  "halal-nails-pink-neutrals",
  "halal-nails-berries",
  "halal-nails-cool-neutrals",
];

function clientShuffle(array: Product[]): Product[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ShuffledProductGallery({ pool, galleryIndex }: Props) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (galleryIndex === 1) {
      // First gallery on the page: the three current kits, in a fixed order.
      const featured = FEATURED_SLUGS
        .map((slug) => pool.find((p) => p.slug === slug))
        .filter((p): p is Product => Boolean(p));

      // If a kit is missing from this article's pool (for example on a
      // non-nail article), fill the remaining spots with random products.
      if (featured.length < 3) {
        const rest = clientShuffle(
          pool.filter((p) => !FEATURED_SLUGS.includes(p.slug))
        );
        setItems([...featured, ...rest].slice(0, 3));
      } else {
        setItems(featured);
      }
    } else {
      // Later galleries get their own independent shuffle so they always differ
      setItems(clientShuffle(pool).slice(0, 3));
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
      {items.map((prod) => (
        <Link key={prod.slug} href={`/shop/product/${prod.slug}`} className="group block">
          {/* Same box as the featured image on the blog page:
              400px high, rounded-3xl, shadow-2xl, light gray background */}
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-50 mb-3">
            {/* Whole picture shown, 16px padding. On desktop (md and up) the
                picture is enlarged 50% inside the box. */}
            <Image
              src={`/images/${prod.images[0].url.replace(/^\//, "")}`}
              alt={prod.name}
              fill
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02] md:scale-150 md:group-hover:scale-[1.55]"
              unoptimized
            />
          </div>
          <p className="text-black font-bold uppercase text-[10px] tracking-widest text-center group-hover:text-pink-600">
            {prod.name}
          </p>
        </Link>
      ))}
    </div>
  );
}
