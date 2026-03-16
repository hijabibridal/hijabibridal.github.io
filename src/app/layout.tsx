import './globals.css'
import { Poppins } from 'next/font/google'

// Updated to match your "Layout" (capital L) folder structure
import Navbar from '../components/Layout/Header' 
import Footer from '../components/Layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Hijabi Bridal',
  description: 'Modest Wedding Inspiration & Shop',
  // STEP 1: Fix the Site Name for Google Search Results
  openGraph: {
    siteName: 'Hijabi Bridal',
    title: 'Hijabi Bridal',
    description: 'Modest Wedding Inspiration & Shop',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        {/* RESTORED: Google Site Verification for Search Console ownership */}
        <meta name="google-site-verification" content="2LM4mclQm-UZp-Lft6E04fLlzcmmkafpqfNbMVntsqs" />

        {/* STEP 2: Force Google to see the new favicon and override old cache */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

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
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K885VPJ5"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}