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
            src="/images/shoperts/shoperts-logo.webp" 
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
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-inner mb-4">
                <img 
                  src="/images/shoperts/pakistani-lehenga-with-hijab.webp" 
                  alt="Pakistani Lehenga with Hijab" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Pakistani Lehenga with Hijab</h3>
              <p className="text-gray-600 text-sm">A sweeping, heavily detailed skirt paired with a longer top and perfectly color-matched, elegant hijab draping.</p>
            </div>
            <div className="flex flex-col">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-inner mb-4">
                <img 
                  src="/images/shoperts/muslim-gharara.webp" 
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

      {/* Strategic Value Proposition & Traffic Walkthrough */}
      <section id="walkthrough-dashboard" className="max-w-5xl mx-auto py-24 px-4 border-t border-gray-200 scroll-smooth">
        <div className="text-center mb-16">
          <span className="text-[#db2777] font-bold uppercase tracking-wider block mb-2">Our Traffic Partnership Blueprint</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">How Hijabi Bridal Capitalizes Sourcing Traffic For You</h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-medium text-base leading-relaxed">
            Let's walk through how our system captures organic interest and funnels highly qualified, high-intent clients directly to your tailored consultation checkout[cite: 3].
          </p>
        </div>

        {/* Live Banner Asset Implementation Showcase */}
        <div className="mb-16 max-w-4xl mx-auto bg-gradient-to-br from-pink-50 to-white rounded-3xl p-6 border border-pink-100 shadow-sm">
          <div className="text-center md:text-left mb-6 px-2">
            <span className="text-xs bg-[#db2777] text-white font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold">Active Funnel Canvas</span>
            <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-1">Your Contextual Banner Integration</h3>
            <p className="text-gray-600 text-sm font-medium">This banner will be mapped inside our high-volume internal category pages to catch buyers after scrolling and upon realizing they want something more than readymade garments and Indian accessories.</p>
          </div>
          <div className="w-full overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src="/images/shoperts/shoperts_banner_2.png" 
              alt="Shoperts Consultation Custom Sourcing Banner Asset" 
              className="w-full h-auto object-cover display-block"
            />
          </div>
        </div>

        {/* Walkthrough Slider Wrapper */}
        <div className="relative bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-8 pb-4 xl:overflow-hidden select-none">
            
            {/* Step 1 */}
            <div id="step-1" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 01 / 09 • Traffic Pipeline</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Our Current Active Volume</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Our core optimization setup recorded <strong>805 direct search engine clicks</strong> over the last 28 days. When combined with internal platform navigation, our system moves <strong>1,425 total monthly hits</strong> across the bridal ecosystem—providing an active audience asset ready to route straight to your bespoke tailoring page. At five months old, our Google rank shows the work of our proprietary search optimization tools.
                </p>
                <div className="flex gap-3">
                  <a href="#step-9" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">← Back</a>
                  <a href="#step-2" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-1" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/805 clicks last 30 days.jpg" alt="Total Clicks Dashboard" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 2 */}
            <div id="step-2" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 02 / 09 • Geotargeting</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Your High-Value Target Audience</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Our users match your target buyer profile of Muslim brides precisely - with the sole difference that we sell readymade garments and leave any customization of semi-stiched varieties to the buyer. Placements are heavily concentrated in wealthy Western consumer sectors: the <strong>United States, India, United Kingdom, and Canada</strong>.
                </p>
                <div className="flex gap-3">
                  <a href="#step-1" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-3" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-2" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/where last 805 clicks are from.jpg" alt="Traffic Geography Breakdown" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 3 */}
            <div id="step-3" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 03 / 09 • Intent Capture</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Dominating the New Google AI Landscape</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  The new search structure strongly favors rich, authoritative concepts inside its generative AI Overview containers. When brides click your details through these spaces, they aren't just researching—they are showing immediate commercial intent to purchase. This is demonstrated by the amount of clicks we gather even given the obtacles in the new Google interface, including the AI box (1% commercial clicks) and standard blue links below reduced to half their original capture. Google shows our combined click through rate (CTR) at 1.8%.
                </p>
                <div className="flex gap-3">
                  <a href="#step-2" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-4" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-3" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/google ai box.jpg" alt="Google AI Module Extraction" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 4 */}
            <div id="step-4" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 04 / 09 • SERP Dominance</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Intercepting Ready Buyers First</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  By securing top page placements for tailored keyphrases and questions, we catch customers right when they are ready to plan their wedding. We aim to convert this attention into consultations by sending these shoppers who want something more directly to you. While conversion rates are around 2.5%, online conversion rates are less. We convert at a healthy 5.21%, according to Amazon, but that still leaves other visitors who could find what they want with Shoperts.
                </p>
                <div className="flex gap-3">
                  <a href="#step-3" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-5" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-4" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/first page of google.jpg" alt="Organic First Page Rankings" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 5 */}
            <div id="step-5" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 05 / 09 • Funnel Mechanics</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">High-Volume Content Engines</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Search architecture naturally drops the largest volume of high-intent traffic into our informative, deep blog spaces. This content acts as our main system funnel to other pages. Visitors then browse the site according to their preferences, landing on category pages which use the Shoperts banner to highlight your custom services. 
                </p>
                <div className="flex gap-3">
                  <a href="#step-4" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-6" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-5" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/more blog page impressions.jpg" alt="Blog Architecture Impressions Map" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 6 */}
            <div id="step-6" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 06 / 09 • Co-Branded Authority</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Featuring Your Brand Directly</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  In addition to adding Shoperts to our menu, we'll also include your services in our dedicated Pakistani bridal trends blog article. This page is already ranking at #8 on Google. We plan to rewrite this section to include expert quotes directly from you and questions with higher traffic rates. This is designed to build immediate trust and lets us seamlessly guide readers to your affiliate tracking links.
                </p>
                <div className="flex gap-3">
                  <a href="#step-5" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-7" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-6" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/pakistani bridal trends.jpg" alt="Bridal Fashion Trend Content Hub" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 7 */}
            <div id="step-7" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 07 / 09 • Added Value</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Grow Your Own Search Footprint</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  To grow your direct traffic, we'll use a joint system that works for us both. If you add a link to us from your site, it will help increase traffic. Also, we highly recommend your launching a blog on your main domain. For quick ranking, we charge a monthly fee for the use of our specialized automation setup after a one month free trial, during which I work with you to help you obtain the best results. Claude AI will take any of the prompts generated for your site and craft excellent articles for you. Your increased rank will help us on Google, and our increased rank helps you as well.
                </p>
                <div className="flex gap-3">
                  <a href="#step-6" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-8" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-7" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/automation to rise quickly.jpg" alt="SEO Prompt Architecture" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 8 */}
            <div id="step-8" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 08 / 09 • On-Site Layout</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Strategic Banner Placement</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Our collections get strong internal view numbers across the catalog pages. Placing your banner right inside these targeted categories captures users while they are feeling the pinch of wanting their dream look while browsing readymade garments.
                </p>
                <div className="flex gap-3">
                  <a href="#step-7" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-9" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Next Step →</a>
                </div>
              </div>
              <a href="#modal-8" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/category pages next most impressions.jpg" alt="Category Collection Analytics" className="w-full h-full object-contain p-2" />
              </a>
            </div>

            {/* Step 9 */}
            <div id="step-9" className="w-full flex-shrink-0 snap-start grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs bg-pink-100 text-[#db2777] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step 09 / 09 • Win-Win Terms</span>
                <h3 className="text-xl font-black uppercase tracking-tight mt-3 mb-2">Our Performance Projections</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  While online standards fluctuate, our system operates at a highly focused <strong>5.21% purchase rate on Amazon. Based on our 307 clicks that went to Amazon during the last 28 days out of 1425 overall, our estimated CTR for Amazon is over 20%. 4% conversion on 307 clicks is an expected 12 buys, but we achieved 16. And because, as you stated, the bridal market is heavily into customization, not readymade, you should convert at a higher rate monthly. We're happy to follow the numbers and make any adjustments to this plan towards our joint success. We will use custom tag parameters to track this value pipeline, requesting a **10% commission on finalized orders**.
                </p>
                <div className="flex gap-3">
                  <a href="#step-8" className="p-3 bg-white hover:bg-gray-100 rounded-full border shadow-sm text-xs font-bold transition-all">←</a>
                  <a href="#step-1" className="px-5 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all">Restart ↺</a>
                </div>
              </div>
              <a href="#modal-9" className="block aspect-[16/9] bg-white rounded-2xl border overflow-hidden shadow-sm hover:opacity-90 transition-opacity cursor-zoom-in">
                <img src="/images/shoperts/site inviting.jpg" alt="Product Target Deep Analysis" className="w-full h-full object-contain p-2" />
              </a>
            </div>

          </div>
        </div>

        {/* Modal Overlay Windows (Pure CSS via :target pseudo-selectors) */}
        {[
          { id: "modal-1", src: "/images/shoperts/805 clicks last 30 days.jpg", title: "Total Monthly Organic Traffic Visibility" },
          { id: "modal-2", src: "/images/shoperts/where last 805 clicks are from.jpg", title: "Global Core Market Demographics" },
          { id: "modal-3", src: "/images/shoperts/google ai box.jpg", title: "Google AI Overview System Architecture" },
          { id: "modal-4", src: "/images/shoperts/first page of google.jpg", title: "Organic First Page Positions" },
          { id: "modal-5", src: "/images/shoperts/more blog page impressions.jpg", title: "Blog Content Impression Funnel Map" },
          { id: "modal-6", src: "/images/shoperts/pakistani bridal trends.jpg", title: "Active Fashion Trend Index Node" },
          { id: "modal-7", src: "/images/shoperts/automation to rise quickly.jpg", title: "Programmatic Search Prompt Setup" },
          { id: "modal-8", src: "/images/shoperts/category pages next most impressions.jpg", title: "Category Routing Surfaces Analysis" },
          { id: "modal-9", src: "/images/shoperts/product pages least impressions and clicks.jpg", title: "Transactional Buyer Intent Endpoints" }
        ].map((modal) => (
          <div key={modal.id} id={modal.id} className="hidden target:flex fixed inset-0 z-50 bg-black/95 backdrop-blur-sm items-center justify-center p-4">
            <a href="#walkthrough-dashboard" className="absolute inset-0 cursor-zoom-out" title="Close overlay"></a>
            <div className="relative bg-white max-w-5xl w-full max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10">
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h4 className="font-bold text-gray-900 text-sm tracking-tight">{modal.title}</h4>
                <a href="#walkthrough-dashboard" className="text-gray-600 hover:text-black font-bold text-xs px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">✕ Close View</a>
              </div>
              <div className="flex-1 bg-gray-950 p-4 flex items-center justify-center overflow-auto">
                <img src={modal.src} alt={modal.title} className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-inner" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}