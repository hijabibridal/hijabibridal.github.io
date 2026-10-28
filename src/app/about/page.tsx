import React from 'react';

export const metadata = {
  title: 'Our Story | Hijabi Bridal’s Commitment to Modest Elegance',
  description: 'Learn about the vision behind Hijabi Bridal. We are dedicated to providing the best Amazon-curated Muslim bridal dresses and Halal Nails, trending wudu-friendly nails for that final touch.',
  openGraph: {
    title: 'Our Story | Hijabi Bridal',
    description: 'The mission and heritage behind our curated bridal collections.',
  },
}
export default function AboutPage() {
  const siteUrl = "https://hijabibridal.github.io";

  // Structured Data for SEO-GEO-AEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["ClothingStore", "PressonNails"],
    "name": "Hijabi Bridal",
    "image": `${siteUrl}/images/og-image.jpg`, 
    "url": siteUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santiago",
      "addressCountry": "DO"
    },
    "description": "Learn about the vision behind Hijabi Bridal. We are dedicated to providing the best Amazon-curated Muslim bridal dresses and accessories.",
    "founder": {
      "@type": "Person",
      "jobTitle": "Data Manager",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Santiago",
        "addressCountry": "DO"
      }
    },
    // Updated to reflect Amazon Affiliate target market
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "priceRange": "$$"
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Injecting the Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-pink-50 py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter mb-6">
          Modesty Meets <span className="text-[#db2777]">Elegance</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-700 leading-relaxed font-medium">
          The premier destination for the modern Muslim bride in the United States. 
          We believe that choosing your dream aesthetic should never mean compromising your modesty.
        </p>
      </section>

           {/* Our Mission */}
      <section className="max-w-4xl mx-auto py-20 px-4 flow-root">
        <div className="mx-auto mb-8 w-48 overflow-hidden rounded-3xl bg-gray-100 md:float-right md:ml-10 md:mb-4 md:mt-2 md:w-72">
          <img
            src="/images/about.jpg"
            alt="Ghanima Abdullah, founder and data manager at Hijabi Bridal, Halal Nails"
            loading="lazy"
            className="block h-auto w-full"
          />
        </div>

        <h2 className="text-4xl font-black text-black uppercase tracking-tight mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          At Hijabi Bridal, we understand that finding the perfect wedding ensemble is a deeply personal journey. We started this site as a hobby to help brides find Islamic wear in the US. The colors and designs are our happy space! Over time, we noticed that people were searching for halal nails more than Muslim lehengas, so what started as a bridal accessory ended up as a Hijabi Bridal subdivision: Halal Nails. While Hijabi Bridal is primarily an Amazon affiliate, we now ship our carefully chosen, style trending <a href="/shop/category/halal-nails" className="text-[#db2777] font-bold hover:underline">Halal Nails</a> globally to help polish your look in a wudu-friendly way. Want to know more? <a href="/blog/halal-nails-press-on-guide" className="text-[#db2777] font-bold hover:underline">Read our guide to halal press on nails.</a>   
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          I'm Ghanima Abdullah, founder and data manager for Hijabi Bridal / Halal Nails. We love partnerships, so let me know what you're interested in at bridalhijabi@gmail.com
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-pink-50 rounded-2xl">
              <h3 className="text-[#db2777] font-bold text-xl mb-4 uppercase">Expert Curation</h3>
              <p className="text-gray-700">We filter through thousands of products to find the ones that meet our high standards for fabric quality and modest coverage.</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-2xl">
              <h3 className="text-[#db2777] font-bold text-xl mb-4 uppercase">U.S. Focused</h3>
              <p className="text-gray-700">Our collections are specifically curated for brides within the United States, ensuring reliable shipping and familiar sizing.</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-2xl">
              <h3 className="text-[#db2777] font-bold text-xl mb-4 uppercase">Trusted Partners</h3>
              <p className="text-gray-700">As an Amazon Associate, we provide a secure and familiar shopping experience, ensuring your bridal items arrive safely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="max-w-3xl mx-auto py-20 px-4 text-center">
        <p className="text-sm text-gray-400 italic">
          Hijabi Bridal is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Halal Nails is a separate, beloved venture. Read our legal page for more info.
        </p>
      </section>
    </main>
  );
}
