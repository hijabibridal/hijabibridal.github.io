import './globals.css'
import { Poppins } from 'next/font/google'
import Script from 'next/script'

import Header from '../components/Layout/Header' 
import Footer from '../components/Layout/Footer'
import { CartProvider } from '@/context/CartContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  metadataBase: new URL('https://hijabibridal.github.io'),
  title: {
    default:  'Hijabi Bridal | Muslim Wedding Dresses, Muslim Lehengas & Halal Nails',
    template: '%s',
  },
  description: 'Shop premium Muslim wedding dresses, Muslim lehengas, bridal hijabs, dupattas and more — curated for US brides on Amazon. Free shipping, trusted seller.',
  applicationName: 'Hijabi Bridal',
  openGraph: {
    siteName: 'Hijabi Bridal',
    title: 'Hijabi Bridal | Muslim Wedding Dresses, Muslim Lehengas & Dupattas',
    description: 'Shop premium Muslim wedding dresses, Muslim lehengas, bridal hijabs, dupattas and more — curated for US brides on Amazon.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hijabi Bridal",
    "url": "https://hijabibridal.github.io/",
    "description": "Premium Muslim wedding dresses, bridal hijabs, Muslim lehengas, and nikkah accessories curated for United States brides.",
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
    "description": "Hijabi Bridal is the premier destination for modest Muslim bridal wear in the United States. We curate premium Muslim wedding dresses, Muslim lehengas, bridal hijabs, nikkah jewelry, and
