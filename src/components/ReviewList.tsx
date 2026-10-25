"use client";

import React, { useState } from "react";
import ReviewMedia from "./ReviewMedia";

// How many reviews show before the "Show more" button.
const INITIAL_COUNT = 3;

export default function ReviewList({ reviews }: { reviews: any[] }) {
  const [expanded, setExpanded] = useState(false);
  const total = reviews.length;
  const hiddenCount = Math.max(0, total - INITIAL_COUNT);

  return (
    <div>
      <div className="space-y-6">
        {reviews.map((r: any, index: number) => (
          // Every review is in the page so Google can read all of them. The
          // ones past the first few are only hidden from view until the
          // button is clicked.
          <div
            key={index}
            className={`bg-pink-50/30 p-6 rounded-2xl text-black ${
              !expanded && index >= INITIAL_COUNT ? "hidden" : ""
            }`}
          >
            <div className="text-[#db2777] text-lg" aria-label={`${r.rating} out of 5 stars`}>
              {"★".repeat(Math.round(r.rating))}
              {"☆".repeat(5 - Math.round(r.rating))}
            </div>
            {r.title && <h3 className="font-bold text-xl mt-1">{r.title}</h3>}
            {r.text && <p className="text-gray-700 leading-relaxed mt-2">{r.text}</p>}
            {Array.isArray(r.media) && r.media.length > 0 && (
              <ReviewMedia media={r.media} author={r.author || "Verified customer"} />
            )}
            {r.reply && (
              <div className="mt-4 border-l-4 border-pink-200 pl-4">
                <p className="text-sm font-bold text-gray-900">Response from Halal Nails</p>
                <p className="text-gray-700 leading-relaxed mt-1">{r.reply}</p>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-3">
              {r.author || "Verified customer"}
              {r.date ? ` · ${r.date}` : ""}
            </p>
          </div>
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="mt-6 inline-block bg-white text-[#db2777] font-bold py-3 px-8 rounded-full border-2 border-[#db2777]
                     uppercase tracking-wider text-sm hover:bg-[#db2777] hover:text-white transition-colors"
        >
          {expanded
            ? "Show fewer reviews"
            : `Show ${hiddenCount} more ${hiddenCount === 1 ? "review" : "reviews"}`}
        </button>
      )}
    </div>
  );
}
