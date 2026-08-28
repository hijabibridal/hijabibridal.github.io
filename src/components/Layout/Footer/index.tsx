// src/components/Layout/Footer/index.tsx
import React, { FC } from 'react'
import Link from 'next/link'

const Footer: FC = () => {
  return (
    <footer className="bg-darkmode py-4">
      <div className="container mx-auto px-4">
        <div className="border-t border-grey/15 dark:border-white/15 py-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-black/70 dark:text-white/70">
            &copy;2026 - Hijabi Bridal, 4 Chita Abreu, Santiago, Dominican Republic. All Rights Reserved.{' '}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer