import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header() {
  const menuItems = [
    { name: 'Shop', path: '/shop' },
    { name: 'Bride and Groom Guide', path: '/blog' }, // Updated Name
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo - Updated Branding */}
          <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-start">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-pink-600 tracking-tight uppercase">
                HIJABI BRIDAL
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className="text-gray-600 hover:text-pink-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}