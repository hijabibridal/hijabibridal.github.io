import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
  className?: string;
}

export default function Breadcrumb({ 
  pageName,
  className = ""
}: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`mb-6 ${className}`}
    >
      <ol className="flex items-center text-sm">
        <li>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Home
          </Link>
        </li>
        <li className="mx-2 text-gray-400">/</li>
        <li className="text-gray-600">
          {pageName}
        </li>
      </ol>
    </nav>
  );
}