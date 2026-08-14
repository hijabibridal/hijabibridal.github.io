'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import {
  ALL_PAYPAL_COUNTRIES,
  getShippingStatus,
  FLAT_RATE_AMOUNT,
} from '@/data/paypal-countries'

type FormState = {
  fullName: string
  email: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  postalCode: string
  countryCode: string
  deliveryInstructions: string
}

const EMPTY_FORM: FormState = {
  fullName: '', email: '', phone: '', line1: '', line2: '',
  city: '', state: '', postalCode: '', countryCode: '',
  deliveryInstructions: '',
}

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clearCart } = useCart()
  const router = useRouter()
  const paypalContainerRef = useRef<HTMLDivElement>(null)
  const [sdkStatus, setSdkStatus] = useState('idle')
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  const shippingStatus = form.countryCode ? getShippingStatus(form.countryCode) : null
  const shippingCost = shippingStatus === 'flat' ? FLAT_RATE_AMOUNT : 0
  const total = subtotal + shippingCost

  const requiredFieldsFilled =
    form.fullName && form.email && form.line1 && form.city &&
    form.postalCode && form.countryCode

  const canCheckout = requiredFieldsFilled && shippingStatus !== 'unsupported'

  // Live refs so the PayPal callback (set up once) always reads current
  // form/cart state instead of a stale snapshot from first render.
  const stateRef = useRef({ items, form, total, shippingCost })
  useEffect(() => {
    stateRef.current = { items, form, total, shippingCost }
  }, [items, form, total, shippingCost])

  const hasRenderedRef = useRef(false)

  useEffect(() => {
    if (hasRenderedRef.current) return
    if (items.length === 0) return
    hasRenderedRef.current = true

    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAYoVVna5Xc7jZjLHp3aU44-gGQEsR5J4suS_7EPMjdwN9gMq5WuLGuOtqIQ3V1B8tonRiznu5DcYAeOQ&components=buttons&disable-funding=credit&currency=USD'
    script.async = true

    script.onload = () => {
      try {
        const paypal = (window as any).paypal

        paypal
          .Buttons({
            style: { layout: 'vertical', height: 45, tagline: false },

            createOrder: (_data: any, actions: any) => {
              const { items: currentItems, form: f, total: currentTotal, shippingCost: currentShipping } =
                stateRef.current
              const itemTotal = currentItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

              const skuList = currentItems.map((i) => `${i.sku}x${i.quantity}`).join(',')
              const rawCustomId = `SKUS:${skuList}|NOTE:${f.deliveryInstructions}`
              const customId = rawCustomId.slice(0, 127)

              const [givenName, ...rest] = f.fullName.trim().split(' ')
              const surname = rest.join(' ') || givenName

              return actions.order.create({
                payer: {
                  email_address: f.email,
                  name: { given_name: givenName, surname },
                  ...(f.phone && {
                    phone: { phone_type: 'MOBILE', phone_number: { national_number: f.phone.replace(/\D/g, '') } },
                  }),
                },
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
                      value: currentTotal.toFixed(2),
                      breakdown: {
                        item_total: { currency_code: 'USD', value: itemTotal.toFixed(2) },
                        shipping: { currency_code: 'USD', value: currentShipping.toFixed(2) },
                      },
                    },
                    shipping: {
                      name: { full_name: f.fullName },
                      address: {
                        address_line_1: f.line1,
                        address_line_2: f.line2 || undefined,
                        admin_area_2: f.city,
                        admin_area_1: f.state,
                        postal_code: f.postalCode,
                        country_code: f.countryCode,
                      },
                    },
                  },
                ],
                // We already collected the address ourselves — lock PayPal
                // to using it rather than letting the buyer pick a
                // different one inside the popup.
                application_context: { shipping_preference: 'SET_PROVIDED_ADDRESS' },
              })
            },

            onApprove: async (_data: any, actions: any) => {
              const order = await actions.order.capture()
              console.log('Order captured:', order)
              setSdkStatus('paid')

              try {
                const { items: currentItems, form: f, total: currentTotal } = stateRef.current
                const orderSummary = {
                  items: currentItems.map((i) => ({
                    name: i.name, color: i.color || null, sku: i.sku || null, quantity: i.quantity,
                  })),
                  deliveryInstructions: f.deliveryInstructions,
                  total: currentTotal.toFixed(2),
                  shippingAddress: {
                    address_line_1: f.line1, address_line_2: f.line2,
                    admin_area_2: f.city, admin_area_1: f.state,
                    postal_code: f.postalCode, country_code: f.countryCode,
                  },
                  shippingName: f.fullName,
                  email: f.email,
                  capturedAt: new Date().toISOString(),
                }
                localStorage.setItem('hijabi-bridal-last-order', JSON.stringify(orderSummary))
              } catch (err) {
                console.error('Failed to store order summary:', err)
              }

              clearCart()
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
  }, [items, clearCart])

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  if (itemCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push('/cart')} className="text-[#db2777] font-bold hover:underline">
          Go to cart
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Checkout</h1>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <div key={item.slug} className="flex justify-between text-sm">
            <span>{item.quantity} × {item.name}{item.color ? ` (${item.color})` : ''}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Shipping & Contact Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input placeholder="Full Name" value={form.fullName} onChange={handleChange('fullName')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:col-span-2" />
        <input placeholder="Email Address" type="email" value={form.email} onChange={handleChange('email')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Phone (optional)" value={form.phone} onChange={handleChange('phone')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Address Line 1" value={form.line1} onChange={handleChange('line1')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:col-span-2" />
        <input placeholder="Address Line 2 (optional)" value={form.line2} onChange={handleChange('line2')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:col-span-2" />
        <input placeholder="City" value={form.city} onChange={handleChange('city')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="State / Province" value={form.state} onChange={handleChange('state')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Postal / Zip Code" value={form.postalCode} onChange={handleChange('postalCode')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <select value={form.countryCode} onChange={handleChange('countryCode')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option value="">Select Country</option>
          {ALL_PAYPAL_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      {shippingStatus === 'unsupported' && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3 mb-6">
          We don't currently deliver to your area — please check back soon!
        </p>
      )}
      {shippingStatus === 'free' && (
        <p className="text-sm text-green-700 bg-green-50 rounded-lg p-3 mb-6">
          You've got free shipping on this order.
        </p>
      )}
      {shippingStatus === 'flat' && (
        <p className="text-sm text-gray-700 bg-pink-50 rounded-lg p-3 mb-6">
          A ${FLAT_RATE_AMOUNT.toFixed(2)} shipping fee will be added to your order.
        </p>
      )}

      <label className="block text-sm font-bold text-gray-800 mb-6">
        Delivery Instructions
        <textarea
          value={form.deliveryInstructions}
          onChange={handleChange('deliveryInstructions')}
          placeholder="Gate code, apartment number, leave at door, etc."
          rows={3}
          className="block w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
        />
      </label>

      <div className="flex justify-between text-lg font-bold mb-8 border-t border-pink-100 pt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {!canCheckout && (
        <p className="text-sm text-gray-500 mb-4">
          Fill in your name, email, and full address above to continue.
        </p>
      )}

      <div ref={paypalContainerRef} style={{ display: canCheckout ? 'block' : 'none' }}></div>

      {canCheckout && sdkStatus !== 'rendered' && sdkStatus !== 'paid' && (
        <p style={{ fontSize: 12, color: '#888' }}>paypal status: {sdkStatus}</p>
      )}
    </div>
  )
}