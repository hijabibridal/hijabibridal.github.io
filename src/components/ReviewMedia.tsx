"use client";

import React, { useState } from "react";

// One photo or video attached to a review in reviews.json.
type MediaItem = {
  type: "image" | "video";
  url: string;
  alt?: string;
  poster?: string; // optional still picture shown before a video is played
};

// "reviews/photo.webp" -> "/images/reviews/photo.webp"
// "reviews/clip.mp4"   -> "/videos/reviews/clip.mp4"
// Full web addresses and paths that already start with "/" are used as they are.
function resolveUrl(url: string, folder: "images" | "videos") {
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return `/${folder}/${url.replace(/^\//, "")}`;
}

export default function ReviewMedia({
  media,
  author,
}: {
  media: MediaItem[];
  author: string;
}) {
  const items = (Array.isArray(media) ? media : []).filter(
    (m) => m && m.url && (m.type === "image" || m.type === "video")
  );

  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (items.length === 0) return null;

  const count = items.length;
  const current = items[Math.min(index, count - 1)];
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    setTouchStartX(null);
  };

  return (
    <div className="mt-4">
      <div
        className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-pink-100 bg-gray-50"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        {current.type === "image" ? (
          <img
            src={resolveUrl(current.url, "images")}
            alt={current.alt || `Photo from ${author}'s review`}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        ) : (
          // Only the video on screen is loaded, so extra videos in the
          // carousel add nothing to the page weight until they are opened.
          <video
            key={index}
            src={resolveUrl(current.url, "videos")}
            poster={current.poster ? resolveUrl(current.poster, "images") : undefined}
            controls
            playsInline
            preload="metadata"
            aria-label={current.alt || `Video from ${author}'s review`}
            className="w-full h-full object-contain bg-black"
          />
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo or video"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center
                         bg-white/80 hover:bg-white rounded-full shadow-md border border-pink-100
                         transition-all duration-200 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-4 h-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo or video"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center
                         bg-white/80 hover:bg-white rounded-full shadow-md border border-pink-100
                         transition-all duration-200 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-4 h-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots sit below the picture so they never cover a video's controls */}
      {count > 1 && (
        <div className="mt-3 flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to item ${i + 1} of ${count}`}
              className={`rounded-full transition-all duration-200 ${
                i === index ? "w-5 h-2 bg-[#db2777]" : "w-2 h-2 bg-pink-200 hover:bg-pink-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
