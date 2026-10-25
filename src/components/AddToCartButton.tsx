'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { HALAL_NAILS_VARIANTS, BUNDLE_PRICE, BUNDLE_ORIGINAL_PRICE } from '@/data/halal-nails-variants'

// Sends an add_to_cart event to Google Tag Manager's dataLayer so GA4 can
// count add-to-cart clicks. `source` says which button was clicked.
// Only the item is recorded — nothing about the customer.
function trackAddToCart(
  v: { sku: string; name: string; color: string },
  source: string
) {
  try {
    const w = window as any
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ ecommerce: null })
    w.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value: BUNDLE_PRICE,
        items: [
          {
            item_id: v.sku,
            item_name: v.name,
            item_variant: v.color,
            price: BUNDLE_PRICE,
            quantity: 1,
            item_list_name: source,
          },
        ],
      },
    })
  } catch (err) {
    console.error('Add-to-cart tracking failed:', err)
  }
}

// Tells Google Analytics that someone viewed this product (the "View
// product" step in the Purchase journey report). Only the item is sent.
function trackViewItem(v: { sku: string; name: string; color: string }) {
  try {
    const w = window as any
    w.dataLayer = w.dataLayer || []
    w.dataLayer.push({ ecommerce: null })
    w.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        currency: 'USD',
        value: BUNDLE_PRICE,
        items: [
          {
            item_id: v.sku,
            item_name: v.name,
            item_variant: v.color,
            price: BUNDLE_PRICE,
            quantity: 1,
          },
        ],
      },
    })
  } catch (err) {
    console.error('View-item tracking failed:', err)
  }
}

type AddToCartButtonProps = {
  initialSlug: string
}

export default function AddToCartButton({ initialSlug }: AddToCartButtonProps) {
  const { addItem, openDrawer } = useCart()

  const variant =
    HALAL_NAILS_VARIANTS.find((v) => v.slug === initialSlug) || HALAL_NAILS_VARIANTS[0]

  useEffect(() => {
    trackViewItem(variant)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant.sku])

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
    trackAddToCart(variant, 'product_page')
    openDrawer()
  }

  return (
    <button
      onClick={handleClick}
      className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-6"
    >
      ${BUNDLE_PRICE.toFixed(0)}{' '}
      <span style={{ textDecoration: 'line-through', opacity: 0.75 }}>
        (${BUNDLE_ORIGINAL_PRICE.toFixed(0)})
      </span>{' '}
      Add to Cart
    </button>
  )
}
