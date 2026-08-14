'use client'

import { useEffect, useState } from 'react'

const EMAILJS_SERVICE_ID = 'service_g0iivoj'
const EMAILJS_TEMPLATE_ID = 'template_1ra81pg'
const EMAILJS_PUBLIC_KEY = 'F6VfvNJX20W8urASX'
const FEEDBACK_RECIPIENT = 'nooradrip@gmail.com'

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
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hijabi-bridal-last-order')
      if (stored) setOrder(JSON.parse(stored))
    } catch (err) {
      console.error('Failed to read order summary:', err)
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    script.onload = () => {
      ;(window as any).emailjs.init(EMAILJS_PUBLIC_KEY)
    }
    document.body.appendChild(script)
  }, [])

  const fullAddress = order ? formatAddress(order.shippingAddress) : null

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
      const emailjs = (window as any).emailjs
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: FEEDBACK_RECIPIENT,
        name: order?.shippingName || 'Not provided',
        email: order?.email || 'Not provided',
        message: feedback,
        order_summary: orderSummaryText,
      })
      setSendStatus('sent')
      setFeedback('')
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setSendStatus('error')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Required PayPal confirmation language is in the paragraph below —
          the heading itself is free-form branding copy. */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-3">
          We're so excited! Thanks!
        </h1>
        <p className="text-lg text-gray-800">
          Your transaction has been completed, and a receipt for your purchase has
          been emailed to you.
        </p>
        <a
          href="https://hijabibridal.github.io/shop/category/halal-nails"
          className="inline-block mt-6 bg-[#db2777] hover:bg-[#be185d] text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider text-sm transition-colors"
        >
          Continue Shopping Halal Nails
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: order details */}
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
                    colors. {quantityWord(item.quantity)} 10 sheet pack of glue tabs
                    (240 count) is also included.
                  </p>
                </div>
              ))}

              <p className="font-bold text-lg">Order Total: ${order.total}</p>

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

          {/* Feedback box */}
          <div className="mt-12 bg-pink-50/40 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-3">
              Questions? Or are you just excited about your order? We're hyped too!
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us all the details!..."
              rows={4}
              className="w-full rounded-lg border border-pink-200 p-3 mb-3"
            />
            <button
              onClick={handleSendFeedback}
              disabled={sendStatus === 'sending'}
              style={{
                backgroundColor: '#db2777',
                color: '#fff',
                fontWeight: 700,
                padding: '10px 20px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
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
        </div>

        {/* RIGHT: map */}
        <div>
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
  )
}