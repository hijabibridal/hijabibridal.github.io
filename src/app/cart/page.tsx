'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/context/CartContext'

// Countries with free shipping. Everyone else pays a flat $5.
// PayPal doesn't support Macau, North Korea, Bangladesh, Myanmar, or
// Pakistan at all, so those never appear as options regardless of this list.
const FREE_SHIPPING_COUNTRIES = [
  'C2', 'HK', // Zone 1
  'TW', 'KR', // Zone 2
  'JP', 'PH', 'SG', 'TH', 'MY', 'VN', 'ID', // Zone 3
  'AU', 'NZ', 'IN', 'KH', 'LA', 'LK', // Zone 4
  'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'IE', // Zone 5
  'US', 'CA', 'MX', // Zone 6
]

const SHIPPING_SURCHARGE = 5.0

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const paypalContainerRef = useRef<HTMLDivElement>(null)
  const [sdkStatus, setSdkStatus] = useState('idle')
  const [shippingNote, setShippingNote] = useState('')

  useEffect(() => {
    if (items.length === 0) return

    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAGXFcABmGYsu3sSR7CBoopizFVTwzHVp8XzZwfs45JPPZ9CYmUBhktn-FGdS7fGuG2zN_-fsii3jNcEg&components=buttons&disable-funding=credit&currency=USD'
    script.async = true

    script.onload = () => {
      const paypal = (window as any).paypal
      let currentShipping = 0 // recalculated once PayPal reports the buyer's country

      paypal
        .Buttons({
          style: { layout: 'vertical', height: 45, tagline: false },

          createOrder: (_data: any, actions: any) => {
            const itemTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
            return actions.order.create({
              purchase_units: [
                {
                  items: items.map((i) => ({
                    name: i.name,
                    unit_amount: { currency_code: 'USD', value: i.price.toFixed(2) },
                    quantity: String(i.quantity),
                  })),
                  amount: {
                    currency_code: 'USD',
                    value: (itemTotal + currentShipping).toFixed(2),
                    breakdown: {
                      item_total: { currency_code: 'USD', value: itemTotal.toFixed(2) },
                      shipping: { currency_code: 'USD', value: currentShipping.toFixed(2) },
                    },
                  },
                },
              ],
              application_context: { shipping_preference: 'GET_FROM_FILE' },
            })
          },

          // Buyer picked/changed a shipping address inside the PayPal popup —
          // recalculate shipping and patch the order total to match.
          onShippingAddressChange: async (data: any, actions: any) => {
            const countryCode = data.shippingAddress?.countryCode
            const isFree = FREE_SHIPPING_COUNTRIES.includes(countryCode)
            currentShipping = isFree ? 0 : SHIPPING_SURCHARGE
            setShippingNote(
              isFree ? 'Free shipping applied.' : `$${SHIPPING_SURCHARGE.toFixed(2)} shipping applied.`
            )

            const itemTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

            return actions.order.patch([
              {
                op: 'replace',
                path: "/purchase_units/@reference_id=='default'/amount",
                value: {
                  currency_code: 'USD',
                  value: (itemTotal + currentShipping).toFixed(2),
                  breakdown: {
                    item_total: { currency_code: 'USD', value: itemTotal.toFixed(2) },
                    shipping: { currency_code: 'USD', value: currentShipping.toFixed(2) },
                  },
                },
              },
            ])
          },

          onApprove: async (_data: any, actions: any) => {
            const order = await actions.order.capture()
            console.log('Order captured:', order)
            setSdkStatus('paid')
            window.location.href = 'https://hijabibridal.github.io/thank-you'
          },

          onError: (err: any) => {
            console.error('PayPal Buttons error:', err)
            setSdkStatus('render-error')
          },
        })
        .render(paypalContainerRef.current)

      setSdkStatus('rendered')
    }

    script.onerror = () => setSdkStatus('load-error')
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [items])

  if (itemCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600">Add a product to get started.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex items-center justify-between border-b border-pink-100 pb-4"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
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

      <p className="text-sm text-gray-500 mb-4">
        Shipping is calculated after you select an address in the next step — free
        for select countries, $5 flat rate otherwise.
      </p>

      <div ref={paypalContainerRef}></div>

      {shippingNote && <p className="text-sm text-gray-700 mt-3">{shippingNote}</p>}

      {sdkStatus !== 'rendered' && sdkStatus !== 'paid' && (
        <p style={{ fontSize: 12, color: '#888' }}>paypal status: {sdkStatus}</p>
      )}
    </div>
  )
}