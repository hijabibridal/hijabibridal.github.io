// Change this one number to update the price everywhere (product page,
// cart, PayPal order) without touching any component code.
export const BUNDLE_PRICE = 1.0

export type NailVariant = {
  name: string
  color: string
  image: string
  sku: string
  stock: number
  url: string
  slug: string
}

// ASSUMPTION FLAGGED: image paths below follow the same
// /images/halal-nails/attachments/ pattern as your other product images.
// Double check these match your actual /public/images folder structure.
export const HALAL_NAILS_VARIANTS: NailVariant[] = [
  {
    name: 'Halal Nails Pink Neutrals with Halal Nail Glue',
    color: 'Pink Neutrals',
    image: '/images/halal-nails/attachments/pink-neutrals-halal-nails-solo.png',
    sku: 'hnb1001',
    stock: 60,
    url: 'https://hijabibridal.github.io/shop/product/halal-nails-pink-neutrals',
    slug: 'halal-nails-pink-neutrals',
  },
  {
    name: 'Halal Nails Cool Neutrals with Halal Nail Glue',
    color: 'Cool Neutrals',
    image: '/images/halal-nails/attachments/cool-neutrals-halal-nails-solo.png',
    sku: 'hnb1002',
    stock: 20,
    url: 'https://hijabibridal.github.io/shop/product/halal-nails-cool-neutrals',
    slug: 'halal-nails-cool-neutrals',
  },
  {
    name: 'Halal Nails Autumn Berries with Halal Nail Glue',
    color: 'Autumn Berries',
    image: '/images/halal-nails/attachments/berries-halal-nails-solo.png',
    sku: 'hnb1003',
    stock: 20,
    url: 'https://hijabibridal.github.io/shop/product/halal-nails-berries',
    slug: 'halal-nails-berries',
  },
]

export const PAYPAL_ENABLED_SLUGS = HALAL_NAILS_VARIANTS.map((v) => v.slug)