import React from 'react';

export const metadata = {
  title: 'Pakistani Bridal & Lehenga Custom Sourcing | Hijabi Bridal x Shoperts',
  description: 'Discover bespoke Pakistani wedding lehengas and bridal outfits. Hijabi Bridal partners with Shoperts to bring authentic, custom tailoring from Pakistan straight to Western brides.',
  openGraph: {
    title: 'Custom Pakistani Bridal Sourcing | Hijabi Bridal x Shoperts',
    description: 'Bespoke Pakistani wedding wear curated and tailored for the modern Western bride.',
  },
}

export default function PakistaniBridalPartnershipPage() {
  return (
    <main className="min-h-screen bg-white text-black font-sans">
      
      {/* Partnership Hero Announcement */}
      <section className="bg-pink-50 py-20 px-4 text-center border-b border-pink-100">
        {/* Shoperts Logo */}
        <div className="max-w-[320px] mx-auto mb-8 bg-black p-4 rounded-xl shadow-md border border-gray-800">
          <img 
            src="/images/shoperts-logo.webp" 
            alt="Shoperts Upscale Shopping Logo" 
            className="w-full h-auto object-contain"
          />
        </div>

        <span className="text-[#db2777] uppercase font-bold tracking-widest text-sm block mb-4">Exclusive Bridal Sourcing</span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 max-w-5xl mx-auto leading-none">
          Hijabi Bridal Partners with <span className="text-[#db2777]">Shoperts Upscale Shopping</span>.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed font-medium">
          Difficulty finding just the right look for your wedding? If you're scrolling instead of planning, we have the right solution. <a href="https://shoperts.com/bespoke-tailoring" className="text-blue-600 hover:underline">Get your dreams customized</a> right to your door. Shoperts harnesses the incredible artistry of Pakistan’s world-famous textile industry and bridal designers just for you. Affordable pricing! Try this world class shopping experience to customize Pakistani bridal lehenga and outfits for your wedding. Comfortable wedding outfit planning, elite, custom-tailored luxury - no stress.
        </p>
      </section>

      {/* Massive Media Showcase / Embedded Reels Section */}
      <section className="bg-white py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Shoperts Previews</h2>
          <p className="text-gray-600 font-medium">Take a look inside how Shoperts works. Then <a href="https://shoperts.com/bespoke-tailoring" className="text-blue-600 hover:underline">get started today!</a></p>
        </div>
        
        {/* 3x Larger Grid for Instagram Embeds */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 max-w-6xl mx-auto">
          <div className="flex flex-col items-center w-full">
            <h4 className="text-base font-bold uppercase tracking-wider text-gray-400 mb-4">Bridal Design Spotlight 1</h4>
            <div className="w-full min-h-[600px] sm:min-h-[750px] overflow-hidden rounded-3xl border bg-gray-50 shadow-md">
              <iframe 
                src="https://www.instagram.com/reel/DURfCGPjJh3/embed" 
                className="w-full h-full min-h-[600px] sm:min-h-[750px] border-0"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            <h4 className="text-base font-bold uppercase tracking-wider text-gray-400 mb-4">Bridal Design Spotlight 2</h4>
            <div className="w-full min-h-[600px] sm:min-h-[750px] overflow-hidden rounded-3xl border bg-gray-50 shadow-md">
              <iframe 
                src="https://www.instagram.com/reel/DaYkah-qGi2/embed" 
                className="w-full h-full min-h-[600px] sm:min-h-[750px] border-0"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            <h4 className="text-base font-bold uppercase tracking-wider text-[#db2777] mb-4">✨ How it Works</h4>
            <div className="w-full min-h-[600px] sm:min-h-[750px] overflow-hidden rounded-3xl border-2 border-pink-100 bg-gray-50 shadow-md">
              <iframe 
                src="https://www.instagram.com/reel/DT6f65jCuB-/embed" 
                className="w-full h-full min-h-[600px] sm:min-h-[750px] border-0"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Upscaled Testimonials Post Integration */}
        <div className="max-w-3xl mx-auto bg-pink-50 rounded-3xl p-8 sm:p-12 border border-pink-100 text-center flex flex-col items-center shadow-sm">
          <h3 className="text-3xl font-black uppercase tracking-tight mb-2">Real Bride Feedback</h3>
          <p className="text-gray-600 mb-8 text-base font-medium">Hear directly from clients who trusted Shopert's custom sourcing process.</p>
          <div className="w-full min-h-[500px] sm:min-h-[650px] overflow-hidden rounded-2xl border bg-white shadow-xl">
            <iframe 
              src="https://www.instagram.com/p/DZs48NrhkLX/embed" 
              className="w-full h-full min-h-[500px] sm:min-h-[650px] border-0"
              allowTransparency={true}
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Crafted Image Gallery Strategy Placeholders */}
      <section className="bg-gray-50 py-16 px-4 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Style Inspirations</h2>
            <p className="text-gray-600 font-medium">Timeless cuts beautifully customized for perfect modesty coverage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col">
        {/* Swapped text placeholder for a real img tag pointing to your .jpg file */}
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-inner mb-4">
          <img 
            src="/images/pakistani-lehenga-with-hijab.webp" 
            alt="Pakistani Lehenga with Hijab" 
            className="w-full h-full object-cover"
          />
        </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Pakistani Lehenga with Hijab</h3>
              <p className="text-gray-600 text-sm">A sweeping, heavily detailed skirt paired with a longer top and perfectly color-matched, elegant hijab draping.</p>
            </div>
            <div className="flex flex-col">
        {/* Swapped text placeholder for a real img tag pointing to your .jpg file */}
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-inner mb-4">
          <img 
            src="/images/muslim-gharara.webp" 
            alt="Muslim Sharara Ensemble" 
            className="w-full h-full object-cover"
          />
        </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Muslim Gharara Ensemble</h3>
              <p className="text-gray-600 text-sm">Wide-legged, flowing statement pants paired with an intricately embroidered tunic for a regal, classic silhouette.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Shoperts & Direct Quote */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#db2777] font-bold uppercase tracking-wider block mb-2">The Sourcing Journey</span>
          <h2 className="text-4xl font-black uppercase tracking-tight mb-6">About the Shoperts Experience</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
            Shoperts works as a premium helper to connect you directly to the massive, stunning wedding apparel industry in Pakistan. Sourcing an authentic, high-end bridal outfit across borders can feel confusing if you aren't familiar with local workshops, sizes, or safe shipping methods. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Through their expert <strong>bespoke-tailoring</strong> service, Shoperts provides an easy, <a href="https://shoperts.com/bespoke-tailoring" className="text-blue-600 hover:underline">personal styling and ordering package.</a> They handle everything from finding the best local fabrics to managing accurate sizing measurements, looking over the final dress for strict quality checks, and shipping it safely right to your door.
          </p>
          <div className="border-l-4 border-[#db2777] pl-4 italic text-gray-7xl text-gray-800 font-semibold text-lg bg-pink-50 py-4 pr-4 rounded-r-xl">
            "Shoperts is a tech-driven platform that manages the global supply chain, logistics, custom clearance and ensures doorstep delivery."
            <span className="block text-sm font-bold uppercase tracking-wider text-gray-500 mt-2 not-italic">— Shoperts Upscale Shopping Official Site</span>
          </div>
        </div>
        <div className="bg-pink-50 border border-pink-100 h-96 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
          <div className="text-4xl mb-4">🪡 ✨</div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Custom Tailoring Packages</h3>
          <p className="text-gray-600 max-w-sm mb-4">Beautiful, personalized wedding styles made exactly to your measurements.</p>
          <span className="text-xs bg-white text-gray-400 font-mono tracking-widest px-4 py-2 rounded-full uppercase border">Packages Start at $500 CAD / $350 USD</span>
        </div>
      </section>

      {/* Informal Guide Section */}
      <section className="bg-gray-50 py-20 px-4 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Your Guide to Pakistani Wedding & Bridal Outfits</h2>
            <p className="text-gray-600 font-medium">Let's break down the styles and options so you can pick the perfect look for your celebrations.</p>
          </div>

          <div className="space-y-8">
            {/* Question 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3 flex items-start">
                <span className="text-[#db2777] mr-3 font-mono">01.</span> What is a Pakistani lehenga?
              </h3>
              <p className="text-gray-700 leading-relaxed pl-8">
                A <strong>Pakistani lehenga</strong> is a gorgeous three-piece wedding outfit. It includes a massive, long skirt that flows beautifully (the lehenga), a matching embroidered top, and a stunning, oversized scarf or veil (the dupatta) that drapes over you. These outfits are famous for their elegant, modest cuts. Instead of short crop tops, they usually feature beautiful long-sleeved tunics paired with wide skirts, covered in delicate hand-stitched details using light, luxurious fabrics like chiffon and net.
              </p>
            </div>

            {/* Question 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3 flex items-start">
                <span className="text-[#db2777] mr-3 font-mono">02.</span> What is the difference between Indian and Pakistani lehengas?
              </h3>
              <p className="text-gray-700 leading-relaxed pl-8">
                While they have similar shapes, the styles are quite different. Indian wedding outfits love bright, vibrant colors like deep reds and oranges, using heavy silk or velvet fabrics packed with highly reflective mirrors and sequins. On the other hand, a <strong>Pakistani bridal</strong> outfit focuses on soft, flowing elegance. They tend to use gorgeous trending, pastel colors (like champagne, sage, sky blue, and ivory) and intricate, delicate embroidery like pearls and metallic threadwork that look incredibly royal while keeping the dress light and easy to move in.
              </p>
            </div>

            {/* Question 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3 flex items-start">
                <span className="text-[#db2777] mr-3 font-mono">03.</span> How many functions are there in a Pakistani wedding?
              </h3>
              <p className="text-gray-700 leading-relaxed pl-8">
                Traditional weddings are a huge event celebrated over three completely separate days, and the bride changes her entire look for each part of the celebration, following cultural traditions. Here's the Pakistani wedding functions list:
              </p>
              <ul className="list-disc pl-14 mt-4 space-y-3 text-gray-700">
                <li><strong>The Henna Night (Day 1):</strong> This is a fun, relaxed kick-off night full of beautiful dresses, games and mehndi. Brides usually wear cheerful colors like bright yellows or greens with lighter, simpler embroidery than what is usually seen at the marriage ceremony.</li>
                <li><strong>The Nikah (Day 2):</strong> The baraat is the main, formal marriage ceremony. This is when the Muslim bride wears the most dramatic, high-ticket traditional red or trending pastel bridal lehenga with a long dupatta and heavy, ornate detailing.</li>
                <li><strong>The Walima (Day 3):</strong> The final wedding reception hosted by the groom's family. The style here is usually a replica of the Pakistani wedding dress in a different color —think elegant pastels, sparkling Muslim gowns, or unique cuts with long, beautiful trailing details. Pakistani cuisine and wedding attire for the bridal party and guests both take center stage here.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
}