'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { HALAL_NAILS_VARIANTS, BUNDLE_PRICE } from '@/data/halal-nails-variants'

type AddToCartButtonProps = {
  // The current product page's slug — determines which color this
  // specific button adds. No dropdown here since each product page is
  // already one specific color; pick a different color from /cart instead.
  initialSlug: string
}

export default function AddToCartButton({ initialSlug }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const variant =
    HALAL_NAILS_VARIANTS.find((v) => v.slug === initialSlug) || HALAL_NAILS_VARIANTS[0]

  const handleClick = () => {
    addItem({
      slug: variant.slug,
      name: variant.name,
      price: BUNDLE_PRICE,
      color: variant.color,
      sku: variant.sku,
      image: variant.image,
      url: variant.url,
    })
    router.push('/cart')
  }

  return (
    <button
      onClick={handleClick}
      disabled={variant.stock <= 0}
      className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {variant.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
    </button>
  )
}