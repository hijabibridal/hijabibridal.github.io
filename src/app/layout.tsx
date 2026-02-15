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