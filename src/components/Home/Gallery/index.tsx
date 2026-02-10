'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ExpertData } from '@/components/data/petProducts'

const Gallery = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className='text-center mb-12'>
          <p className='text-red-600 text-lg font-medium mb-3 tracking-widest uppercase'>
            Meet the Experts
          </p>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white'>
            Amazon's Top Rated Pet Feeders
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {ExpertData.map((product) => {
            const isAmazon = product.imgSrc.includes('m.media-amazon.com');
            
            return (
              <div
                key={`${product.name}-${product.profession}`}
                className='bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'>
                
                <div className='relative h-60 w-full bg-white dark:bg-gray-700'>
                  <Image
                    src={product.imgSrc}
                    alt={`${product.name} ${product.profession}`}
                    fill
                    className='object-contain p-4'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={isAmazon} // Fix for Amazon images
                  />
                </div>

                <div className='p-5'>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-1'>
                    {product.name}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>
                    {product.profession}
                  </p>
                  <p className='text-red-600 font-bold text-lg mb-4'>
                    {product.price}
                  </p>
                  
                  <ul className='space-y-2 mb-5'>
                    {product.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className='flex items-start'>
                        <svg className="h-4 w-4 text-red-600 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className='text-gray-700 dark:text-gray-300 text-sm'>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={product.internalLink} // Changed to internalLink
                    className='block w-full text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors'>
                    View More Info
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Gallery