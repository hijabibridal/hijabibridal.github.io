import './globals.css'
import { Poppins } from 'next/font/google'

import Header from '../components/Layout/Header' 
import Footer from '../components/Layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  // metadataBase is required for Next.js to resolve absolute URLs and for
  // Google to correctly read og:site_name from the rendered HTML
  metadataBase: new URL('https://hijabibridal.github.io'),

  // title.template applies "| Hijabi Bridal" to every child page automatically
  title: {
    default:  'Hijabi Bridal | Muslim Wedding Dresses, Lehengas & Bridal Wear',
    template: '%s | Hijabi Bridal',
  },

  description: 'Shop premium Muslim wedding dresses, hijabi lehengas, bridal hijabs, nikkah jewelry and more — curated for US brides on Amazon. Free shipping, trusted seller.',

  // applicationName is the field Next.js exposes to Google as the site name
  applicationName: 'Hijabi Bridal',

  // alternates is the correct Next.js App Router way to emit hreflang tags.
  // Putting <link> tags manually in <head> alongside this would create duplicates.
  alternates: {
    canonical: 'https://hijabibridal.github.io/',
    languages: {
      'en-US':    'https://hijabibridal.github.io/',
      'x-default': 'https://hijabibridal.github.io/',
    },
  },

  openGraph: {
    siteName: 'Hijabi Bridal',
    title: 'Hijabi Bridal | Muslim Wedding Dresses, Lehengas & Bridal Wear',
    description: 'Shop premium Muslim wedding dresses, hijabi lehengas, bridal hijabs, nikkah jewelry and more — curated for US brides on Amazon.',
    type: 'website',
    url: 'https://hijabibridal.github.io/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // WebSite schema — the `name` field here is what Google uses for the
  // Search result site name when no other signal overrides it
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hijabi Bridal",
    // alternateName removed — alternate names can confuse Google's site name
    // picker and cause it to choose the wrong one (e.g. "GitHub")
    "url": "https://hijabibridal.github.io/",
    "description": "Premium Muslim wedding dresses, bridal hijabs, lehengas, and nikkah accessories curated for brides in the United States.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://hijabibridal.github.io/shop?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hijabi Bridal",
    "url": "https://hijabibridal.github.io/",
    "logo": "https://hijabibridal.github.io/images/hero-bridal.jpg",
    "description": "Hijabi Bridal is the premier destination for modest Muslim bridal wear in the United States. We curate premium Muslim wedding dresses, Muslim lehengas, bridal hijabs, nikkah jewelry, and accessories available on Amazon.",
    "foundingDate": "2024",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "knowsAbout": [
      "Muslim wedding dresses",
      "Hijabi bridal wear",
      "Modest fashion",
      "Islamic wedding attire",
      "Nikkah ceremony",
      "Bridal lehenga",
      "Bridal hijab"
    ],
    // Pinterest profile gives Google an independent external source to confirm
    // "Hijabi Bridal" as the site name — this is a strong fix for the GitHub naming issue
    "sameAs": [
      "https://www.pinterest.com/HijabiBridal/"
    ]
  };

  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="2LM4mclQm-UZp-Lft6E04fLlzcmmkafpqfNbMVntsqs" />
 
        <meta name="p:domain_verify" content="3d6ce4e3a3471fdbc715788c9beb3a91"/>

        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K885VPJ5');`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K885VPJ5"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}