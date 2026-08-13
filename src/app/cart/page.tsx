'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

const FREE_SHIPPING_COUNTRIES = [
  'C2', 'HK',
  'TW', 'KR',
  'JP', 'PH', 'SG', 'TH', 'MY', 'VN', 'ID',
  'AU', 'NZ', 'IN', 'KH', 'LA', 'LK',
  'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'IE',
  'US', 'CA', 'MX',
]

const SHIPPING_SURCHARGE = 5.0

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const paypalContainerRef = useRef<HTMLDivElement>(null)
  const [sdkStatus, setSdkStatus] = useState('idle')
  const [shippingNote, setShippingNote] = useState('')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')

  // Live refs so the PayPal callbacks (set up once, below) always read the
  // CURRENT cart/instructions instead of a stale snapshot from first render.
  // This is also what fixes the render-error: the SDK script + Buttons()
  // instance now mount exactly once, instead of re-mounting into an
  // already-occupied container every time quantity or instructions change.
  const itemsRef = useRef(items)
  useEffect(() => {
    itemsRef.current = items
  }, [items])

  const instructionsRef = useRef(deliveryInstructions)
  useEffect(() => {
    instructionsRef.current = deliveryInstructions
  }, [deliveryInstructions])

  const hasRenderedRef = useRef(false)

  useEffect(() => {
    if (hasRenderedRef.current) return
    if (items.length === 0) return
    hasRenderedRef.current = true

    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAGXFcABmGYsu3sSR7CBoopizFVTwzHVp8XzZwfs45JPPZ9CYmUBhktn-FGdS7fGuG2zN_-fsii3jNcEg&components=buttons&disable-funding=credit&currency=USD'
    script.async = true

    script.onload = () => {
      try {
        const paypal = (window as any).paypal
        let currentShipping = 0

        paypal
          .Buttons({
            style: { layout: 'vertical', height: 45, tagline: false },

            createOrder: (_data: any, actions: any) => {
              const currentItems = itemsRef.current
              const itemTotal = currentItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

              // custom_id carries delivery instructions + SKUs through to the
              // dropshipper via PayPal's transaction details. PayPal caps
              // custom_id at 127 characters, so it's truncated defensively.
              const skuList = currentItems.map((i) => `${i.sku}x${i.quantity}`).join(',')
              const rawCustomId = `SKUS:${skuList}|NOTE:${instructionsRef.current}`
              const customId = rawCustomId.slice(0, 127)

              return actions.order.create({
                purchase_units: [
                  {
                    custom_id: customId,
                    items: currentItems.map((i) => ({
                      name: i.color ? `${i.name} (${i.color})` : i.name,
                      sku: i.sku,
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

            onShippingAddressChange: async (data: any, actions: any) => {
              const countryCode = data.shippingAddress?.countryCode
              const isFree = FREE_SHIPPING_COUNTRIES.includes(countryCode)
              currentShipping = isFree ? 0 : SHIPPING_SURCHARGE
              setShippingNote(
                isFree
                  ? 'Free shipping applied.'
                  : `$${SHIPPING_SURCHARGE.toFixed(2)} shipping applied.`
              )

              const currentItems = itemsRef.current
              const itemTotal = currentItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

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

              try {
                const currentItems = itemsRef.current
                const shippingAddress = order?.purchase_units?.[0]?.shipping?.address || null
                const shippingName =
                  order?.purchase_units?.[0]?.shipping?.name?.full_name || null
                const orderSummary = {
                  items: currentItems.map((i) => ({
                    name: i.name,
                    color: i.color || null,
                    sku: i.sku || null,
                    quantity: i.quantity,
                  })),
                  deliveryInstructions: instructionsRef.current,
                  total: (
                    currentItems.reduce((sum, i) => sum + i.price * i.quantity, 0) +
                    currentShipping
                  ).toFixed(2),
                  shippingAddress,
                  shippingName,
                  capturedAt: new Date().toISOString(),
                }
                localStorage.setItem('hijabi-bridal-last-order', JSON.stringify(orderSummary))
              } catch (err) {
                console.error('Failed to store order summary:', err)
              }

              window.location.href = 'https://hijabibridal.github.io/thank-you'
            },

            onError: (err: any) => {
              console.error('PayPal Buttons error:', err)
              setSdkStatus('render-error')
            },
          })
          .render(paypalContainerRef.current)

        setSdkStatus('rendered')
      } catch (err) {
        console.error('PayPal render failed:', err)
        setSdkStatus('render-error')
      }
    }

    script.onerror = () => setSdkStatus('load-error')
    document.body.appendChild(script)
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
            key={item.slug + (item.color || '')}
            className="flex items-center justify-between border-b border-pink-100 pb-4"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <Link href={item.url || '#'} className="shrink-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={item.image} alt={item.color || item.name} fill className="object-cover" />
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
                <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                {item.url && (
                  <Link href={item.url} className="text-xs text-[#db2777] font-bold hover:underline">
                    More info on this color →
                  </Link>
                )}
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

      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-800 mb-2">
          Delivery Instructions
          <textarea
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
            placeholder="Gate code, apartment number, leave at door, etc."
            rows={3}
            className="block w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
          />
        </label>
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