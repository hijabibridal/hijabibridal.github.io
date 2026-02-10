'use client'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section id='home-section' className='bg-gray-50 dark:bg-gray-700'>
      <div className='container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 -mt-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 items-start'>
          <div className='col-span-6'>
            <h1 className='text-3xl lg:text-6xl font-semibold mb-6 text-black dark:text-white md:4px lg:text-start text-center'>
              Find the best smart pet supplies
            </h1>
            <p className='text-black/55 dark:text-white/50 lg:text-base font-normal mb-4 lg:text-start text-center'>
              Get the latest scoop on smart pet supplies like automatic pet feeders and other pet friendly gadgets. We search the best pet care products in Amazon's pet store and bring them to you so you don't have to guess.{' '}
            </p>
            <p className='text-black/55 dark:text-white/50 lg:text-base font-normal mb-4 lg:text-start text-center'> 
              Discover the latest in smart pet care, from automatic pet feeders to innovative pet friendly gadgets—all in one spot. We research and review top-rated products from Amazon’s pet store, evaluating only the best in smart pet supplies across every category in our reviews. 
            </p>
            <p className='text-black/55 dark:text-white/50 lg:text-base font-normal mb-4 lg:text-start text-center'> 
              Each of our smart pet supplies is carefully selected from the top five contenders, ensuring your furry friend gets nothing but the finest. Looking for the best smart pet feeder? Our expert insights break down key features so you can choose what matters most. Welcome to your go-to pet shop for tech-savvy solutions that make life better—for you and your pet.
            </p>
            <div className='md:flex align-middle justify-center lg:justify-start gap-2'>
              <Link
                href='/blog'
                className='text-lg w-full md:w-auto font-medium rounded-full text-white py-2 px-4 bg-primary hover:text-primary lg:px-8 mr-0 border border-primary hover:bg-transparent'>
                Pet Supplies Review Blog
              </Link>
              <Link
                href='/about'
                className='flex border w-full md:w-auto mt-2 border-primary justify-center rounded-full text-lg font-medium items-center py-2 px-5 text-primary hover:text-white hover:bg-primary'>
                About Us
              </Link>
            </div>
          </div>
          <div className='col-span-6 flex justify-center relative mt-4 lg:mt-0'>
            <div className='flex bg-white p-1 gap-2 items-center bottom-2 left-2 rounded-md absolute'>
              <Image
                src={'/images/cat.png'}
                alt='pet-food'
                width={60}
                height={60}
                className='w-8 h-8 md:w-10 md:h-10'
              />
              <p className='text-xs font-medium'>
                75+ Pet Feeder <br /> Reviews.
              </p>
            </div>
            <Image
              src='/images/dogcat.png'
              alt='dog-cat-feeder'
              width={800}
              height={645}
              className='w-full h-auto'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero