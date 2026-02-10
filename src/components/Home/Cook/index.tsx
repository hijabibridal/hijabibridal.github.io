'use client'
import Image from 'next/image'
import Link from 'next/link'

const Cook = () => {
  return (
    <section className='relative' id='cook-section'>
      <div className='container mx-auto lg:max-w-[--breakpoint-xl] md:max-w-[--breakpoint-md] px-4'>
        <div className='absolute right-0 bottom-[-18%] hidden lg:block'>
          <Image
            src='/images/Logo/pet-gadget-insider-logo.png'
            alt='pet-gadget-logo'
            width={231}
            height={311}
            className='object-contain'
          />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
          <div className='col-span-6 flex justify-start'>
            <Image
              src='/images/cat.png'
              alt='cat'
              width={636}
              height={808}
            />
          </div>
          <div className='col-span-6 flex flex-col justify-center'>
            <p className='text-primary text-lg font-normal mb-3 tracking-widest uppercase text-start'>
              explore with us
            </p>
            <h2 className='text-3xl lg:text-5xl font-semibold text-black dark:text-white text-start'>
              Discover the best in pet care.
            </h2>
            <p className='text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-6'>
              Explore with Pet Gadget Insider as we uncover the best in Amazon pet supplies. Discover pet friendly gadgets that smarten up your pet care so that you and your pets stay happy. 
            </p>
            <p className='text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-1'>
              From the latest automatic pet feeder to innovative pet care essentials, we curate products that simplify your routine. Stay updated on trending pet feeder technology and explore tips for smart pet supplies that enhance your daily pet care journey.
            </p>
            <p className='text-black/50 dark:text-white/50 md:text-lg font-normal mb-10 text-start mt-1'>
              Our passion for excellence and commitment to quality ensure that you'll find the smart pet supplies you're after. Search by topic or visit our Pet Supplies Reviews.
            </p>
            <Link 
              href="/blog" 
              className='text-xl font-medium rounded-full text-white py-5 px-6 bg-primary lg:px-10 mr-6 w-fit border border-primary hover:bg-transparent hover:text-primary transition-colors'
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cook