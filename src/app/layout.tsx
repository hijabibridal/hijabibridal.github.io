import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/layout/header' 
import Footer from '@/components/layout/footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Hijabi Bridal | Modest Muslim Wedding Inspiration',
  description: 'Discover modest wedding dresses, hijabs, and accessories for the modern bride.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}