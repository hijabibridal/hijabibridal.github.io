// Change this number to update pricing everywhere (product page,
// cart, PayPal order) without touching any component code.
// BUNDLE_PRICE is what's actually charged.
export const BUNDLE_PRICE = 40.0

// No longer used for display (the sale is over). Kept only so any file
// that still imports it keeps building. Safe to delete once nothing
// imports it.
export const BUNDLE_ORIGINAL_PRICE = BUNDLE_PRICE

export type NailVariant = {
  name: string
  color: string
  image: string
  sku: string
  url: string
  slug: string
}

export const HALAL_NAILS_VARIANTS: NailVariant[] = [
  {
    name: 'Halal Nails Pink Neutrals with Halal Nail Glue',
    color: 'Pink Neutrals',
    image: '/images/halal-nails/attachments/pink-neutrals-halal-nails-solo.webp',
    sku: 'hnb1001',
    url: 'https://hijabibridal.com/shop/product/halal-nails-pink-neutrals',
    slug: 'halal-nails-pink-neutrals',
  },
  {
    name: 'Halal Nails Cool Neutrals with Halal Nail Glue',
    color: 'Cool Neutrals',
    image: '/images/halal-nails/attachments/cool-neutrals-halal-nails-solo.webp',
    sku: 'hnb1002',
    url: 'https://hijabibridal.com/shop/product/halal-nails-cool-neutrals',
    slug: 'halal-nails-cool-neutrals',
  },
  {
    name: 'Halal Nails Autumn Berries with Halal Nail Glue',
    color: 'Autumn Berries',
    image: '/images/halal-nails/attachments/berries-halal-nails-solo.webp',
    sku: 'hnb1003',
    url: 'https://hijabibridal.com/shop/product/halal-nails-berries',
    slug: 'halal-nails-berries',
  },
]

export const PAYPAL_ENABLED_SLUGS = HALAL_NAILS_VARIANTS.map((v) => v.slug)
