import React from 'react';
import Link from 'next/link';

// Define missing types
interface BreadcrumbLink {
  href: string;
  text: string;
}

interface BreadcrumbProps {
  pageName: string;
  pageDescription?: string;
}

export default function Breadcrumbs({
  pageName,
  pageDescription,
  links = []
}: BreadcrumbProps & { links?: BreadcrumbLink[] }) {
  return (
    <div className="bg-gray-50 py-3 px-5 rounded-lg mb-6">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </li>
          
          {links.map((link, i) => (
            <li key={link.href} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link 
                href={link.href} 
                className={`${i === links.length - 1 ? 'font-semibold' : 'text-blue-600 hover:underline'}`}
              >
                {link.text}
              </Link>
            </li>
          ))}
          
          <li aria-current="page">
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500 font-semibold">
              {pageName}
            </span>
          </li>
        </ol>
      </nav>
      
      {pageDescription && (
        <p className="mt-2 text-sm text-gray-600">{pageDescription}</p>
      )}
    </div>
  );
}