// src/components/Layout/Footer/index.tsx
import React, { FC } from 'react'
import Link from 'next/link'

const Footer: FC = () => {
  return (
    <footer className="bg-darkmode py-4">
      <div className="container mx-auto px-4">
        <div className="border-t border-grey/15 dark:border-white/15 py-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-black/70 dark:text-white/70">
            &copy;2026 - Hijabi Bridal, 4 Chita Abreu, Santiago, Dominican Republic. Questions? bridalhijabi@gmail.com All Rights Reserved.{' '}
          </p>
          <div className="mt-4 md:mt-0 flex">
            <Link
              href="/legal"
              className="text-sm text-black/70 dark:text-white/70 px-5 border-r border-grey/15 dark:border-white/15 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Legal
            </Link>
	  </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer