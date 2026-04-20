import productData from '@/data/bridal-products.json';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Script from 'next/script';

export const metadata = {
  title: 'What is Muslim Wedding Attire Called? | Hijabi Bridal Shop',
  description: 'Muslim wedding attire is called an abaya, bridal lehenga, or shalwar kameez. Discover all styles in our curated Amazon collection of Muslim wedding dresses and accessories.',
  openGraph: {
    title: 'What is Muslim Wedding Attire Called? | Hijabi Bridal',
    description: 'Browse our curated Amazon collection of Muslim bridal wear — abaya, lehenga, sharara, kaftan, sherwani and more.',
  },
}

function shuffle(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Muslim wedding attire called?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Muslim wedding attire is called by different names depending on the bride or groom's cultural background. For brides, the most common terms are the abaya (a long, floor-length modest gown also worn as a bridal caftan or kaftan), the bridal lehenga (a flared embroidered skirt with matching blouse and dupatta), and the shalwar kameez or sharara (a tunic-and-trouser or divided-skirt suit). For grooms, the traditional long coat (sherwani) is the defining Muslim wedding dress across Pakistani, Indian, and broader South Asian communities."
      }
    },
    {
      "@type": "Question",
      "name": "Is an abaya the same as a kaftan or caftan for a Muslim wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, in bridal use. An abaya is a long, floor-length, long-sleeved modest robe — and in its bridal form, the abaya is functionally equivalent to a bridal caftan or kaftan. Dubai kaftans, Moroccan takchitas, and African boubous are all regional expressions of the abaya silhouette: full coverage, floor-length, and hijab-friendly."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a shalwar kameez and a sharara?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A shalwar kameez is a tunic-and-trouser set — the foundational traditional attire of South Asian fashion. A sharara is a bridal variation where the trouser portion is replaced with a wide, heavily flared divided skirt. In bridal use, the two are equivalent — both provide full modest coverage and serve as Islamic bridal wear for nikah ceremony occasions."
      }
    },
    {
      "@type": "Question",
      "name": "What does a Muslim groom wear at a nikah?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Muslim groom typically wears a sherwani at a nikah — a traditional long structured coat worn over a kurta and matching trousers. Pakistani and Indian Muslim grooms choose a sherwani that coordinates with the bride's bridal lehenga in color. Arab and Middle Eastern Muslim grooms may wear a formal thobe or dishdasha."
      }
    },
    {
      "@type": "Question",
      "name": "What do female guests wear to a Muslim wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Female guests at a Muslim wedding typically wear a shalwar kameez or bridal lehenga with a hijab. At the nikah, modest and formal coverage is expected. At the mehndi, colorful and festive cultural dress is the norm. At the walima reception, a smart shalwar kameez or formal lehenga with hijab is appropriate."
      }
    }
  ]
};

export default function ShopPage() {
  const shuffledProducts = shuffle(productData.products);

  const colorSlugs = ['red', 'white', 'champagne', 'blue', 'fuschia', 'pink', 'lilac', 'gold', 'silver', 'green', 'peach'];
  const colorCategories = productData.mainCategories.filter(cat => colorSlugs.includes(cat.slug));
  const itemCategories = productData.mainCategories.filter(cat => !colorSlugs.includes(cat.slug));

  return (
    <div className="bg-white min-h-screen">

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HEADER ──────────────────────────────────────────────────────────
          H1 + item count + ONE-SENTENCE PAA answer.
          Same text-sm / leading-relaxed as before — not visually smaller.
          max-w-xl keeps it roughly half-width so the grid shows above fold. */}
      <header className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-1">
            The <span className="text-pink-600">Boutique</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs mb-5">
            {productData.products.length} Items Available
          </p>

          {/* One-sentence PAA answer — full max-w-xl width, same size as before */}
          <div className="max-w-xl">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-pink-600 mb-2">
              What is a Muslim wedding attire called?
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Muslim wedding attire is called by many names — the abaya (a floor-length modest robe
              worn as a bridal caftan or kaftan), the bridal lehenga (a flared embroidered skirt
              with dupatta), or the shalwar kameez / sharara (a tunic-and-trouser or divided-skirt
              suit) — each a form of Islamic bridal wear that fulfills the modesty requirements of a
              nikah ceremony while reflecting the bride's heritage.
            </p>
          </div>
        </div>
      </header>

      {/* ── BODY: sidebar + main column ─────────────────────────────────────
          Desktop: sidebar sticky on left, main column on right.
          Main column = [fixed-height scrollable product window] + [static article].
          Mobile: stacks as dropdown menu → sentence (header) → products → article. */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16">

        {/* ── LEFT SIDEBAR ─────────────────────────────────────────────────
            Desktop: sticky, fully scrollable so both Item AND Color menus
            are always reachable without scrolling the product grid.
            Mobile: collapsible <details> dropdown replaces horizontal pills. */}
        <aside className="lg:w-64 shrink-0">

          {/* ── MOBILE: single collapsible dropdown replaces pill row ─── */}
          <details className="lg:hidden mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center px-4 py-3 bg-gray-50 cursor-pointer list-none">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">
                Browse Categories
              </span>
              <svg
                className="transition-transform [[open]_&]:rotate-180 text-gray-400"
                fill="none" height="18" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" width="18"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 pt-3 grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">By Item</p>
                {itemCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/category/${cat.slug}`}
                    className="block text-xs font-bold text-gray-500 hover:text-pink-600 transition-colors uppercase tracking-widest py-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">By Color</p>
                {colorCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/category/${cat.slug}`}
                    className="block text-xs font-bold text-gray-500 hover:text-pink-600 transition-colors uppercase tracking-widest py-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </details>

          {/* ── DESKTOP: sticky, independently scrollable sidebar ────────
              max-h-[calc(100vh-8rem)] + overflow-y-auto ensures BOTH
              the Item and Color sections are always reachable by scrolling
              the sidebar independently of the product grid. ────────────── */}
          <div
            className="hidden lg:block sticky top-28
                        max-h-[calc(100vh-8rem)] overflow-y-auto pr-2
                        [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-pink-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        space-y-4"
          >
            <details className="group border-b border-gray-100 pb-4" open>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">
                  Shop by Item
                </h3>
                <span className="transition group-open:rotate-180 text-gray-400">
                  <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <ul className="mt-4 space-y-3 pl-2">
                {itemCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/shop/category/${cat.slug}`}
                      className="text-sm font-bold text-gray-500 hover:text-pink-600 transition-all uppercase tracking-widest block"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <details className="group border-b border-gray-100 pb-4" open>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">
                  Shop by Color
                </h3>
                <span className="transition group-open:rotate-180 text-gray-400">
                  <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <ul className="mt-4 space-y-3 pl-2">
                {colorCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/shop/category/${cat.slug}`}
                      className="text-sm font-bold text-gray-500 hover:text-pink-600 transition-all uppercase tracking-widest block"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </aside>

        {/* ── MAIN COLUMN ──────────────────────────────────────────────────
            Structure:
              1. Fixed-height scrollable product window (8–9 products visible)
              2. Static article below the window — never moves with product scroll */}
        <main className="flex-1 min-w-0">

          {/* ── SCROLLABLE PRODUCT WINDOW ─────────────────────────────────
              Desktop height: roughly 2 rows of cards at ~420px each + gap.
              ~880px shows 8–9 products (3-col grid = 3 per row × ~3 rows).
              On mobile it's a normal scrollable block — no fixed height needed
              since the full-width 1-col grid makes height impractical to cap. */}
          <div
            className="
              lg:h-[880px] lg:overflow-y-auto
              lg:pr-3
              lg:[&::-webkit-scrollbar]:w-1.5
              lg:[&::-webkit-scrollbar-track]:bg-gray-50
              lg:[&::-webkit-scrollbar-track]:rounded-full
              lg:[&::-webkit-scrollbar-thumb]:bg-pink-200
              lg:[&::-webkit-scrollbar-thumb]:rounded-full
              lg:[&::-webkit-scrollbar-thumb:hover]:bg-pink-400
              mb-0
            "
          >
            {/* Subtle top fade to hint at scrollability */}
            <div className="hidden lg:block sticky top-0 h-4 bg-gradient-to-b from-white to-transparent z-10 -mb-4 pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 pb-8">
              {shuffledProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>

            {/* Subtle bottom fade to hint there are more products */}
            <div className="hidden lg:block sticky bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-10 -mt-8 pointer-events-none" />
          </div>

          {/* ── STATIC ARTICLE — always below the product window ──────────
              On desktop this sits flush below the fixed product window and
              never scrolls with it. On mobile it stacks naturally after all
              the products. ───────────────────────────────────────────────── */}
          <article className="border-t-2 border-pink-100 pt-16 mt-8 max-w-3xl">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-8">
              What is a Muslim wedding attire called?
            </h2>
            <div className="space-y-5 text-gray-600 text-base leading-relaxed">
              <p>
                What is a Muslim wedding attire called — and which style is right for you? The abaya,
                in its bridal form, is the most widely recognized piece of Islamic bridal wear for
                brides from Arab, North African, and convert backgrounds. In its bridal incarnation,
                the abaya functions as a cultural dress statement as much as a religious one — it
                signals modest elegance through its floor-length, long-sleeved silhouette. The bridal
                abaya in white, champagne, or gold is the leading wedding gown choice for nikah
                ceremony looks that draw from Middle Eastern culture. In this collection, the abaya
                finds expression in Dubai-style kaftans and Moroccan takchita sets — different
                regional names for the same abaya-rooted modest wedding gown tradition. Every abaya
                style here follows the Islamic marriage customs of full coverage and dignified
                presentation.
              </p>
              <p>
                The bridal lehenga is the dominant cultural dress for Muslim bridal dress occasions
                among South Asian fashion communities — Pakistani, Indian, and Bangladeshi-American
                brides. A bridal lehenga consists of a heavily embroidered flared skirt, a
                long-sleeved blouse that covers the midriff, and a matching dupatta worn as a hijab.
                The bridal lehenga is the quintessential Islamic bridal wear for South Asian
                fashion-influenced nikah ceremony celebrations, and the most popular colors in 2026
                are all represented in this collection. Bridal jewelry is an essential companion to
                the bridal lehenga: nikkah jewelry sets in kundan, gold, and pearl coordinate with
                the embroidery weight and color of South Asian bridal lehengas.
              </p>
              <p>
                The shalwar kameez — the tunic-and-trouser traditional attire most familiar to South
                Asian communities, and equivalent in bridal use to the sharara suit — offers a fluid
                alternative to the bridal lehenga for Muslim wedding traditions occasions. Both are
                forms of traditional attire rooted in South Asian fashion, both are fully compatible
                with Islamic marriage customs, and both require the same bridal jewelry and hijab
                coordination. The shalwar kameez in its bridal sharara form is particularly
                recommended for brides who want the visual impact of the lehenga without the
                structured waistband. The shalwar kameez is the Muslim bridal dress workhorse of the
                South Asian fashion wardrobe.
              </p>
              <p>
                The abaya as a wedding gown has its own internal range of styles in this collection.
                The Dubai kaftan — a single-piece abaya-silhouette gown with gold embroidery and a
                V-neck — is the most contemporary expression of the abaya as cultural dress for a
                nikah ceremony. The Moroccan takchita is a two-piece abaya-style set with a sheer
                embroidered outer layer over a long-sleeved inner dress — the most formally
                significant abaya form for grand wedding celebrations rooted in Middle Eastern
                culture. The African boubou is a wide-sleeved abaya-style kaftan that reflects West
                African Muslim wedding traditions. Each is a valid cultural expression of the abaya
                as Islamic bridal wear, and each coordinates with a shayla hijab to complete the
                modest wedding gown look. The abaya in all its regional forms is united by a single
                principle: full coverage as an expression of faith. An abaya by any regional name —
                caftan, kaftan, boubou, takchita — is still an abaya at its core.
              </p>
              <p>
                Completing the Muslim bridal dress look requires bridal jewelry and footwear that
                coordinate with the chosen cultural dress — and cultural dress is never complete
                without accessories that match its embellishment level. Bridal jewelry in this
                collection ranges from gold kundan sets and pearl necklaces suited to bridal lehenga
                looks, to simpler rhinestone sets that work with abaya-style wedding gown styles.
                Jutti — traditional flat embroidered slippers — are the traditional attire footwear
                for South Asian fashion-influenced bridal looks. Halal press-on nails complete the
                bridal jewelry layer at the detail level, offering wudu-friendly nail care that
                aligns with Islamic marriage customs without salon appointments before a nikah
                ceremony.
              </p>
            </div>

            {/* ── Groom section ──────────────────────────────────────────── */}
            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mt-14 mb-6">
              Muslim groom attire: the sherwani and matching outfit
            </h3>
            <div className="space-y-5 text-gray-600 text-base leading-relaxed">
              <p>
                Muslim wedding attire for the groom is called a sherwani — a traditional long coat
                (sherwani) that is the most formal and widely recognized Muslim wedding dress for
                grooms across Pakistani, Indian, and Middle Eastern Muslim communities in the US.
                The sherwani is a knee-length structured garment worn over a kurta and paired with
                matching trousers, a waistcoat, and traditional shoes. It is the traditional
                equivalent of a Western suit at a nikah, and it carries the cultural and Islamic
                wedding traditions significance that the bridal lehenga carries for the bride.
                Muslim bridal fashion for the groom begins and ends with the sherwani. The sherwani
                is the Muslim wedding dress equivalent of the bridal lehenga: both are the defining
                traditional garment of their wearer's role in the ceremony.
              </p>
              <p>
                The sherwani comes in a full range of traditional and cultural expressions across
                Pakistani and Indian Muslim communities. Pakistani sherwani styles tend toward
                heavily embroidered silk or velvet in jewel tones with gold or silver thread. Indian
                sherwani styles are equally traditional but more varied in silhouette. Both Pakistani
                and Indian sherwani traditions incorporate the shalwar kameez as the foundational
                garment layer beneath the sherwani — the kurta worn under the sherwani is itself a
                traditional shalwar kameez tunic. The cultural sherwani-over-kurta look is a natural
                extension of the everyday shalwar kameez into formal, traditional wedding dress
                territory. A well-chosen Middle Eastern dishdasha (long robe) serves the same
                cultural function as the sherwani in Arab Muslim communities. Across Pakistani,
                Indian, and Middle Eastern traditions, the sherwani or its regional equivalent is
                universally recognized as the Muslim wedding dress for the groom.
              </p>
              <p>
                For the nikah, the sherwani is the non-negotiable traditional choice for Pakistani
                and Indian Muslim grooms. At the nikah, the groom's sherwani is expected to
                coordinate in color with the bride's bridal lehenga — a cultural practice consistent
                across Pakistani and Indian Islamic wedding traditions. US-based Muslim bridal
                fashion advisors take nikah coordination seriously: a Pakistani or Indian couple
                whose sherwani and lehenga clash photographs poorly, and this is considered a
                cultural oversight worth avoiding. The Middle Eastern groom equivalent — a formal
                white thobe with a bisht ceremonial cloak — follows the same cultural logic of
                deliberate coordination with the bride's wedding dress. The hijab worn by the bride
                at the nikah is the most ceremonially significant hijab of the entire wedding
                celebration.
              </p>
              <p>
                Beyond the nikah, the walima reception calls for a second sherwani or a more relaxed
                traditional look. Pakistani grooms often wear a lighter sherwani at the walima — in
                cream or champagne. Indian grooms may wear a shalwar kameez set with a waistcoat at
                the walima. The walima sherwani or shalwar kameez is still cultural dress, still
                traditional — it is not casual — but it allows more flexibility than the nikah look.
                The walima is where the cultural range of the sherwani is most visible: Pakistani
                and Indian grooms use the walima to express a slightly more personal traditional
                aesthetic than the formal nikah sherwani demands. Middle Eastern Muslim grooms
                similarly use the walima to wear a more relaxed traditional thobe.
              </p>
              <p>
                The mehndi event calls for a different sherwani palette entirely. At mehndi events,
                Pakistani and Indian grooms typically wear a traditional yellow or green sherwani,
                reflecting the cultural association of these colors with the mehndi celebration.
                Yellow is the most traditional Pakistani mehndi color for grooms; Indian mehndi
                traditions vary, with yellow, green, and ivory all appearing. A cultural dress choice
                for mehndi that mirrors the bride's mehndi outfit — often in matching tones — is
                widely practiced across Pakistani and Indian Islamic wedding traditions in the US.
                The walima sherwani and mehndi sherwani together with the nikah sherwani mean that a
                Pakistani or Indian Muslim groom may wear three separate traditional sherwani looks
                across the full wedding celebration. The mehndi hijab is often brighter and more
                decorative than the nikah hijab — reflecting the festive rather than solemn nature
                of the mehndi occasion.
              </p>
              <p>
                The hijab worn by female guests at a nikah, walima, and mehndi is the counterpart to
                the groom's sherwani — both signal the Islamic nature of the celebration. Pakistani
                and Indian Muslim bridal fashion for female guests typically involves the shalwar
                kameez or a formal bridal lehenga for close relatives. The mehndi is where the most
                colorful cultural dress appears: Pakistani and Indian women guests at a mehndi wear
                vibrant colors — fuschia, orange, yellow, green — creating the festive atmosphere
                the occasion demands. A hijab-wearing female guest at a walima in a traditional
                shalwar kameez, a sherwani-wearing groom, and a bride in a bridal lehenga together
                create the defining visual tableau of Pakistani and Indian Islamic wedding traditions
                in the US, reflecting Muslim bridal fashion and the Muslim wedding dress tradition at
                their most culturally complete. The hijab unifies female guests across Pakistani,
                Indian, and Middle Eastern backgrounds at every Muslim wedding event.
              </p>
            </div>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <div className="mt-16 border-t border-pink-100 pt-10">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-8">
                Frequently asked questions
              </h3>
              <div className="space-y-1">
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">
                      What is Muslim wedding attire called?
                    </span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">
                    Muslim wedding attire is called by different names depending on the bride or
                    groom's cultural background. For brides, the most common terms are the abaya (a
                    long, floor-length modest gown also worn as a bridal caftan or kaftan), the
                    bridal lehenga (a flared embroidered skirt with matching blouse and dupatta),
                    and the shalwar kameez or sharara (a tunic-and-trouser or divided-skirt suit).
                    For grooms, the traditional long coat (sherwani) is the defining Muslim wedding
                    dress across Pakistani, Indian, and broader South Asian communities.
                  </p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">
                      Is an abaya the same as a kaftan or caftan for a Muslim wedding?
                    </span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">
                    Yes, in bridal use. An abaya is a long, floor-length, long-sleeved modest robe —
                    and in its bridal form, the abaya is functionally equivalent to a bridal caftan
                    or kaftan. Dubai kaftans, Moroccan takchitas, and African boubous are all
                    regional expressions of the abaya silhouette: full coverage, floor-length, and
                    hijab-friendly.
                  </p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">
                      What is the difference between a shalwar kameez and a sharara?
                    </span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">
                    A shalwar kameez is a tunic-and-trouser set — the foundational traditional attire
                    of South Asian fashion. A sharara is a bridal variation where the trouser portion
                    is replaced with a wide, heavily flared divided skirt. In bridal use, the two are
                    equivalent — both provide full modest coverage and serve as Islamic bridal wear
                    for nikah ceremony occasions.
                  </p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">
                      What does a Muslim groom wear at a nikah?
                    </span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">
                    A Muslim groom typically wears a sherwani at a nikah — a traditional long
                    structured coat worn over a kurta and matching trousers. Pakistani and Indian
                    Muslim grooms choose a sherwani that coordinates with the bride's bridal lehenga
                    in color. Arab and Middle Eastern Muslim grooms may wear a formal thobe or
                    dishdasha.
                  </p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">
                      What do female guests wear to a Muslim wedding?
                    </span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">
                    Female guests at a Muslim wedding typically wear a shalwar kameez or bridal
                    lehenga with a hijab. At the nikah, modest and formal coverage is expected. At
                    the mehndi, colorful and festive cultural dress is the norm. At the walima
                    reception, a smart shalwar kameez or formal lehenga with hijab is appropriate.
                  </p>
                </details>
              </div>
            </div>

          </article>
        </main>

      </div>
    </div>
  );
}