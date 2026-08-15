'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { HALAL_NAILS_VARIANTS, BUNDLE_PRICE } from '@/data/halal-nails-variants'

export default function CartDrawer() {
  const {
    items, addItem, removeItem, updateQuantity, subtotal, itemCount,
    isDrawerOpen, closeDrawer,
  } = useCart()
  const router = useRouter()

  const cartSlugs = new Set(items.map((i) => i.slug))
  const otherVariants = HALAL_NAILS_VARIANTS.filter((v) => !cartSlugs.has(v.slug))

  const handleCheckout = () => {
    closeDrawer()
    router.push('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sliding panel — half the viewport width on desktop, full width on mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-1/2 bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-pink-100">
          <h2 className="text-xl font-black uppercase tracking-tight">
            Your Cart {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="text-gray-500 hover:text-pink-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-gray-600 mt-8 text-center">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.slug + (item.color || '')} className="flex items-center gap-4 border-b border-pink-50 pb-4">
                  {item.image && (
                    <Link href={item.url || '#'} className="shrink-0">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={item.image} alt={item.color || item.name} fill className="object-cover" />
                      </div>
                    </Link>
                  )}
                  <div className="flex-1">
                    {item.url ? (
                      <Link href={item.url} className="font-bold text-sm hover:text-[#db2777]">
                        {item.name}
                      </Link>
                    ) : (
                      <p className="font-bold text-sm">{item.name}</p>
                    )}
                    {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.slug, parseInt(e.target.value) || 1)}
                        style={{ width: 45 }}
                        className="border rounded px-1 py-0.5 text-center text-sm"
                      />
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          {otherVariants.length > 0 && (
            <div className="mt-6 pt-6 border-t border-pink-50">
              <h3 className="text-sm font-bold text-gray-800 mb-1">
                Choose Your Color Pack. Tabs Included.
              </h3>
              <p className="text-xs text-gray-500 mb-3">Add another color to your order.</p>
              <div className="space-y-3">
                {otherVariants.map((v) => (
                  <div key={v.sku} className="flex items-center gap-3">
                    <Link href={v.url} className="shrink-0">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={v.image} alt={v.color} fill className="object-cover" />
                      </div>
                    </Link>
                    <div className="flex-1">
                      <Link href={v.url} className="text-xs font-bold hover:text-[#db2777]">
                        {v.color}
                      </Link>
                      <p className="text-[11px] text-gray-500">
                        {v.stock > 0 ? `${v.stock} in stock` : 'Out of Stock'}
                      </p>
                    </div>
                    <button
                      disabled={v.stock <= 0}
                      onClick={() =>
                        addItem({
                          slug: v.slug, name: v.name, price: BUNDLE_PRICE,
                          color: v.color, sku: v.sku, image: v.image, url: v.url,
                        })
                      }
                      className="bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-1.5 px-4 rounded-full text-[11px] uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-pink-100 px-6 py-5">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="block w-full text-center bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider text-sm transition-colors"
            >
              Proceed to Checkout
            </button>
            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block text-center text-sm text-gray-600 hover:text-pink-600 mt-3"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}