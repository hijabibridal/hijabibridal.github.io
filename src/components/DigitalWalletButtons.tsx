'use client'

import { useEffect, useRef, useState } from 'react'

// Your Netlify backend site — separate domain from the frontend, hence
// the CORS headers on the functions themselves.
const BACKEND_BASE = 'https://hijabi-bridal-backend.netlify.app'

type DigitalWalletButtonsProps = {
  // Returns the same order-shape object the main PayPal button already
  // builds (payer, purchase_units, application_context) — NOT a real
  // PayPal order yet, just the request body to send to our backend.
  createOrderPayload: () => any
  onPaymentApproved: (order: any) => Promise<void>
  onPaymentError: (err: any) => void
}

export default function DigitalWalletButtons({
  createOrderPayload,
  onPaymentApproved,
  onPaymentError,
}: DigitalWalletButtonsProps) {
  const googlePayContainerRef = useRef<HTMLDivElement>(null)
  const [googlePayEligible, setGooglePayEligible] = useState(false)

  useEffect(() => {
    const paypal = (window as any).paypal
    if (!paypal) {
      console.error('PayPal SDK not loaded yet — Google Pay button cannot initialize.')
      return
    }

    const googleScript = document.createElement('script')
    googleScript.src = 'https://pay.google.com/gp/p/js/pay.js'
    googleScript.async = true
    googleScript.onload = () => {
      const googlepay = paypal.Googlepay?.()
      if (!googlepay) {
        console.error('paypal.Googlepay() not available — check SDK components param.')
        return
      }

      googlepay
        .config()
        .then((config: any) => {
          if (!config.isEligible) {
            console.log('Google Pay: not eligible for this buyer/browser.')
            return
          }
          setGooglePayEligible(true)

          const paymentsClient = new (window as any).google.payments.api.PaymentsClient({
            environment: config.environment === 'PRODUCTION' ? 'PRODUCTION' : 'TEST',
          })

          const button = paymentsClient.createButton({
            onClick: async () => {
              try {
                // 1. Create the real PayPal order server-side (needs the
                // secret, so this goes through our Netlify function).
                const orderRequestBody = createOrderPayload()
                const createResponse = await fetch(
                  `${BACKEND_BASE}/.netlify/functions/create-order`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderRequestBody),
                  }
                )
                const order = await createResponse.json()
                if (!order.id) {
                  throw new Error('Order creation failed: ' + JSON.stringify(order))
                }

                // 2. Show the Google Pay sheet.
                const paymentDataRequest = {
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: config.allowedPaymentMethods,
                  merchantInfo: config.merchantInfo,
                  transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPrice: order.purchase_units[0].amount.value,
                    currencyCode: 'USD',
                  },
                  callbackIntents: ['PAYMENT_AUTHORIZATION'],
                }
                const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest)

                // 3. Confirm the order with PayPal, client-side (no
                // secret needed for this step — the SDK handles it).
                const confirmResult = await googlepay.confirmOrder({
                  orderId: order.id,
                  paymentMethodData: paymentData.paymentMethodData,
                })

                if (confirmResult.status !== 'APPROVED') {
                  throw new Error('Order not approved: ' + JSON.stringify(confirmResult))
                }

                // 4. Capture the payment server-side (needs the secret
                // again — back through our Netlify function).
                const captureResponse = await fetch(
                  `${BACKEND_BASE}/.netlify/functions/capture-order`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId: order.id }),
                  }
                )
                const captureResult = await captureResponse.json()

                await onPaymentApproved(captureResult)
              } catch (err) {
                onPaymentError(err)
              }
            },
          })

          if (googlePayContainerRef.current) {
            googlePayContainerRef.current.innerHTML = ''
            googlePayContainerRef.current.appendChild(button)
          }
        })
        .catch((err: any) => console.error('Google Pay config error:', err))
    }
    document.body.appendChild(googleScript)
  }, [])

  return (
    <div ref={googlePayContainerRef} style={{ display: googlePayEligible ? 'block' : 'none' }} className="mt-3" />
  )
}