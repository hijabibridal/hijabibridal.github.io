import './globals.css'
import { Poppins } from 'next/font/google'

// We are moving UP two folders from src/app/ to reach src/components/
import Navbar from '../components/layout/header' 
import Footer from '../components/layout/footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Hijabi Bridal',
  description: 'Modest Wedding Inspiration & Shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}