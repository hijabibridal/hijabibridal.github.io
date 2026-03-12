import React from 'react';

export default function AboutPage() {
  const siteUrl = "https://hijabibridal.github.io";

  // Structured Data for SEO-GEO-AEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hijabi Bridal",
    "image": `${siteUrl}/images/og-image.jpg`, 
    "url": siteUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santiago",
      "addressCountry": "DO"
    },
    "description": "The premier destination for the modern Muslim bride in the United States. Expert curation of modest bridal apparel and wedding accessories.",
    "founder": {
      "@type": "Person",
      "jobTitle": "Technical Data Architect",
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
          We believe that choosing modesty should never mean compromising on your dream aesthetic.
        </p>
      </section>

      {/* Our Mission */}
      <section className="max-w-7xl mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black text-black uppercase tracking-tight mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Hijabi Bridal, we understand that finding the perfect wedding ensemble is a deeply personal journey. For the North American bride, balancing traditional values with contemporary fashion can be a challenge.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to bridge that gap by providing a curated selection of bridal wear that honors your heritage while celebrating your individual style across the United States.
          </p>
        </div>
        <div className="bg-gray-100 h-96 rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-300 font-bold">
                Mission Imagery
            </div>
        </div>
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
          Hijabi Bridal is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
      </section>
    </main>
  );
}