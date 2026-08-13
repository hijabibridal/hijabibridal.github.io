'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { HALAL_NAILS_VARIANTS, BUNDLE_PRICE } from '@/data/halal-nails-variants'

type AddToCartButtonProps = {
  // Pass the current product page's slug so the dropdown defaults to
  // whichever color the visitor is already looking at.
  initialSlug?: string
}

export default function AddToCartButton({ initialSlug }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const defaultVariant =
    HALAL_NAILS_VARIANTS.find((v) => v.slug === initialSlug) || HALAL_NAILS_VARIANTS[0]
  const [selectedSku, setSelectedSku] = useState(defaultVariant.sku)

  const selectedVariant =
    HALAL_NAILS_VARIANTS.find((v) => v.sku === selectedSku) || HALAL_NAILS_VARIANTS[0]

  const handleClick = () => {
    addItem({
      slug: selectedVariant.slug,
      name: selectedVariant.name,
      price: BUNDLE_PRICE,
      color: selectedVariant.color,
      sku: selectedVariant.sku,
      image: selectedVariant.image,
      url: selectedVariant.url,
    })
    router.push('/cart')
  }

  return (
    <div className="mb-6 max-w-xs">
      <label className="block text-sm font-bold text-gray-800 mb-2">
        Choose Your Color Pack. Tabs Included.
        <select
          value={selectedSku}
          onChange={(e) => setSelectedSku(e.target.value)}
          className="block w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
        >
          {HALAL_NAILS_VARIANTS.map((v) => (
            <option key={v.sku} value={v.sku} disabled={v.stock <= 0}>
              {v.color} {v.stock <= 0 ? '(Out of Stock)' : ''}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={handleClick}
        disabled={selectedVariant.stock <= 0}
        className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add to Cart
      </button>
    </div>
  )
}