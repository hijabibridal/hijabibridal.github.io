'use client'

import { useEffect, useRef, useState } from 'react'

type DigitalWalletButtonsProps = {
  // Shared with the main PayPal Buttons flow — same createOrder/onApprove
  // logic, just triggered from a different payment method.
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
    // Depends on the main PayPal SDK script already having loaded (from
    // the primary Buttons setup) — this effect assumes window.paypal
    // exists by the time it runs.
    const paypal = (window as any).paypal
    if (!paypal) {
      console.error('PayPal SDK not loaded yet — Google Pay button cannot initialize.')
      return
    }

    // Requires Google's own Pay JS library, separate from PayPal's SDK.
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
                const order = await createOrderPayload()
                const paymentDataRequest = {
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: config.allowedPaymentMethods,
                  merchantInfo: config.merchantInfo,
                  transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPrice: order.amount, // expected to be a string like "1.00"
                    currencyCode: 'USD',
                  },
                  callbackIntents: ['PAYMENT_AUTHORIZATION'],
                }

                const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest)
                const confirmResult = await googlepay.confirmOrder({
                  orderId: order.id,
                  paymentMethodData: paymentData.paymentMethodData,
                })
                await onPaymentApproved(confirmResult)
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