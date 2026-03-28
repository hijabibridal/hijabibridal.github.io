'use client';

import React from 'react';

export default function PatternSelector() {
  return (
    <div className="mt-12 mb-8 p-8 border-2 border-pink-100 rounded-3xl bg-pink-50/10">
      <p className="text-black text-lg leading-relaxed mb-6">
        You can have a longer blouse tailored or make it yourself! We&apos;ve got you. 
        Order two lehengas and use the extra blouse/dupatta fabric with this free, 
        hip-length blouse sewing pattern. It&apos;s available in sizes 14 Short to 30 Tall. 
        Check the <a href="https://islamic-fashion-patterns.weebly.com/sizechart.html" target="_blank" rel="noopener noreferrer" className="text-[#db2777] font-bold underline">size chart</a> then select your size and download when the window opens. 
        Print to use. The lehenga skirt usually comes with a drawstring and one seam underneath. 
        You can open the seams on both skirts to attach them for a fuller skirt also.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-152">
          <select 
            className="block w-full bg-white border-2 border-pink-200 text-gray-900 py-4 px-5 pr-10 rounded-2xl appearance-none cursor-pointer font-bold focus:outline-none focus:border-[#db2777] transition-colors"
            onChange={(e) => {
              if (e.target.value) {
                // Matches the format: /patterns/26t 522 .pdf
                const fileName = `/patterns/${e.target.value.toLowerCase()} 522 .pdf`;
                window.open(fileName, '_blank');
              }
            }}
          >
            <option value="">SELECT YOUR SIZE (14Short - 30Tall)</option>
            {[14, 16, 18, 20, 22, 24, 26, 28, 30].map(num => 
              ['S', 'M', 'T'].map(letter => (
                <option key={`${num}${letter}`} value={`${num}${letter}`}>Size {num}{letter}</option>
              ))
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#db2777]">
            <svg className="fill-current h-6 w-6" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <a 
          href="/patterns/Sewing Instructions (1).pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center border-2 border-black hover:bg-black hover:text-white text-black font-bold py-4 px-8 rounded-2xl transition-all uppercase text-sm tracking-widest"
        >
          Sewing Instructions
        </a>
      </div>
    </div>
  );
}