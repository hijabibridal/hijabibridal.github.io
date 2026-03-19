'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs'
import productData from '@/data/bridal-products.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * RESTORED LOGIC: HoverImage Component
 * Handles the onMouseEnter/Leave state to swap images and update SEO attributes.
 */
const HoverImage = ({ product, cleanDescriptionIntro }: { product: any, cleanDescriptionIntro: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasSecondImage = product.images && product.images.length > 1;

  // Metadata Preservation: Use alt or figcaption from JSON
  const currentImage = isHovered && hasSecondImage ? product.images[1] : product.images[0];
  const currentAlt = currentImage.alt || currentImage.figcaption || product.name;

  return (
    <div 
      className="relative h-[450px] w-full p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image 
        src={`/images/${currentImage.url.replace(/^\//, '')}`} 
        alt={currentAlt}
        fill 
        className="object-contain transition-transform duration-500 group-hover:scale-105"
        unoptimized
      />
      {/* SEO: Figcaption specifically for the active image */}
      <figcaption className="sr-only">
        {currentImage.figcaption || cleanDescriptionIntro}
      </figcaption>
    </div>
  );
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = productData.mainCategories.find((c) => c.slug === slug);
  
  if (!category) notFound();

  const COLOR_PRIORITY = ['white', 'red', 'champagne'];
  const TYPE_PRIORITY = ['sharara', 'muslim-lehenga', 'muslim-wedding-dresses'];

  const filteredProducts = productData.products
    .filter((p) => p.mainCategorySlugs.includes(slug))
    .sort((a, b) => {
      const aColorMatch = COLOR_PRIORITY.findIndex(color => a.mainCategorySlugs.includes(color));
      const bColorMatch = COLOR_PRIORITY.findIndex(color => b.mainCategorySlugs.includes(color));
      if (aColorMatch !== bColorMatch) {
        if (aColorMatch !== -1 && bColorMatch !== -1) return aColorMatch - bColorMatch;
        if (aColorMatch !== -1) return -1;
        if (bColorMatch !== -1) return 1;
      }
      const aTypeMatch = TYPE_PRIORITY.findIndex(type => a.mainCategorySlugs.includes(type));
      const bTypeMatch = TYPE_PRIORITY.findIndex(type => b.mainCategorySlugs.includes(type));
      if (aTypeMatch !== bTypeMatch) {
        if (aTypeMatch !== -1 && bTypeMatch !== -1) return aTypeMatch - bTypeMatch;
        if (aTypeMatch !== -1) return -1;
        if (bTypeMatch !== -1) return 1;
      }
      return 0;
    });

  const descriptionLines = category.description.split('\n').filter(line => line.trim() !== '');
  const boldIntroTitle = descriptionLines[0];
  const regularParagraphs = descriptionLines.slice(1);

  let parsedFaqs = [];
  if (category.FAQ_schema) {
    try {
      parsedFaqs = JSON.parse(category.FAQ_schema);
    } catch (e) {
      console.error("FAQ Parsing Error:", e);
    }
  }

  const stylingTable = (category as any).stylingTable;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs 
        links={[{ href: '/', text: 'Home' }, { href: '/shop', text: 'Shop' }]} 
        currentPage={category.name} 
      />
      
      <div className="max-w-4xl mb-12">
        <h1 className="text-5xl font-black text-gray-900 mt-8 mb-6 uppercase tracking-tighter">
          {category.name} <span className="text-pink-600">Collection</span>
        </h1>

        <div className="relative mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-pink-600 rounded-full"></div>
          <p className="text-xl text-gray-700 leading-relaxed pl-8 font-bold italic">
            {boldIntroTitle}
          </p>
        </div>

        {regularParagraphs.map((para, i) => (
          <p key={i} className="text-lg text-gray-600 leading-relaxed mt-4">
            {para}
          </p>
        ))}
      </div>

      <hr className="mb-12 border-pink-100" />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => {
            /** * RESTORED ORIGINAL LOGIC: 
             * Handling <h2> tags, line breaks, and cleaning HTML exactly as before.
             */
            const hasH2 = product.description.includes('<h2');
            let introText = "";
            if (hasH2) {
              const splitIndex = product.description.indexOf('<h2');
              introText = product.description.substring(0, splitIndex);
            } else {
              const paragraphs = product.description.split(/<br\s*\/?>\s*<br\s*\/?>|\n\n/);
              introText = paragraphs[0];
            }
            const cleanDescriptionIntro = introText.replace(/<[^>]*>?/gm, '').trim();

            return (
              <div key={product.slug} className="group flex flex-col">
                <Link href={`/shop/product/${product.slug}`} className="block">
                  <figure className="relative overflow-hidden rounded-2xl border border-pink-50 bg-gray-50">
                    {/* Integrated the new HoverImage component here */}
                    <HoverImage 
                      product={product} 
                      cleanDescriptionIntro={cleanDescriptionIntro} 
                    />
                  </figure>
                  <h3 className="mt-4 text-center text-sm font-bold uppercase tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="sr-only" aria-hidden="true">
                  {product.images.slice(1).map((img: any, idx: number) => (
                    <Link key={idx} href={`/shop/product/${product.slug}`}>
                      <figure>
                        <img 
                          src={`/images/${img.url.replace(/^\//, '')}`} 
                          alt={img.alt || product.name} 
                        />
                        <figcaption>
                          {img.figcaption || img.alt || cleanDescriptionIntro}
                        </figcaption>
                      </figure>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg font-medium">
            Coming soon! We are currently curating the finest {category.name} pieces.
          </p>
        </div>
      )}

      {/* Long Content, Styling Table, and FAQ Schema remain untouched */}
      {category.longContent && (
        <section className="mt-24 max-w-4xl mx-auto border-t border-gray-100 pt-16">
          {stylingTable && (
            <div className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">
                {stylingTable.chartName}
              </h2>
              <div className="overflow-x-auto rounded-[2rem] border border-pink-100 shadow-sm bg-white">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-pink-50/30">
                      <th className="p-6 border-b border-pink-100"></th>
                      <th colSpan={stylingTable.columns.length} className="p-4 border-b border-pink-100 text-center">
                        <span className="text-[#db2777] font-black uppercase tracking-widest text-sm block">
                          "{stylingTable.topEntity.label}"
                        </span>
                        <p className="text-[10px] text-gray-500 font-normal normal-case italic mt-1">
                          {stylingTable.topEntity.description}
                        </p>
                      </th>
                    </tr>
                    <tr className="bg-white">
                      <th className="p-6 border-b border-pink-100 bg-pink-50/10 w-[220px]">
                        <span className="text-gray-900 font-black uppercase text-xs tracking-tighter">
                          "{stylingTable.leftEntity.label}"
                        </span>
                      </th>
                      {stylingTable.columns.map((colName: string) => (
                        <th key={colName} className="p-6 border-b border-pink-100 text-center">
                          <span className="text-gray-900 font-bold text-[10px] uppercase leading-tight block">
                            "{colName}"
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {Object.entries(stylingTable.rows).map(([rowName, allowedStyles]: [string, any]) => (
                      <tr key={rowName} className="border-b border-pink-50 hover:bg-pink-50/5 transition-colors">
                        <td className="p-6 font-bold text-black border-r border-pink-50 bg-gray-50/30">
                          {rowName}
                        </td>
                        {stylingTable.columns.map((colName: string) => (
                          <td key={colName} className="p-6 text-center">
                            {allowedStyles.includes(colName) ? (
                              <span className="text-pink-500 font-bold text-xl">✓</span>
                            ) : (
                              <span className="text-gray-200">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {category.longContent.map((section: any, index: number) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">
                {section.heading}
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                {section.paragraphs.map((p: string, pi: number) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {parsedFaqs.length > 0 && (
            <div className="mt-20 bg-pink-50/50 p-10 rounded-[2.5rem] border border-pink-100">
              <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-8">
                {parsedFaqs.map((item: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ 
                  __html: JSON.stringify([
                    {
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": parsedFaqs
                    },
                    {
                      "@context": "https://schema.org",
                      "@type": "ImageObject",
                      "contentUrl": category.imageUrl,
                      "description": category.imageAlt,
                      "digitalSourceType": category.iptc
                    }
                  ]) 
                }}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
}