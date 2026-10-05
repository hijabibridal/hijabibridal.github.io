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
  getPurchaseCap,
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
  const [sdkStatus, setSdkStatus] = useState('idle')
  const [infoConfirmed, setInfoConfirmed] = useState(false)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)

  // Only starts flagging fields red once postal/zip code is entered —
  // everything red on a blank page reads as pressuring for info before
  // the visitor's done anything. Email/phone also check actual format.
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isFieldInvalid = (field: keyof FormState) => {
    const value = form[field]
    if (!value) return true
    if (field === 'email') return !EMAIL_PATTERN.test(value)
    if (field === 'phone') return value.replace(/\D/g, '').length < 7
    // Street address must include a number (house/building number)
    if (field === 'line1') return !/\d/.test(value)
    return false
  }
  const fieldError = (field: keyof FormState) => !!form.postalCode && isFieldInvalid(field)
  const fieldClass = (field: keyof FormState, base: string) =>
    `${base} ${fieldError(field) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`

  // Shows the house-number note only when they've typed something into
  // Address Line 1 that has no digit in it (and the postal code is in,
  // so it appears together with the red border, not while still typing).
  const missingHouseNumber =
    !!form.postalCode && form.line1.trim() !== '' && !/\d/.test(form.line1)

  const shippingStatus = form.countryCode ? getShippingStatus(form.countryCode) : null
  const postalBlocked =
    form.countryCode && form.postalCode
      ? isRemoteBlockedPostalCode(form.countryCode, form.postalCode)
      : false
  const transitMessage = form.countryCode ? getTransitMessage(form.countryCode) : null
  // itemCount from useCart is already the sum of quantities across
  // items (confirmed against CartContext.tsx).
  const qualifiesForFreeShipping = itemCount >= 2
  const shippingCost = qualifiesForFreeShipping ? 0 : FLAT_RATE_AMOUNT
  const total = subtotal + shippingCost

  // Purchase caps — keeps orders to certain countries under their
  // duty-free threshold, to avoid customs holds or surprise VAT/duty.
  // Based on the product subtotal, not the order total including
  // shipping, since that's the customs-relevant transaction value.
  const purchaseCap = form.countryCode ? getPurchaseCap(form.countryCode) : null
  const overPurchaseCap = purchaseCap !== null && subtotal > purchaseCap

  // Phone is required — LingXing's fulfillment API rejects orders
  // without a recipient phone number.
  const requiredFieldsFilled =
    form.fullName && !isFieldInvalid('email') && !isFieldInvalid('phone') &&
    !isFieldInvalid('line1') && form.city && form.postalCode && form.countryCode

  const canCheckout =
    requiredFieldsFilled && shippingStatus !== 'unsupported' && !postalBlocked && !overPurchaseCap

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
    // If they'd already confirmed their info and then change something,
    // that confirmation is stale — make them review and confirm again.
    setInfoConfirmed(false)
  }

  const BACKEND_BASE = 'https://hijabi-bridal-cloudflare.nooradrip.workers.dev'

  const handleConfirmInfo = async (checked: boolean) => {
    setInfoConfirmed(checked)
    if (!checked) return

    // This is the moment we know we have real, complete customer info —
    // the natural trigger point to start the abandoned-cart clock. If
    // they don't complete payment within 30 minutes, this becomes the
    // basis for a follow-up email.
    try {
      await fetch(`${BACKEND_BASE}/capture-partial-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          customerName: form.fullName,
          items: items.map((i) => ({ name: i.name, sku: i.sku, quantity: i.quantity })),
        }),
      })
    } catch (err) {
      console.error('Failed to capture partial checkout:', err)
    }
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT COLUMN — shipping & contact form */}
        <div>
          <h2 className="text-xl font-bold mb-2">Shipping & Contact Info</h2>
          <p className="text-sm text-gray-600 mb-4">
            We pay customs fees for all countries and VAT for UK/EU orders. No surprise charges at delivery.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <select value={form.countryCode} onChange={handleChange('countryCode')}
              className={fieldClass('countryCode', "border rounded-lg px-3 py-2 text-sm sm:col-span-2")}>
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

            <input placeholder="Address Line 1" value={form.line1} onChange={handleChange('line1')}
              className={fieldClass('line1', "border rounded-lg px-3 py-2 text-sm sm:col-span-2")} />
            {missingHouseNumber && (
              <p className="text-sm text-gray-700 bg-pink-50 rounded-lg p-3 sm:col-span-2">
                Sorry, we can't ship without a house number. If you don't have one, please use 1.
              </p>
            )}

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
          {postalBlocked && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3 mb-6">
