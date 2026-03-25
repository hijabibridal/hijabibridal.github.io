import './globals.css'
import { Poppins } from 'next/font/google'

// Using the correct path for your Header based on your file structure
import Header from '../components/Layout/Header' 
import Footer from '../components/Layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Hijabi Bridal | Muslim Wedding Dresses, Lehengas & Inspiration',
  description: 'Explore our Amazon collection of premium hijabi bridal wear. From elegant Muslim wedding dresses to Muslim lehengas and accessories. Find everything for your special day.',
  openGraph: {
    siteName: 'Hijabi Bridal',
    title: 'Hijabi Bridal | Muslim Wedding Dresses, Lehengas & Inspiration',
    description: 'Explore our Amazon collection of premium hijabi bridal wear. From elegant Muslim wedding dresses to accessories.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // JSON-LD to explicitly define the Site Name for Google
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hijabi Bridal",
    "alternateName": ["HijabiBridal", "HB Bridal"],
    "url": "https://hijabibridal.github.io/" 
  };

  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="2LM4mclQm-UZp-Lft6E04fLlzcmmkafpqfNbMVntsqs" />

        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Injected Site Name Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
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