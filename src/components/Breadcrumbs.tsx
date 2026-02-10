'use client'
import Link from 'next/link'

interface BreadcrumbLink {
  href: string
  text: string
  prefetch?: boolean
}

interface BreadcrumbProps {
  links: BreadcrumbLink[]
  currentPage: string
}

export default function Breadcrumbs({ links, currentPage }: BreadcrumbProps) {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {links.map((link, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            <Link 
              href={link.href}
              prefetch={link.prefetch !== false}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {link.text}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            {currentPage}
          </span>
        </li>
      </ol>
    </nav>
  )
}