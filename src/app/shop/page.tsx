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

const faqSchema = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "What is Muslim wedding attire called?", "acceptedAnswer": {"@type": "Answer", "text": "Muslim wedding attire is called by different names depending on the bride or groom’s cultural background. For brides, the most common terms are the abaya (a long, floor-length modest gown also worn as a bridal caftan or kaftan), the bridal lehenga (a flared embroidered skirt with matching blouse and dupatta), and the shalwar kameez or sharara (a tunic-and-trouser or divided-skirt suit). For grooms, the traditional long coat (sherwani) is the defining muslim wedding dress across Pakistani, Indian, and broader South Asian communities."}}, {"@type": "Question", "name": "Is an abaya the same as a kaftan or caftan for a Muslim wedding?", "acceptedAnswer": {"@type": "Answer", "text": "Yes, in bridal use. An abaya is a long, floor-length, long-sleeved modest robe — and in its bridal form, the abaya is functionally equivalent to a bridal caftan or kaftan. Dubai kaftans, Moroccan takchitas, and African boubous are all regional expressions of the abaya silhouette: full coverage, floor-length, and hijab-friendly."}}, {"@type": "Question", "name": "What is the difference between a shalwar kameez and a sharara?", "acceptedAnswer": {"@type": "Answer", "text": "A shalwar kameez is a tunic-and-trouser set — the foundational traditional attire of South Asian fashion. A sharara is a bridal variation where the trouser portion is replaced with a wide, heavily flared divided skirt. In bridal use, the two are equivalent — both provide full modest coverage and serve as islamic bridal wear for nikah ceremony occasions."}}, {"@type": "Question", "name": "What does a Muslim groom wear at a nikah?", "acceptedAnswer": {"@type": "Answer", "text": "A Muslim groom typically wears a sherwani at a nikah — a traditional long structured coat worn over a kurta and matching trousers. Pakistani and Indian Muslim grooms choose a sherwani that coordinates with the bride’s bridal lehenga in color. Arab and Middle Eastern Muslim grooms may wear a formal thobe or dishdasha."}}, {"@type": "Question", "name": "What do female guests wear to a Muslim wedding?", "acceptedAnswer": {"@type": "Answer", "text": "Female guests at a Muslim wedding typically wear a shalwar kameez or bridal lehenga with a hijab. At the nikah, modest and formal coverage is expected. At the mehndi, colorful and festive cultural dress is the norm. At the walima reception, a smart shalwar kameez or formal lehenga with hijab is appropriate."}}]};

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

      {/* ── HEADER ─────────────────────────────────────────────────────────
          PAA question + condensed first paragraph.
          max-w-lg keeps it roughly half-width so the product grid is
          visible above the fold immediately. ──────────────────────────── */}
      <header className="py-10 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-1">
            The <span className="text-pink-600">Boutique</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs mb-5">
            {productData.products.length} Items Available
          </p>
          {/* Half-width intro — answers PAA, keeps products visible above fold */}
          <div className="max-w-lg">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-pink-600 mb-2">
              What is a Muslim wedding attire called?
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Muslim wedding attire is called by many names depending on the bride's cultural background — but the most common terms are the abaya (a long, flowing modest robe also worn as a bridal caftan or kaftan), the bridal lehenga (a flared skirt with matching blouse and dupatta), and the shalwar kameez or sharara (a tunic-and-trouser or divided-skirt suit). Each is a form of islamic bridal wear that fulfills the modesty requirements of a nikah ceremony while reflecting the bride's heritage. This muslim bridal dress collection brings together all of these traditional attire styles — abaya, lehenga, shalwar kameez, and more — in one place, available on Amazon for US brides.
            </p>
          </div>
        </div>
      </header>

      {/* ── BODY: sidebar + product grid + article below ─────────────────── */}
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16">

        {/* ── LEFT SIDEBAR — sticky, independently scrollable ──────────────
            lg:max-h-[calc(100vh-8rem)] + overflow-y-auto means both the
            Item and Color menus are always reachable without scrolling
            the product grid. Custom scrollbar matches brand palette. ──── */}
        <aside className="lg:w-64 shrink-0">

          {/* Mobile: horizontal pill row for quick color/item access */}
          <div className="lg:hidden mb-6 flex flex-wrap gap-2">
            {colorCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/category/${cat.slug}`}
                className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-pink-400 hover:text-pink-600 transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Desktop: sticky scrollable nav */}
          <div className="hidden lg:block sticky top-28
                          max-h-[calc(100vh-8rem)] overflow-y-auto pr-2
                          [&::-webkit-scrollbar]:w-1
                          [&::-webkit-scrollbar-track]:bg-transparent
                          [&::-webkit-scrollbar-thumb]:bg-pink-200
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          space-y-4">

            <details className="group border-b border-gray-100 pb-4" open>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">
                  Shop by Item
                </h3>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <ul className="mt-4 space-y-3 pl-2">
                {itemCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/shop/category/${cat.slug}`} className="text-sm font-bold text-gray-500 hover:text-pink-600 transition-all uppercase tracking-widest block">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <details className="group border-b border-gray-100 pb-4">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600">
                  Shop by Color
                </h3>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </summary>
              <ul className="mt-4 space-y-3 pl-2">
                {colorCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/shop/category/${cat.slug}`} className="text-sm font-bold text-gray-500 hover:text-pink-600 transition-all uppercase tracking-widest block">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

          </div>
        </aside>

        {/* ── MAIN COLUMN: products then article ───────────────────────────
            The product grid renders first and scrolls naturally.
            The article sits stationary below — no special scroll needed,
            the browser\'s natural document flow handles this correctly.
            On mobile this stacks: pills → products → article → FAQs. ─── */}
        <main className="flex-1 min-w-0">

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 mb-24">
            {shuffledProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {/* ── Article — bride section ─────────────────────────────────── */}
          <article className="border-t-2 border-pink-100 pt-16 max-w-3xl">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-8">
              What is a Muslim wedding attire called?
            </h2>
            <div className="space-y-5 text-gray-600 text-base leading-relaxed">
              <p className="text-gray-600 text-base leading-relaxed">What is a Muslim wedding attire called — and which style is right for you? The abaya, in its bridal form, is the most widely recognized piece of islamic bridal wear for brides from Arab, North African, and convert backgrounds. In its bridal incarnation, the abaya functions as a cultural dress statement as much as a religious one — it signals modest elegance through its floor-length, long-sleeved silhouette. The bridal abaya in white, champagne, or gold is the leading wedding gown choice for nikah ceremony looks that draw from Middle Eastern culture. In this collection, the abaya finds expression in Dubai-style kaftans and Moroccan takchita sets — different regional names for the same abaya-rooted modest wedding gown tradition. Every abaya style here follows the islamic marriage customs of full coverage and dignified presentation.</p>
              <p className="text-gray-600 text-base leading-relaxed">The bridal lehenga is the dominant cultural dress for muslim bridal dress occasions among South Asian fashion communities — Pakistani, Indian, and Bangladeshi-American brides. A bridal lehenga consists of a heavily embroidered flared skirt, a long-sleeved blouse that covers the midriff, and a matching dupatta worn as a hijab. The bridal lehenga is the quintessential islamic bridal wear for South Asian fashion-influenced nikah ceremony celebrations, and the most popular colors in 2026 are all represented in this collection. Bridal jewelry is an essential companion to the bridal lehenga: nikkah jewelry sets in kundan, gold, and pearl coordinate with the embroidery weight and color of South Asian bridal lehengas.</p>
              <p className="text-gray-600 text-base leading-relaxed">The shalwar kameez — the tunic-and-trouser traditional attire most familiar to South Asian communities, and equivalent in bridal use to the sharara suit — offers a fluid alternative to the bridal lehenga for muslim wedding traditions occasions. Both are forms of traditional attire rooted in South Asian fashion, both are fully compatible with islamic marriage customs, and both require the same bridal jewelry and hijab coordination. The shalwar kameez in its bridal sharara form is particularly recommended for brides who want the visual impact of the lehenga without the structured waistband. The shalwar kameez is the muslim bridal dress workhorse of the South Asian fashion wardrobe.</p>
              <p className="text-gray-600 text-base leading-relaxed">The abaya as a wedding gown has its own internal range of styles in this collection. The Dubai kaftan — a single-piece abaya-silhouette gown with gold embroidery and a V-neck — is the most contemporary expression of the abaya as cultural dress for a nikah ceremony. The Moroccan takchita is a two-piece abaya-style set with a sheer embroidered outer layer over a long-sleeved inner dress — the most formally significant abaya form for grand wedding celebrations rooted in Middle Eastern culture. The African boubou is a wide-sleeved abaya-style kaftan that reflects West African Muslim wedding traditions. Each is a valid cultural expression of the abaya as islamic bridal wear, and each coordinates with a shayla hijab to complete the modest wedding gown look. The abaya in all its regional forms is united by a single principle: full coverage as an expression of faith. An abaya by any regional name — caftan, kaftan, boubou, takchita — is still an abaya at its core.</p>
              <p className="text-gray-600 text-base leading-relaxed">Completing the muslim bridal dress look requires bridal jewelry and footwear that coordinate with the chosen cultural dress — and cultural dress is never complete without accessories that match its embellishment level. Bridal jewelry in this collection ranges from gold kundan sets and pearl necklaces suited to bridal lehenga looks, to simpler rhinestone sets that work with abaya-style wedding gown styles. Jutti — traditional flat embroidered slippers — are the traditional attire footwear for South Asian fashion-influenced bridal looks. Halal press-on nails complete the bridal jewelry layer at the detail level, offering wudu-friendly nail care that aligns with islamic marriage customs without salon appointments before a nikah ceremony.</p>
            </div>

            {/* ── Groom section ──────────────────────────────────────────── */}
            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mt-14 mb-6">
              Muslim groom attire: the sherwani and matching outfit
            </h3>
            <div className="space-y-5 text-gray-600 text-base leading-relaxed">
              <p className="text-gray-600 text-base leading-relaxed">Muslim wedding attire for the groom is called a sherwani — a traditional long coat (sherwani) that is the most formal and widely recognized muslim wedding dress for grooms across Pakistani, Indian, and Middle Eastern Muslim communities in the US. The sherwani is a knee-length structured garment worn over a kurta and paired with matching trousers, a waistcoat, and traditional shoes. It is the traditional equivalent of a Western suit at a nikah, and it carries the cultural and Islamic wedding traditions significance that the bridal lehenga carries for the bride. Muslim bridal fashion for the groom begins and ends with the sherwani. The sherwani is the muslim wedding dress equivalent of the bridal lehenga: both are the defining traditional garment of their wearer's role in the ceremony.</p>
              <p className="text-gray-600 text-base leading-relaxed">The sherwani comes in a full range of traditional and cultural expressions across Pakistani and Indian Muslim communities. Pakistani sherwani styles tend toward heavily embroidered silk or velvet in jewel tones with gold or silver thread. Indian sherwani styles are equally traditional but more varied in silhouette. Both Pakistani and Indian sherwani traditions incorporate the shalwar kameez as the foundational garment layer beneath the sherwani — the kurta worn under the sherwani is itself a traditional shalwar kameez tunic. The cultural sherwani-over-kurta look is a natural extension of the everyday shalwar kameez into formal, traditional wedding dress territory. A well-chosen Middle Eastern dishdasha (long robe) serves the same cultural function as the sherwani in Arab Muslim communities. Across Pakistani, Indian, and Middle Eastern traditions, the sherwani or its regional equivalent is universally recognized as the muslim wedding dress for the groom.</p>
              <p className="text-gray-600 text-base leading-relaxed">For the nikah, the sherwani is the non-negotiable traditional choice for Pakistani and Indian Muslim grooms. At the nikah, the groom's sherwani is expected to coordinate in color with the bride's bridal lehenga — a cultural practice consistent across Pakistani and Indian Islamic wedding traditions. US-based Muslim bridal fashion advisors take nikah coordination seriously: a Pakistani or Indian couple whose sherwani and lehenga clash photographs poorly, and this is considered a cultural oversight worth avoiding. The Middle Eastern groom equivalent — a formal white thobe with a bisht ceremonial cloak — follows the same cultural logic of deliberate coordination with the bride's wedding dress. The hijab worn by the bride at the nikah is the most ceremonially significant hijab of the entire wedding celebration.</p>
              <p className="text-gray-600 text-base leading-relaxed">Beyond the nikah, the walima reception calls for a second sherwani or a more relaxed traditional look. Pakistani grooms often wear a lighter sherwani at the walima — in cream or champagne. Indian grooms may wear a shalwar kameez set with a waistcoat at the walima. The walima sherwani or shalwar kameez is still cultural dress, still traditional — it is not casual — but it allows more flexibility than the nikah look. The walima is where the cultural range of the sherwani is most visible: Pakistani and Indian grooms use the walima to express a slightly more personal traditional aesthetic than the formal nikah sherwani demands. Middle Eastern Muslim grooms similarly use the walima to wear a more relaxed traditional thobe.</p>
              <p className="text-gray-600 text-base leading-relaxed">The mehndi event calls for a different sherwani palette entirely. At mehndi events, Pakistani and Indian grooms typically wear a traditional yellow or green sherwani, reflecting the cultural association of these colors with the mehndi celebration. Yellow is the most traditional Pakistani mehndi color for grooms; Indian mehndi traditions vary, with yellow, green, and ivory all appearing. A cultural dress choice for mehndi that mirrors the bride's mehndi outfit — often in matching tones — is widely practiced across Pakistani and Indian Islamic wedding traditions in the US. The walima sherwani and mehndi sherwani together with the nikah sherwani mean that a Pakistani or Indian Muslim groom may wear three separate traditional sherwani looks across the full wedding celebration. The mehndi hijab is often brighter and more decorative than the nikah hijab — reflecting the festive rather than solemn nature of the mehndi occasion.</p>
              <p className="text-gray-600 text-base leading-relaxed">The hijab worn by female guests at a nikah, walima, and mehndi is the counterpart to the groom's sherwani — both signal the Islamic nature of the celebration. Pakistani and Indian Muslim bridal fashion for female guests typically involves the shalwar kameez or a formal bridal lehenga for close relatives. The mehndi is where the most colorful cultural dress appears: Pakistani and Indian women guests at a mehndi wear vibrant colors — fuschia, orange, yellow, green — creating the festive atmosphere the occasion demands. A hijab-wearing female guest at a walima in a traditional shalwar kameez, a sherwani-wearing groom, and a bride in a bridal lehenga together create the defining visual tableau of Pakistani and Indian Islamic wedding traditions in the US, reflecting Muslim bridal fashion and the muslim wedding dress tradition at their most culturally complete. The hijab unifies female guests across Pakistani, Indian, and Middle Eastern backgrounds at every Muslim wedding event.</p>
            </div>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <div className="mt-16 border-t border-pink-100 pt-10">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-8">
                Frequently asked questions
              </h3>
              <div className="space-y-1">
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">What is Muslim wedding attire called?</span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">Muslim wedding attire is called by different names depending on the bride or groom’s cultural background. For brides, the most common terms are the abaya (a long, floor-length modest gown also worn as a bridal caftan or kaftan), the bridal lehenga (a flared embroidered skirt with matching blouse and dupatta), and the shalwar kameez or sharara (a tunic-and-trouser or divided-skirt suit). For grooms, the traditional long coat (sherwani) is the defining muslim wedding dress across Pakistani, Indian, and broader South Asian communities.</p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">Is an abaya the same as a kaftan or caftan for a Muslim wedding?</span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">Yes, in bridal use. An abaya is a long, floor-length, long-sleeved modest robe — and in its bridal form, the abaya is functionally equivalent to a bridal caftan or kaftan. Dubai kaftans, Moroccan takchitas, and African boubous are all regional expressions of the abaya silhouette: full coverage, floor-length, and hijab-friendly.</p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">What is the difference between a shalwar kameez and a sharara?</span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">A shalwar kameez is a tunic-and-trouser set — the foundational traditional attire of South Asian fashion. A sharara is a bridal variation where the trouser portion is replaced with a wide, heavily flared divided skirt. In bridal use, the two are equivalent — both provide full modest coverage and serve as islamic bridal wear for nikah ceremony occasions.</p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">What does a Muslim groom wear at a nikah?</span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">A Muslim groom typically wears a sherwani at a nikah — a traditional long structured coat worn over a kurta and matching trousers. Pakistani and Indian Muslim grooms choose a sherwani that coordinates with the bride’s bridal lehenga in color. Arab and Middle Eastern Muslim grooms may wear a formal thobe or dishdasha.</p>
                </details>
                <details className="group border-b border-pink-50">
                  <summary className="cursor-pointer flex justify-between items-start gap-4 py-4 list-none">
                    <span className="font-bold text-gray-900 group-open:text-pink-600 text-sm leading-snug transition-colors">What do female guests wear to a Muslim wedding?</span>
                    <span className="transition-transform group-open:rotate-180 shrink-0 mt-0.5 text-gray-400">
                      <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M19 9l-7 7-7-7"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 text-sm leading-relaxed pb-5 pt-1 max-w-2xl">Female guests at a Muslim wedding typically wear a shalwar kameez or bridal lehenga with a hijab. At the nikah, modest and formal coverage is expected. At the mehndi, colorful and festive cultural dress is the norm. At the walima reception, a smart shalwar kameez or formal lehenga with hijab is appropriate.</p>
                </details>
              </div>
            </div>

          </article>
        </main>

      </div>
    </div>
  );
}