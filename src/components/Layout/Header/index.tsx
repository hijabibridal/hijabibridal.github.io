import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Header() {
  // Mobile menu items (same as desktop for consistency)
  const mobileMenuItems = [
    { name: 'Pet Supplies Reviews', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        {/* Mobile Horizontal Menu (shows only on mobile) */}
        <div className="md:hidden mb-2 overflow-x-auto">
          <nav className="flex space-x-4 py-2">
            {mobileMenuItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className="whitespace-nowrap text-gray-700 hover:text-blue-600 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side - Logo and Nav */}
          <div className="flex items-center space-x-6 w-full md:w-auto">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/Logo/pet-gadget-insider-logo.png"
                alt="Pet Gadget Insider"
                width={300}
                height={100}
                priority
                className="h-auto"
                style={{
                  minWidth: '280px',
                }}
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              {mobileMenuItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className="text-gray-700 hover:text-blue-600 font-medium text-base"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side - Search Bar */}
          <div className="hidden md:block w-full md:w-auto">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-2 md:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}