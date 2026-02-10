'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FeaturesData } from '@/app/api/data'
import { Icon } from '@iconify/react'

const Features = () => {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-20">
        <p className="text-primary text-lg font-normal mb-2 tracking-widest uppercase">
          FEATURES
        </p>
        <h2 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white mx-auto max-w-3xl">
          We review trending features in smart pet supplies.
        </h2>
      </div>

      {/* Feature cards */}
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FeaturesData.map((items, i) => (
            <div
              className="p-6 pt-20 relative rounded-3xl bg-gradient-to-b from-black/5 to-white dark:from-white/5 dark:to-black"
              key={i}
            >
              {/* Adjusted image positioning */}
              <div className="rounded-full flex justify-center absolute -top-16 left-0 right-0 mx-auto w-3/4">
                <Image
                  src={items.imgSrc}
                  alt={items.heading}
                  width={200}
                  height={200}
                  className="object-contain h-auto"
                />
              </div>

              {/* Card content */}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {items.heading}
                </h3>
                <p className="text-base text-black/50 dark:text-white/50 mt-2">
                  {items.subheading}
                </p>
                <div className="mt-4 flex justify-center">
                  <Link
                    href={items.path}
                    className="text-base font-medium text-primary hover:underline flex items-center"
                  >
                    Learn More
                    <Icon
                      icon="tabler:chevron-right"
                      width="20"
                      height="20"
                      className="ml-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features