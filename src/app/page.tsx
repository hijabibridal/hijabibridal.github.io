import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hijabi Bridal | Premium Bridal Wear USA',
  description: 'Discover the finest collection of Hijabi bridal wear in the USA for your special day. Shop on Amazon.',
  metadataBase: new URL('https://hijabibridal.github.io'),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">
        Hijabi Bridal
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Welcome to our exclusive preview. We are currently curating the most elegant 
        bridal collections specifically on Amazon.com for the USA.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/blog" 
          className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition"
        >
          View Bridal Blog
        </Link>
        {/* Replace this link once your shop route is ready */}
        <Link 
          href="/shop" 
          className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Explore Shop
        </Link>
      </div>
    </main>
  );
}