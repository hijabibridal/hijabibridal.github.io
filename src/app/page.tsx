import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[100vh] flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
            Hijabi <span className="text-pink-500">Bridal</span>
          </h1>
          <p className="text-white text-lg md:text-2xl font-light tracking-[0.4em] uppercase mb-10">
            From Halal Nails to Muslim Lehengas, Dresses and Jutti. Find Your Whole Outfit, Curated From Amazon.com
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all transform hover:scale-105"
            >
              View All
            </Link>
            <Link
              href="/shop/category/muslim-lehenga"
              className="bg-transparent border-2 border-white text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Muslim Lehengas
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTRO BRAND STATEMENT ────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-4">
            The premier Muslim bridal destination in the USA
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-8 leading-tight">
            Muslim bridal dresses —{" "}
            <span className="text-pink-500">curated for you</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Finding the perfect Muslim bridal dress in the USA means balancing modesty,
            cultural tradition, and your personal style — all at once. Hijabi Bridal curates
            a hand-picked selection of premium Muslim bridal dresses available on Amazon,
            so every bride across the USA can shop with confidence. From the nikah ceremony
            to the walima reception, every occasion deserves an outfit as meaningful as the moment itself.
          </p>
        </div>
      </section>

      {/* ── SHOP BY CATEGORY ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-3 text-center">
            Shop the collection
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black mb-12 text-center">
            Types of Muslim bridal dresses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { href: '/shop/category/muslim-wedding-dresses', label: 'Wedding Dresses', sub: 'Anarkali, gowns & more' },
              { href: '/shop/category/muslim-lehenga',         label: 'Bridal Lehengas', sub: 'South Asian tradition' },
              { href: '/shop/category/bridal-caftans',         label: 'Bridal Caftans',  sub: 'Moroccan & Dubai styles' },
              { href: '/shop/category/sharara',                label: 'Sharara Suits',   sub: 'Flared & formal' },
              { href: '/shop/category/bridal-hijab',           label: 'Bridal Hijabs',   sub: 'Crepe, chiffon & sparkle' },
              { href: '/shop/category/bridal-dupatta',         label: 'Bridal Dupattas', sub: 'Net, velvet & silk' },
              { href: '/shop/category/nikkah-jewelry',         label: 'Nikkah Jewelry',  sub: 'Kundan, gold & more' },
              { href: '/shop/category/muslim-groom-outfit',    label: 'Groom Outfits',   sub: 'Sherwani & thobe' },
            ].map(({ href, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="group block bg-white border border-gray-100 rounded-2xl p-6 hover:border-pink-300 hover:shadow-lg transition-all duration-300"
              >
                <p className="font-black uppercase tracking-tight text-black text-sm group-hover:text-pink-600 transition-colors">
                  {label}
                </p>
                <p className="text-gray-400 text-xs mt-1">{sub}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-pink-600 transition-all transform hover:scale-105"
            >
              Browse all 176 items
            </Link>
          </div>
        </div>
      </section>

      {/* ── OCCASIONS ────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-3 text-center">
            Dress for every moment
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black mb-6 text-center">
            Every occasion, every look
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-14 text-lg leading-relaxed">
            Muslim weddings in the USA span multiple occasions — and each one calls for
            something different. Our collection covers every stage of your celebration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Nikah ceremony',
                desc: 'The nikah is the heart of the Islamic wedding — a sacred contract requiring modest, beautiful bridal dress. Brides across the USA choose lehengas, anarkalis, or caftans in red, gold, or white. Our nikah dress collection is curated for full coverage, opaque fabric, and head-turning elegance.',
                href: '/shop/category/muslim-wedding-dresses',
                cta:  'Shop nikah dresses',
              },
              {
                title: 'Walima reception',
                desc: "The walima is your chance to shine in a second bridal look. Many US brides choose a lighter, more modern silhouette — a sharara suit, a champagne lehenga, or a flowing gown in pastels or neutrals. Coordinate with your groom's outfit for an unforgettable entrance.",
                href: '/shop/category/muslim-lehenga',
                cta:  'Shop walima looks',
              },
              {
                title: 'Engagement & mehndi',
                desc: 'Pre-wedding occasions like the mehndi and engagement call for vibrant colors and patterns — think fuchsia, peach, and gold. A lighter sharara or a printed caftan keeps the mood festive while staying fully modest.',
                href: '/shop/category/sharara',
                cta:  'Shop festive wear',
              },
              {
                title: 'Guest attire',
                desc: 'Attending a Muslim wedding in the USA? Dress codes vary by family and culture, but modest, elegant coverage is always appropriate. Browse our guest-friendly dupattas, modest gowns, and coordinating jewelry to arrive looking effortlessly put-together.',
                href: '/blog/what-to-wear-to-a-muslim-wedding-guest-guide',
                cta:  'Read the guest guide',
              },
            ].map(({ title, desc, href, cta }) => (
              <div key={title} className="border border-gray-100 rounded-3xl p-8 hover:border-pink-200 hover:shadow-md transition-all">
                <h3 className="font-black uppercase tracking-tight text-black text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>
                <Link href={href} className="text-pink-600 font-black text-xs uppercase tracking-widest hover:underline">
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AMAZON / TRUST STRIP ─────────────────────────────────────────── */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-4">
            Trusted shopping
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-8 leading-tight">
            Muslim bridal dresses on Amazon —{" "}
            <span className="text-pink-500">why it works</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-14">
            Every item in our collection is available through Amazon, giving US brides the
            convenience of fast, reliable shipping, easy returns, lower costs, and a payment process you
            already trust. Online shopping for bridal wear has never been simpler — no
            international sizing uncertainty, no weeks-long waits. With Prime delivery
            options available on many items, you can order with confidence even close
            to your wedding date.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: '📦', title: 'Amazon Prime shipping', desc: 'Fast, reliable delivery across the USA — many items eligible for Prime.' },
              { icon: '↩️', title: 'Easy returns',          desc: "Not the right fit or color? Amazon's return policy makes online shopping for bridal wear risk-free." },
              { icon: '⭐', title: 'Verified reviews',       desc: 'Real buyer reviews on every product so you can shop with confidence, even sight unseen.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-black uppercase tracking-tight text-white text-sm mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FABRICS, COLORS, SIZES, BUDGET ──────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-3 text-center">
            How to choose
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black mb-6 text-center">
            Best Muslim bridal dresses online for 2026
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-16">
            Choosing the right Muslim bridal dress involves four key decisions: fabric, color,
            size, and budget. Here's how to think through each one when shopping online in the USA.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Fabrics */}
            <div>
              <h3 className="font-black uppercase tracking-tight text-black text-xl mb-4 border-b border-pink-100 pb-3">
                Fabrics & materials
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                The fabric of your bridal dress affects how it photographs, how it feels in summer
                heat or winter halls, and how well it maintains modesty. The most popular fabrics
                and materials for Muslim bridal dresses in the USA include:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="font-bold text-black">Silk & satin</span> — Luxurious drape and sheen; ideal for walima and formal occasions.</li>
                <li><span className="font-bold text-black">Butterfly net</span> — Lightweight and airy; a favorite for anarkali-style dresses in warm climates.</li>
                <li><span className="font-bold text-black">Velvet</span> — Rich texture; perfect for fall and winter weddings across the USA.</li>
                <li><span className="font-bold text-black">Georgette & chiffon</span> — Floaty and modest; excellent for dupattas and layered bridal looks.</li>
                <li><span className="font-bold text-black">Lace</span> — Western-influenced and elegant; often used on Muslim wedding gowns with full coverage.</li>
              </ul>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-black uppercase tracking-tight text-black text-xl mb-4 border-b border-pink-100 pb-3">
                Colors & patterns
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Muslim bridal colors and patterns vary widely by cultural background. South Asian
                brides traditionally favor red, gold, and maroon embroidery. Arab-American brides
                often choose white or ivory. West African brides may wear rich jewel tones. Modern
                US Muslim brides increasingly mix these traditions, choosing colors and patterns
                that reflect their personality as much as their heritage.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Red','White','Champagne','Gold','Pink','Green','Blue','Lilac','Peach','Silver','Fuchsia','Maroon'].map(c => (
                  <Link
                    key={c}
                    href={`/shop/category/${c.toLowerCase()}`}
                    className="text-xs font-bold uppercase tracking-wide bg-gray-50 border border-gray-200 rounded-full px-3 py-1 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 transition-colors"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-black uppercase tracking-tight text-black text-xl mb-4 border-b border-pink-100 pb-3">
                Sizes & fits
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Getting the right fit when shopping online is the top concern for US brides. Our
                collection includes sizes and fits across a broad range — from petite to plus size — 
                with many items available in custom or adjustable sizing through Amazon sellers.
                We particularly recommend shararas and caftans for brides seeking flattering,
                forgiving silhouettes that work beautifully across all body types. Always
                cross-reference the size chart on each Amazon listing before ordering, and
                check seller reviews specifically mentioning fit.
              </p>
            </div>

            {/* Budget */}
            <div>
              <h3 className="font-black uppercase tracking-tight text-black text-xl mb-4 border-b border-pink-100 pb-3">
                Prices & budgets
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Muslim bridal dresses on Amazon span a wide range of prices and budgets,
                making them accessible to every US bride. Affordable options — dupatta sets,
                bridal hijabs, and jewelry — start under $30 and deliver remarkable quality.
                Lehengas and anarkalis typically run $80–$150. The advantage of online
                shopping through Amazon is transparency: prices, prime eligibility, and
                return policies are clearly listed, so you can plan your total bridal
                budget without surprises.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── CULTURAL & FASHION CONTEXT ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-3 text-center">
            Modesty meets elegance
          </p>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black mb-10 text-center">
            Muslim bridal fashion in the USA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-black uppercase tracking-tight text-black text-lg mb-4">
                Cultural & social context
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                The American Muslim community is one of the most ethnically diverse in the world,
                spanning South Asian, Arab, West African, Southeast Asian, and convert backgrounds.
                This cultural and social context shapes Muslim bridal fashion in the USA uniquely:
                a bride in Dearborn, Michigan may choose a heavily embroidered Pakistani lehenga,
                while a bride in Houston may select a Moroccan caftan, and a bride in New York may
                opt for a modern white gown with full-coverage sleeves.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                What unites all of these choices is the principle of modesty — full coverage,
                opaque fabric, and non-form-fitting silhouettes that reflect Islamic values while
                celebrating personal expression. Hijabi Bridal was founded to serve every bride
                within this cultural and social context, regardless of background.
              </p>
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tight text-black text-lg mb-4">
                Fashion & style context
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                In 2026, Muslim bridal fashion reflects a rich fashion and style context shaped
                by both Middle Eastern luxury fashion and South Asian craftsmanship. Heavy
                embroidery, 3D floral appliqué, and pearl-embellished hijabs are trending. At the
                same time, minimalist champagne and ivory gowns with subtle beadwork appeal to
                brides who prefer a Western-influenced silhouette.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                The biggest 2026 trend is the double-dupatta bridal look — pairing a lehenga with
                two coordinating dupattas worn at different heights for a layered, regal effect.
                This fashion and style choice has gone viral in the US Muslim bridal community
                and is among our most-searched categories.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block bg-black text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-pink-600 transition-all transform hover:scale-105"
            >
              Read the Bride & Groom Guide
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEASONAL / GEOGRAPHIC ────────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-3">
                Plan ahead
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black mb-5 leading-tight">
                Wedding seasons & timing
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Muslim weddings in the USA peak during two seasonal windows: late spring
                (April–June) and early fall (September–November). If your wedding falls in
                summer, prioritize lightweight fabrics and materials like butterfly net
                and chiffon. For fall and winter occasions, velvet caftans and
                heavily embroidered lehengas photograph beautifully in cooler light.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Eid season (spring and fall) also drives high demand for modest occasion wear —
                order early if your wedding is close to Eid al-Fitr or Eid al-Adha. Amazon
                sellers often offer seasonal and timely discounts in the weeks leading up
                to these holidays.
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-pink-500 mb-3">
                Where we serve
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black mb-5 leading-tight">
                Muslim brides across the USA
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                The US Muslim population is concentrated in major metropolitan areas — New York,
                Los Angeles, Chicago, Houston, and the Detroit metro area are home to some of
                the most vibrant Muslim wedding communities in the country. Hijabi Bridal was
                built specifically for brides in the USA who need reliable, fast access to
                high-quality Muslim bridal dresses without importing from overseas.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you're planning a large South Asian-style wedding in New Jersey or an
                intimate nikah ceremony in a Chicago mosque, every item in our collection ships
                quickly and reliably through Amazon across all 50 states.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-pink-600 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-6">
            New to planning a Muslim wedding?
          </h2>
          <p className="text-pink-100 text-lg leading-relaxed mb-10">
            Our Bride & Groom Guide covers everything — from what to wear to a nikah,
            to how to coordinate your groom's sherwani with your lehenga, to styling
            your bridal hijab for every occasion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all transform hover:scale-105"
            >
              Read the guide
            </Link>
            <Link
              href="/shop"
              className="bg-transparent border-2 border-white text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}