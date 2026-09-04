'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import {
  SUPPORTED_COUNTRIES,
  getShippingStatus,
  getTransitMessage,
  isRemoteBlockedPostalCode,
  REMOTE_POSTAL_BLOCK_MESSAGE,
  FLAT_RATE_AMOUNT,
} from '@/data/paypal-countries'
import DigitalWalletButtons from '@/components/DigitalWalletButtons'

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
  const addressInputRef = useRef<HTMLInputElement>(null)
  const userEditedSinceConfirm = useRef(false) // plain ref — never triggers a re-render
  const [addressConfirmedByAutocomplete, setAddressConfirmedByAutocomplete] = useState(false)
  const [addressTouched, setAddressTouched] = useState(false)
  const [manualAddressAccepted, setManualAddressAccepted] = useState(false)
  const [sdkStatus, setSdkStatus] = useState('idle')
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  // Only starts flagging fields red once postal/zip code is entered —
  // everything red on a blank page reads as pressuring for info before the
  // visitor's done anything. Email/phone also check actual format, not
  // just presence.
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isFieldInvalid = (field: keyof FormState) => {
    const value = form[field]
    if (!value) return true
    if (field === 'email') return !EMAIL_PATTERN.test(value)
    if (field === 'phone') return value.replace(/\D/g, '').length < 7
    return false
  }
  const fieldError = (field: keyof FormState) => !!form.postalCode && isFieldInvalid(field)
  const fieldClass = (field: keyof FormState, base: string) =>
    `${base} ${fieldError(field) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`

  const shippingStatus = form.countryCode ? getShippingStatus(form.countryCode) : null
  const postalBlocked =
    form.countryCode && form.postalCode
      ? isRemoteBlockedPostalCode(form.countryCode, form.postalCode)
      : false
  const transitMessage = form.countryCode ? getTransitMessage(form.countryCode) : null
  const shippingCost = shippingStatus === 'flat' ? FLAT_RATE_AMOUNT : 0
  const total = subtotal + shippingCost

  // Phone is now required — LingXing's fulfillment API rejects orders
  // without a recipient phone number.
  const requiredFieldsFilled =
    form.fullName && !isFieldInvalid('email') && !isFieldInvalid('phone') &&
    form.line1 && form.city && form.postalCode && form.countryCode

  const addressConfirmed = addressConfirmedByAutocomplete || manualAddressAccepted
  const canCheckout =
    requiredFieldsFilled && shippingStatus !== 'unsupported' && !postalBlocked && addressConfirmed

  const REQUIRED_FIELD_LABELS: { key: keyof FormState; label: string }[] = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'line1', label: 'Address Line 1' },
    { key: 'city', label: 'City' },
    { key: 'postalCode', label: 'Postal / Zip Code' },
    { key: 'countryCode', label: 'Country' },
  ]
  const missingFields = REQUIRED_FIELD_LABELS.filter((f) => !form[f.key]).map((f) => f.label)

  const stateRef = useRef({ items, form, total, shippingCost })
  useEffect(() => {
    stateRef.current = { items, form, total, shippingCost }
  }, [items, form, total, shippingCost])

  // ─── Shared order-building logic — used by BOTH the main PayPal
  // Buttons AND Google Pay, so they stay perfectly in sync. ───────────
  function buildOrderRequestBody() {
    const { items: currentItems, form: f, total: currentTotal, shippingCost: currentShipping } =
      stateRef.current
    const itemTotal = currentItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

    const skuList = currentItems.map((i) => `${i.sku}x${i.quantity}`).join(',')
    // Phone is embedded here (not just sent via payer.phone) because
    // classic IPN's own payload does not reliably include a phone field —
    // custom_id is the one field confirmed to survive the IPN round-trip.
    const rawCustomId = `SKUS:${skuList}|PHONE:${f.phone}|NOTE:${f.deliveryInstructions}`
    const customId = rawCustomId.slice(0, 127)

    const [givenName, ...rest] = f.fullName.trim().split(' ')
    const surname = rest.join(' ') || givenName

    return {
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
      application_context: { shipping_preference: 'SET_PROVIDED_ADDRESS' },
    }
  }

  // Shared post-payment handling — same status check, storage, redirect
  // logic regardless of which payment method was used.
  async function handleApprovedOrder(order: any) {
    console.log('Order captured:', order)

    try {
      localStorage.setItem('hijabi-bridal-debug-capture', JSON.stringify(order, null, 2))
    } catch (err) {
      console.error('Failed to store debug capture:', err)
    }

    const captureStatus = order?.purchase_units?.[0]?.payments?.captures?.[0]?.status
    const isCompleted = order?.status === 'COMPLETED' && captureStatus === 'COMPLETED'

    if (!isCompleted) {
      console.error('Payment not completed. status:', order?.status, 'captureStatus:', captureStatus)
      setSdkStatus(captureStatus === 'PENDING' ? 'pending-review' : 'declined')
      return
    }

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
  }

  const hasRenderedRef = useRef(false)

  useEffect(() => {
    if (hasRenderedRef.current) return
    if (items.length === 0) return
    hasRenderedRef.current = true

    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAYoVVna5Xc7jZjLHp3aU44-gGQEsR5J4suS_7EPMjdwN9gMq5WuLGuOtqIQ3V1B8tonRiznu5DcYAeOQ' +
      '&components=buttons,googlepay' +
      '&disable-funding=credit' +
      '&enable-funding=paylater,ideal,blik,bancontact,eps,mybank,trustly' +
      '&currency=USD'
    script.async = true

    script.onload = () => {
      try {
        const paypal = (window as any).paypal

        paypal
          .Buttons({
            style: { layout: 'vertical', height: 45, tagline: false },
            createOrder: (_data: any, actions: any) => actions.order.create(buildOrderRequestBody()),
            onApprove: async (_data: any, actions: any) => {
              const order = await actions.order.capture()
              await handleApprovedOrder(order)
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

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  // Runs once, when the visitor leaves the address field — not on every
  // keystroke. This is the only point (besides picking a real suggestion)
  // where we touch React state for this field, which is what keeps
  // Google's own script from fighting with React while typing.
  const handleAddressBlur = () => {
    const domValue = addressInputRef.current?.value || ''
    setForm((prev) => ({ ...prev, line1: domValue }))
    setAddressTouched(true)
    if (userEditedSinceConfirm.current) {
      setAddressConfirmedByAutocomplete(false)
    }
  }

  // ─── Google Places Autocomplete on the address field ──────────────
  // ⚠️ Requires a real Google Places API key (Google Cloud Console →
  // enable "Places API" → generate a key) — set it below. Won't show
  // suggestions until that key exists. Restricted to whichever country
  // is currently selected, so results are relevant rather than global.
  const GOOGLE_PLACES_API_KEY = 'AIzaSyCVzmLmZNb7moxks70aP9EXm9Qd-lWKXJA'

  useEffect(() => {
    if (!form.countryCode) return

    const scriptId = 'google-places-script'
    const initAutocomplete = () => {
      if (!addressInputRef.current || !(window as any).google) return
      const inputEl = addressInputRef.current

      const autocomplete = new (window as any).google.maps.places.Autocomplete(inputEl, {
        componentRestrictions: { country: form.countryCode.toLowerCase() },
        fields: ['address_components', 'formatted_address'],
      })

      // A plain native listener — updates a ref only, never React state,
      // so it can never collide with Google's own per-keystroke DOM work.
      // Just marks "the user has changed something since the last
      // confirmed selection" for handleAddressBlur to check later.
      inputEl.addEventListener('input', () => {
        userEditedSinceConfirm.current = true
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        const components = place.address_components || []

        if (!components.length) {
          // User pressed Enter/clicked away without picking a real
          // suggestion — Places returns an empty result in that case.
          return
        }
        userEditedSinceConfirm.current = false
        setAddressConfirmedByAutocomplete(true)
        setManualAddressAccepted(false)
        setAddressTouched(true)

        const getComponent = (type: string) =>
          components.find((c: any) => c.types.includes(type))?.long_name || ''

        const streetNumber = getComponent('street_number')
        const route = getComponent('route')
        const city = getComponent('locality') || getComponent('postal_town')
        const state = getComponent('administrative_area_level_1')
        const postalCode = getComponent('postal_code')

        setForm((prev) => ({
          ...prev,
          line1: [streetNumber, route].filter(Boolean).join(' ') || prev.line1,
          city: city || prev.city,
          state: state || prev.state,
          postalCode: postalCode || prev.postalCode,
        }))
      })
    }

    if ((window as any).google) {
      initAutocomplete()
    } else if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`
      script.async = true
      script.onload = initAutocomplete
      document.body.appendChild(script)
    }
  }, [form.countryCode])

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
        <select value={form.countryCode} onChange={handleChange('countryCode')}
          className={`${fieldClass('countryCode', "border rounded-lg px-3 py-2 text-sm sm:col-span-2")}`}>
          <option value="">Select Country</option>
          {SUPPORTED_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        <input placeholder="Full Name" value={form.fullName} onChange={handleChange('fullName')}
          className={fieldClass('fullName', "border rounded-lg px-3 py-2 text-sm sm:col-span-2")} />
        <input placeholder="Email Address" type="email" value={form.email} onChange={handleChange('email')}
          className={fieldClass('email', "border rounded-lg px-3 py-2 text-sm")} />
        <input placeholder="Phone Number" value={form.phone} onChange={handleChange('phone')}
          className={fieldClass('phone', "border rounded-lg px-3 py-2 text-sm")} />
        <div className="sm:col-span-2">
          <input
            ref={addressInputRef}
            placeholder="Start typing your address..."
            defaultValue={form.line1}
            onBlur={handleAddressBlur}
            className={fieldClass('line1', "border rounded-lg px-3 py-2 text-sm w-full")}
          />
          {addressTouched && form.line1 && !addressConfirmedByAutocomplete && (
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-800 mb-2">
                Your address doesn't match our auto-complete records. Do you ship to the address you entered?
              </p>
              <label className="flex items-center gap-2 text-xs text-amber-800">
                <input
                  type="checkbox"
                  checked={manualAddressAccepted}
                  onChange={(e) => setManualAddressAccepted(e.target.checked)}
                />
                Yes, ship to the address I entered
              </label>
            </div>
          )}
        </div>
        <input placeholder="Address Line 2 (optional)" value={form.line2} onChange={handleChange('line2')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:col-span-2" />
        <input placeholder="City" value={form.city} onChange={handleChange('city')}
          className={fieldClass('city', "border rounded-lg px-3 py-2 text-sm")} />
        <input placeholder="State / Province" value={form.state} onChange={handleChange('state')}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        <input placeholder="Postal / Zip Code" value={form.postalCode} onChange={handleChange('postalCode')}
          className={fieldClass('postalCode', "border rounded-lg px-3 py-2 text-sm")} />
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
      {postalBlocked && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3 mb-6">
          {REMOTE_POSTAL_BLOCK_MESSAGE}
        </p>
      )}
      {!postalBlocked && transitMessage && (
        <p className="text-sm text-gray-600 mb-6">{transitMessage}</p>
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

      {!canCheckout && missingFields.length > 0 && (
        <p className="text-sm text-red-600 mb-4">
          Please fill in: {missingFields.join(', ')}
        </p>
      )}

      {canCheckout && (
        <div className="mb-3 text-xs text-gray-500 space-y-1.5">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Payments are securely processed by PayPal. Buyer Protection included.</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>We don't share your financial information with the merchant.</span>
          </div>
        </div>
      )}

      <div ref={paypalContainerRef} style={{ display: canCheckout ? 'block' : 'none' }}></div>

      {canCheckout && (
        <div className="flex justify-center mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/card_logos.png"
            alt="We accept Visa, Mastercard, American Express, and Discover"
            style={{ height: 28 }}
          />
        </div>
      )}

      {canCheckout && (
        <DigitalWalletButtons
          createOrderPayload={async () => {
            // Returns the raw order-shape object; DigitalWalletButtons
            // sends this to the create-order Netlify function, which
            // creates the real PayPal order server-side.
            return buildOrderRequestBody()
          }}
          onPaymentApproved={handleApprovedOrder}
          onPaymentError={(err) => {
            console.error('Google Pay error:', err)
            setSdkStatus('declined')
          }}
        />
      )}

      {sdkStatus === 'pending-review' && (
        <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3 mt-3">
          Your payment is being held for review by PayPal — this is common for a
          first transaction on a new account. You'll be notified once it clears;
          no charge has been finalized yet.
        </p>
      )}
      {sdkStatus === 'declined' && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3 mt-3">
          This payment was declined. Please try a different card or payment method.
        </p>
      )}

      {canCheckout && sdkStatus !== 'rendered' && sdkStatus !== 'paid' && (
        <p style={{ fontSize: 12, color: '#888' }}>paypal status: {sdkStatus}</p>
      )}
    </div>
  )
}