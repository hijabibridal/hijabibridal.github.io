'use client'

import { useEffect, useState } from 'react'

const BACKEND_BASE = 'https://hijabi-bridal-cloudflare.nooradrip.workers.dev'

type OrderItem = {
  name: string
  color: string | null
  sku: string | null
  quantity: number
}

type OrderSummary = {
  items: OrderItem[]
  deliveryInstructions?: string
  total: string
  shippingAddress: {
    address_line_1?: string
    address_line_2?: string
    admin_area_2?: string // city
    admin_area_1?: string // state
    postal_code?: string
    country_code?: string
  } | null
  shippingName: string | null
  email?: string
  capturedAt: string
}

const NUMBER_WORDS: Record<number, string> = {
  1: 'ONE', 2: 'TWO', 3: 'THREE', 4: 'FOUR', 5: 'FIVE',
  6: 'SIX', 7: 'SEVEN', 8: 'EIGHT', 9: 'NINE', 10: 'TEN',
}

function quantityWord(n: number) {
  return NUMBER_WORDS[n] || String(n)
}

function formatAddress(addr: OrderSummary['shippingAddress']) {
  if (!addr) return null
  const line1 = [addr.address_line_1, addr.address_line_2].filter(Boolean).join(', ')
  const line2 = [addr.admin_area_2, addr.admin_area_1, addr.postal_code]
    .filter(Boolean)
    .join(', ')
  return [line1, line2, addr.country_code].filter(Boolean).join(' — ')
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null)
  const [feedback, setFeedback] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hijabi-bridal-last-order')
      if (stored) setOrder(JSON.parse(stored))
    } catch (err) {
      console.error('Failed to read order summary:', err)
    }
  }, [])

  const fullAddress = order ? formatAddress(order.shippingAddress) : null
  const orderItemCount = order ? order.items.reduce((sum, i) => sum + i.quantity, 0) : 0
  const hadFreeShipping = orderItemCount >= 2

  const mapEmbedSrc = fullAddress
    ? `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`
    : null

  const handleSendFeedback = async () => {
    if (!feedback.trim()) return
    setSendStatus('sending')

    const orderSummaryText = order
      ? order.items
          .map(
            (i) =>
              `${quantityWord(i.quantity)} x ${i.name}${i.color ? ` (${i.color})` : ''}`
          )
          .join(', ')
      : 'N/A'

    try {
      const response = await fetch(`${BACKEND_BASE}/send-feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: order?.shippingName || 'Not provided',
          customerEmail: order?.email || undefined,
          orderSummaryText,
          message: feedback,
          marketingConsent,
        }),
      })

      if (!response.ok) throw new Error('Failed to send')

      setSendStatus('sent')
      setFeedback('')
      setMarketingConsent(false)
    } catch (err) {
      console.error('Feedback send failed:', err)
      setSendStatus('error')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Title + subtitle — always full width, on every screen size */}
      <div className="mb-10">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-3">
          Thank you for your order! We're so excited!!
        </h1>
        <p className="text-lg text-gray-800">
          Your transaction has been completed, and a receipt for your purchase has
          been emailed to you.
        </p>
      </div>

      {/* Everything below uses explicit grid placement so mobile and
          desktop can show a genuinely different order without needing
          two separate copies of the feedback box (which would risk
          drifting out of sync on future edits).
          Desktop: Your Order (left, spans both rows) | Feedback (top
          right) | Map (bottom right).
          Mobile: Your Order, then Map, then Feedback last — controlled
          by the order-* classes below, which desktop's explicit
          row/col placement overrides. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Your Order */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Order</h2>

          {!order && (
            <p className="text-gray-600">
              We couldn't find your order details on this device. Don't worry — your
              receipt and confirmation were still emailed to you by PayPal.
            </p>
          )}

          {order && (
            <div className="space-y-6">
              {order.items.map((item, idx) => (
                <div key={idx} className="border-b border-pink-100 pb-4">
                  <p className="font-bold text-lg">
                    {quantityWord(item.quantity)} × {item.name}
                    {item.color ? ` — ${item.color}` : ''}
                  </p>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    Your purchase includes {quantityWord(item.quantity)} 120 pack of
                    Halal Nails in your color choice. Each pack contains 5 different
                    colors. A 10 sheet pack of glue tabs (240 count) is also included.
                    {hadFreeShipping
                      ? ' Shipping was free on your order!'
                      : ' A flat shipping fee was applied to your order.'}
                  </p>
                </div>
              ))}

              <p className="font-bold text-lg">Order Total: ${order.total}</p>
              <p className="text-gray-700">
                We'll email you once your order has processed and is ready to ship!
              </p>
              <p className="text-gray-700">
                Questions? bridalhijabi@gmail.com
              </p>

              {order.deliveryInstructions && (
                <p className="text-gray-700">
                  Delivery instructions: {order.deliveryInstructions}
                </p>
              )}
              {order.shippingName && (
                <p className="text-gray-700">Shipping to: {order.shippingName}</p>
              )}
              {fullAddress && <p className="text-gray-700">{fullAddress}</p>}
            </div>
          )}
        </div>

        {/* Right column — feedback box and map are now an independent
            flex stack, sized by their own natural content height
            (not stretched to match the left column's tall content,
            which is what caused the visible gap before). order-* on
            each child controls mobile vs desktop position without
            duplicating either block's markup. */}
        <div className="flex flex-col gap-10">
          <div className="order-2 md:order-1 bg-pink-50/40 rounded-2xl p-4">
            <h3 className="font-bold text-sm mb-2">
              Questions? Or are you just excited about your order? We're hyped too!
              Tell us all the details!
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you're most excited to wear these with..."
              rows={2}
              className="w-full rounded-lg border border-pink-200 p-2 text-sm mb-2"
            />
            <label className="flex items-center gap-2 text-xs text-gray-700 mb-2">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
              />
              May we use your comments for marketing purposes without your name?
            </label>
            <button
              onClick={handleSendFeedback}
              disabled={sendStatus === 'sending'}
              style={{
                backgroundColor: '#db2777',
                color: '#fff',
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {sendStatus === 'sending' ? 'Sending...' : 'Send Feedback'}
            </button>
            {sendStatus === 'sent' && (
              <p className="text-sm text-green-600 mt-2">Thanks — feedback sent!</p>
            )}
            {sendStatus === 'error' && (
              <p className="text-sm text-red-600 mt-2">
                Something went wrong sending that — try again in a moment.
              </p>
            )}
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-xl font-bold mb-4">Shipping To</h2>
            {mapEmbedSrc ? (
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: 12 }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 text-sm text-center p-6">
                Shipping address will appear here once available from your order.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Continue shopping — all the way at the bottom now */}
      <div className="mt-12 text-center">
        <a
          href="https://hijabibridal.github.io/shop/category/halal-nails"
          className="inline-block bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider text-sm transition-colors"
        >
          Continue Shopping Halal Nails
        </a>
      </div>
    </div>
  )
}