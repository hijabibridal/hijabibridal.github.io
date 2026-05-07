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
  galleryIndex: 1 | 2; // 1 = top gallery, 2 = bottom gallery
}

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
    // Shuffle the full pool on every page load, then pick 3 non-overlapping items
    // Gallery 1 picks from the first half of the shuffled pool (indices 0–2)
    // Gallery 2 picks from the second half (indices 3–5) so they never repeat
    const shuffled = clientShuffle(pool);
    if (galleryIndex === 1) {
      setItems(shuffled.slice(0, 3));
    } else {
      // If pool has 6+ items, take items 3–5 (guaranteed different from gallery 1)
      // If pool is small (<6), re-shuffle independently so at least the order differs
      if (pool.length >= 6) {
        setItems(shuffled.slice(3, 6));
      } else {
        setItems(clientShuffle(pool).slice(0, 3));
      }
    }
  }, []); // runs once on mount (i.e. each page load/refresh)

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
      {items.map((prod) => (
        <Link key={prod.slug} href={`/shop/product/${prod.slug}`} className="group block">
          <div className="relative h-[192px] w-full rounded-2xl overflow-hidden shadow-sm bg-gray-50 mb-2 border border-pink-50">
            <Image
              src={`/images/${prod.images[0].url.replace(/^\//, "")}`}
              alt={prod.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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