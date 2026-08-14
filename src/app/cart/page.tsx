'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { HALAL_NAILS_VARIANTS, BUNDLE_PRICE } from '@/data/halal-nails-variants'

export default function CartPage() {
  const { items, addItem, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const router = useRouter()

  const cartSlugs = new Set(items.map((i) => i.slug))
  const otherVariants = HALAL_NAILS_VARIANTS.filter((v) => !cartSlugs.has(v.slug))

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Your Cart</h1>
      <p className="text-gray-600 mb-8">
        {itemCount === 0 ? 'No items yet' : `${itemCount} item${itemCount === 1 ? '' : 's'} in your cart`}
      </p>

      {items.length === 0 ? (
        <p className="text-gray-600 mb-12">Add a product to get started.</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div
                key={item.slug + (item.color || '')}
                className="flex items-center justify-between border-b border-pink-100 pb-4"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <Link href={item.url || '#'} className="shrink-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.color || item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div>
                    {item.url ? (
                      <Link href={item.url} className="font-bold hover:text-[#db2777]">
                        {item.name}
                      </Link>
                    ) : (
                      <p className="font-bold">{item.name}</p>
                    )}
                    {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                    {item.sku && <p className="text-xs text-gray-400">SKU: {item.sku}</p>}
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.slug, parseInt(e.target.value) || 1)}
                    style={{ width: 50 }}
                    className="border rounded px-2 py-1 text-center"
                  />
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold mb-8">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.push('/checkout')}
            className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full text-center uppercase tracking-wider text-sm transition-colors w-max mb-12"
          >
            Proceed to Checkout
          </button>
        </>
      )}

      {otherVariants.length > 0 && (
        <div className="border-t border-pink-100 pt-8">
          <h2 className="text-xl font-bold mb-2">Choose Your Color Pack. Tabs Included.</h2>
          <p className="text-gray-600 text-sm mb-6">Add another color to your order.</p>

          <div className="space-y-4">
            {otherVariants.map((v) => (
              <div key={v.sku} className="flex items-center justify-between border-b border-pink-50 pb-4">
                <div className="flex items-center gap-4">
                  <Link href={v.url} className="shrink-0">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={v.image} alt={v.color} fill className="object-cover" />
                    </div>
                  </Link>
                  <div>
                    <Link href={v.url} className="font-bold hover:text-[#db2777]">
                      {v.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {v.stock > 0 ? `${v.stock} in stock` : 'Out of Stock'}
                    </p>
                    <Link href={v.url} className="text-xs text-[#db2777] font-bold hover:underline">
                      More info →
                    </Link>
                  </div>
                </div>
                <button
                  disabled={v.stock <= 0}
                  onClick={() =>
                    addItem({
                      slug: v.slug,
                      name: v.name,
                      price: BUNDLE_PRICE,
                      color: v.color,
                      sku: v.sku,
                      image: v.image,
                      url: v.url,
                    })
                  }
                  className="bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-2 px-5 rounded-full text-xs uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}