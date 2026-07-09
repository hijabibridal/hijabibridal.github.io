import React from 'react';

export const metadata = {
  title: 'Pakistani Bridal & Lehenga Custom Sourcing | Hijabi Bridal x Shoperts',
  description: 'Discover bespoke Pakistani wedding lehengas and bridal outfits. Hijabi Bridal partners with Shoperts to bring authentic, high-ticket custom tailoring from Pakistan straight to Western brides.',
  openGraph: {
    title: 'Custom Pakistani Bridal Sourcing | Hijabi Bridal x Shoperts',
    description: 'Bespoke Pakistani wedding wear curated and tailored for the modern Western bride.',
  },
}

export default function PakistaniBridalPartnershipPage() {
  const siteUrl = "https://hijabibridal.github.io";

  // Structured Data / Schema for PAA and Local Sourcing Partnership
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Custom Pakistani Bridal Sourcing Partnership",
    "description": "Premium partnership page explaining custom Pakistani bridal wear and bespoke lehenga tailoring services for Western brides.",
    "publisher": {
      "@type": "Organization",
      "name": "Hijabi Bridal",
      "url": siteUrl
    },
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Pakistani lehenga?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Pakistani lehenga is a luxury three-piece bridal ensemble featuring a heavily pleated or flared long skirt (lehenga), an intricately embroidered top, and a statement scarf (dupatta). Known for structured elegance, Pakistani bridal lehengas frequently utilize flowing, modest long-line shirts or kurtas rather than short blouses, showcasing sophisticated threadwork, zardozi, and pearls on lightweight luxury fabrics like chiffon and organza."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Indian and Pakistani lehengas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While both share cultural roots, Indian lehengas favor bold, vibrant colors (like bright reds and deep oranges) with dense, high-shine embellishments like mirrors and sequins over heavy fabrics like velvet or silk brocade. Pakistani lehengas focus on controlled, elegant silhouettes, delicate pastel or jewel tones, and longer, flowing long-sleeved kurtas that offer graceful, modest coverage."
        }
      },
      {
        "@type": "Question",
        "name": "What is chaniya choli vs lehenga?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A chaniya choli is a traditional festival outfit from Gujarat made of lightweight cotton or georgette with vibrant folk mirror-work, designed completely for maximum movement and spinning during folk dances like Garba. A lehenga choli is a highly structured, heavy, and regal garment crafted from premium fabrics like silk or velvet, specifically designed for formal wedding ceremonies and grand bridal statements."
        }
      },
      {
        "@type": "Question",
        "name": "What happens in traditional Pakistani weddings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional Pakistani weddings are multi-day, high-energy celebrations requiring a sequence of distinct bridal outfits. The festivities typically kick off with the vibrant Mehndi/Mayun night (celebrated in playful yellows, greens, and lighter fabrics), followed by the grand Baraat wedding day (requiring a show-stopping, highly formal traditional red or deep jewel-toned bridal lehenga), and concluding with the elegant Walima reception (where soft pastels and contemporary, long-train gowns shine)."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Injecting PAA FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Partnership Hero Announcement */}
      <section className="bg-pink-50 py-20 px-4 text-center border-b border-pink-100">
        {/* Shoperts Logo Integration near the top */}
        <div className="max-w-[280px] mx-auto mb-8 bg-black p-4 rounded-xl shadow-md border border-gray-800">
          <img 
            src="/images/shoperts-logo.png" 
            alt="Shoperts Upscale Shopping Logo" 
            className="w-full h-auto object-contain"
          />
        </div>

        <span className="text-[#db2777] uppercase font-bold tracking-widest text-sm block mb-4">Exclusive Bridal Sourcing</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 max-w-5xl mx-auto leading-none">
          Hijabi Bridal Partners with <span className="text-[#db2777]">Shoperts Upscale Shopping</span> to bring you customized Pakistani wedding lehenga and bridal outfits.
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-700 leading-relaxed font-medium">
          Bridging the raw artistry of Pakistan’s world-renowned bridal hubs directly to retail buyers in the West. Get access to elite, couture quality without the logistical stress.
        </p>
      </section>

      {/* Embedded Showcase / Reels Section */}
      <section className="bg-white py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Curated Bridal Previews</h2>
          <p className="text-gray-600 font-medium">Take a look inside the craftsmanship, tailoring process, and high-end results.</p>
        </div>
        
        {/* Grid for Showcases and How-To Reel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Bridal Design Spotlight 1</h4>
            <div className="w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-2xl border bg-gray-50 shadow-sm">
              <iframe 
                src="https://www.instagram.com/reel/DURfCGPjJh3/embed" 
                className="w-full h-full border-0"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Bridal Design Spotlight 2</h4>
            <div className="w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-2xl border bg-gray-50 shadow-sm">
              <iframe 
                src="https://www.instagram.com/reel/DaYkah-qGi2/embed" 
                className="w-full h-full border-0"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#db2777] mb-3">✨ How it Works</h4>
            <div className="w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-2xl border-2 border-pink-100 bg-gray-50 shadow-sm">
              <iframe 
                src="https://www.instagram.com/reel/DT6f65jCuB-/embed" 
                className="w-full h-full border-0"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Testimonials Reel Integration */}
        <div className="max-w-xl mx-auto bg-pink-50 rounded-3xl p-8 border border-pink-100 text-center flex flex-col items-center">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Real Bride Feedback</h3>
          <p className="text-gray-600 mb-6 text-sm font-medium">Hear directly from clients who trusted this custom sourcing process.</p>
          <div className="w-full max-w-[340px] aspect-[1/1] sm:aspect-[4/5] overflow-hidden rounded-2xl border bg-white shadow-md">
            <iframe 
              src="https://www.instagram.com/p/DZs48NrhkLX/embed" 
              className="w-full h-full border-0"
              allowTransparency={true}
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </section>

      {/* What is Shoperts & Bespoke Sourcing */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border-t border-gray-100">
        <div>
          <span className="text-[#db2777] font-bold uppercase tracking-wider block mb-2">The Sourcing Revolution</span>
          <h2 className="text-4xl font-black uppercase tracking-tight mb-6">About the Shoperts Experience</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
            Shoperts acts as the premier high-end conduit to the massive, intricate wedding garment industry in Pakistan. For Western buyers, sourcing an authentic, couture-level outfit across borders can feel impossible due to language barriers, sizing inconsistencies, and untrusted payment paths. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Through their elite <strong>bespoke-tailoring</strong> service, Shoperts provides a flawless end-to-end luxury consulting package. They manage everything from master artisan textile sourcing in Karachi and Lahore to custom sizing panels, intensive quality control inspections, and secure, guaranteed door-to-door international freight.
          </p>
          <div className="border-l-4 border-[#db2777] pl-4 italic text-gray-6xl text-gray-600 font-medium">
            "We treat every single outfit as a masterpiece, translating traditional South Asian heritage into perfectly tailored garments designed specifically for Western retail clients."
          </div>
        </div>
        <div className="bg-pink-50 border border-pink-100 h-96 rounded-3xl flex flex-col items-center justify-center p-8 text-center">
          <div className="text-4xl mb-4">🪡 ✨</div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Bespoke Tailoring Tier</h3>
          <p className="text-gray-600 max-w-sm mb-4">Premium custom-built luxury packages spanning from entry-level master copies to bespoke luxury design statements.</p>
          <span className="text-xs bg-white text-gray-400 font-mono tracking-widest px-4 py-2 rounded-full uppercase border">Ranges: $500 CAD – $4,000 CAD</span>
        </div>
      </section>

      {/* Educational Guide Section - PAA Driven */}
      <section className="bg-gray-50 py-20 px-4 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Navigating Pakistani Wedding & Bridal Fashion</h2>
            <p className="text-gray-600 font-medium">A specialized guide for non-Pakistani women seeking the ultimate timeless style for their big day.</p>
          </div>

          <div className="space-y-8">
            {/* PAA 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3 flex items-start">
                <span className="text-[#db2777] mr-3 font-mono">01.</span> What is a Pakistani lehenga?
              </h3>
              <p className="text-gray-700 leading-relaxed pl-8">
                A <strong>Pakistani lehenga</strong> is a luxurious three-piece bridal masterpiece featuring an extensively pleated or floor-length skirt (the lehenga), a meticulously detailed top, and an elegant draping veil (the dupatta). Unlike other variations, traditional Pakistani wedding lehengas are renowned for their structured modesty, often pairing the grand skirt with a long-line kurta or a full-sleeved tunic instead of a short blouse. They focus heavily on lightweight luxury fabrics like chiffon, net, and organza draped with subtle, breathtaking precision.
              </p>
            </div>

            {/* PAA 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3 flex items-start">
                <span className="text-[#db2777] mr-3 font-mono">02.</span> What is the difference between Indian and Pakistani lehengas?
              </h3>
              <p className="text-gray-700 leading-relaxed pl-8">
                The core difference lies in design philosophy, fabric density, and color presentation. Indian bridal wear heavily emphasizes bold, vibrant celebration colors like deep crimson, hot pink, and gold, showcasing high-density, eye-catching mirror and sequin work on structured, heavier materials like velvet and brocade. Conversely, a <strong>Pakistani bridal</strong> outfit champions refined, controlled elegance, prioritizing flowing lines, soft pastel palettes (champagne, ivory, sage, rose), and intricately delicate hand-thread embroideries like zardozi and pearls that photograph exquisitely while remaining incredibly light and comfortable to wear.
              </p>
            </div>

            {/* PAA 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3 flex items-start">
                <span className="text-[#db2777] mr-3 font-mono">03.</span> What is chaniya choli vs lehenga?
              </h3>
              <p className="text-gray-700 leading-relaxed pl-8">
                While non-Pakistani shoppers frequently mix these terms up, they serve completely different purposes. A <em>chaniya choli</em> is a traditional festival outfit deeply rooted in Gujarati folk culture. It is intentionally cut from ultra-breathable, lightweight cotton with playful folk threadwork and mirrors, designed with massive circular flare to allow unrestricted spinning and movement during multi-hour high-energy dances like Garba. A <em>lehenga choli</em> is a far more luxurious, formal, and structured garment engineered explicitly for grand entries at wedding ceremonies, using highly prestigious silks, velvets, and heavy artisan embroideries.
              </p>
            </div>

            {/* PAA 4 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-3 flex items-start">
                <span className="text-[#db2777] mr-3 font-mono">04.</span> What happens in traditional Pakistani weddings?
              </h3>
              <p className="text-gray-700 leading-relaxed pl-8">
                Traditional Pakistani weddings are celebrated over multiple days, creating a spectacular multi-stage festive journey that requires the bride to showcase vastly different aesthetics across different nights. 
              </p>
              <ul className="list-disc pl-14 mt-4 space-y-2 text-gray-700">
                <li><strong>The Mehndi / Mayun:</strong> A joyous, informal night of music and henna where the bride typically wears soft yellow, orange, or green garments with minimal, light embroidery.</li>
                <li><strong>The Baraat:</strong> The primary formal wedding day. This requires the ultimate, high-ticket traditional Pakistani wedding lehenga, featuring a grand trail, heavy metallic embellishments, and classic royal silhouettes.</li>
                <li><strong>The Walima:</strong> The grand reception hosted by the groom's family. Here, the fashion shifts entirely toward contemporary luxury, flowing pastel tones, and westernized fusion bridal aesthetics.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder Footer Area for Data, Images, Links, and Commission Architecture */}
      <section className="max-w-7xl mx-auto py-24 px-4 text-center border-t border-dashed border-gray-200">
        <div className="inline-block p-4 bg-yellow-50 text-yellow-800 text-xs font-mono tracking-widest rounded-lg mb-4 uppercase border border-yellow-200 font-bold">
          System Ready & Waiting
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-gray-400 mb-2">Data & Custom Tracking Blueprint Area</h3>
        <p className="text-gray-400 max-w-md mx-auto text-sm">
          This bottom space is reserved for your talkthrough data. Let me know when you're ready to integrate your images, custom consultation links, and commission tracking architecture.
        </p>
      </section>
    </main>
  );
}