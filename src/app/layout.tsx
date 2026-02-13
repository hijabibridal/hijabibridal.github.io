import React from 'react';
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import type { Metadata } from 'next'
import Script from 'next/script'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Hijabi Bridal',
    template: '%s',
  },
  description: 'Hijabi lehengas and nails and Muslim groom outfits for your Muslim wedding',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  // GSC Verification added here
  verification: {
    google: '2LM4mclQm-UZp-Lft6E04fLlzcmmkafpqfNbMVntsqs',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Google Analytics Script */}
        <Script 
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=G-K885VPJ5" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K885VPJ5');
          `}
        </Script>
        
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="robots" content="all" />
        
        {/* Bing Verification - You can also move this into the metadata object later */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#FFAC1C" />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png" />
      </head>
      <body className={font.className}>
        <Header />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  )
}