import React from 'react';
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'; // Added Vercel Analytics

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Pet Gadget Insider',
    template: '%s',
  },
  description: 'Expert reviews of smart pet supplies and gadgets',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Google Analytics Script - EXACTLY as provided */}
        <Script 
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=G-FWPH3KWR2Z" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FWPH3KWR2Z');
          `}
        </Script>
        
        {/* Googlebot Meta Tag - Added for better crawling */}
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Robots Meta Tag - Added to accelerate crawling (all search engines) */}
        <meta name="robots" content="all" />
        
        {/* Bing Verification */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#FFAC1C" />
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/images/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/favicons/android-chrome-512x512.png" />
      </head>
      <body className={`${font.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <ScrollToTop />
        <Analytics /> {/* Added Vercel Analytics component */}
      </body>
    </html>
  )
}