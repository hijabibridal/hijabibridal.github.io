import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-pink-50 py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter mb-6">
          Modesty Meets <span className="text-[#db2777]">Elegance</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-700 leading-relaxed font-medium">
          The premier destination for the modern Muslim bride in America. 
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
            We curate the finest modest bridal wear—from intricate South Asian Muslim lehengas and shararas to minimalist Western-style bridal hijabs and accessories. Every item in our catalog is selected to help you feel confident, celebrated, and uniquely you on your special day.
          </p>
        </div>
        <div className="bg-[#db2777] h-96 rounded-3xl flex items-center justify-center p-12 text-white italic text-2xl font-bold text-center">
          "Redefining the modest bridal experience for a new generation of brides."
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-4 border-t border-pink-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-black uppercase tracking-tight mb-12 text-center">Why Hijabi Bridal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-pink-50 rounded-2xl">
              <h3 className="text-[#db2777] font-bold text-xl mb-4 uppercase">Expert Curation</h3>
              <p className="text-gray-700">We filter through thousands of products to find the ones that meet our high standards for fabric quality and modest coverage.</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-2xl">
              <h3 className="text-[#db2777] font-bold text-xl mb-4 uppercase">Style Versatility</h3>
              <p className="text-gray-700">Whether you are looking for traditional Desi red, royal green, or classic white, our collections cover the full cultural spectrum.</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-2xl">
              <h3 className="text-[#db2777] font-bold text-xl mb-4 uppercase">Trusted Partners</h3>
              <p className="text-gray-700">As an Amazon Associate, we provide a secure and familiar shopping experience, ensuring your bridal items arrive safely and on time.</p>
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