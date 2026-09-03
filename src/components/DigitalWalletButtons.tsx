'use client'

import { useEffect, useRef, useState } from 'react'

const BACKEND_BASE = 'https://hijabi-bridal-cloudflare.nooradrip.workers.dev'

type DigitalWalletButtonsProps = {
  createOrderPayload: () => any
  onPaymentApproved: (order: any) => Promise<void>
  onPaymentError: (err: any) => void
}

async function createRealOrder(orderRequestBody: any) {
  const createResponse = await fetch(`${BACKEND_BASE}/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderRequestBody),
  })
  const order = await createResponse.json()
  if (!order.id) {
    throw new Error('Order creation failed: ' + JSON.stringify(order))
  }
  return order
}

async function captureRealOrder(orderId: string) {
  const captureResponse = await fetch(`${BACKEND_BASE}/capture-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  })
  return captureResponse.json()
}

export default function DigitalWalletButtons({
  createOrderPayload,
  onPaymentApproved,
  onPaymentError,
}: DigitalWalletButtonsProps) {
  const googlePayContainerRef = useRef<HTMLDivElement>(null)
  const applePayContainerRef = useRef<HTMLDivElement>(null)
  const [googlePayEligible, setGooglePayEligible] = useState(false)
  const [applePayEligible, setApplePayEligible] = useState(false)
  const [applePaySupported, setApplePaySupported] = useState(false)

  useEffect(() => {
    const paypal = (window as any).paypal
    if (!paypal) {
      console.error('PayPal SDK not loaded yet — wallet buttons cannot initialize.')
      return
    }

    // ─── Google Pay ────────────────────────────────────────────────
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
            console.log('Google Pay: not eligible for this buyer/browser/account.')
            return
          }
          setGooglePayEligible(true)

          const paymentsClient = new (window as any).google.payments.api.PaymentsClient({
            environment: config.environment === 'PRODUCTION' ? 'PRODUCTION' : 'TEST',
          })

          const button = paymentsClient.createButton({
            onClick: async () => {
              try {
                const orderRequestBody = await createOrderPayload()
                const order = await createRealOrder(orderRequestBody)

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

                const confirmResult = await googlepay.confirmOrder({
                  orderId: order.id,
                  paymentMethodData: paymentData.paymentMethodData,
                })
                if (confirmResult.status !== 'APPROVED') {
                  throw new Error('Order not approved: ' + JSON.stringify(confirmResult))
                }

                const captureResult = await captureRealOrder(order.id)
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

    // ─── Apple Pay ─────────────────────────────────────────────────
    const applePaySessionAvailable =
      typeof (window as any).ApplePaySession !== 'undefined' &&
      (window as any).ApplePaySession.canMakePayments()
    setApplePaySupported(applePaySessionAvailable)

    if (applePaySessionAvailable) {
      const applepay = paypal.Applepay?.()
      if (applepay) {
        applepay
          .config()
          .then((config: any) => {
            if (!config.isEligible) {
              console.log('Apple Pay: not eligible for this buyer/browser/account.')
              return
            }
            setApplePayEligible(true)

            if (applePayContainerRef.current) {
              applePayContainerRef.current.innerHTML =
                '<apple-pay-button id="apple-pay-btn" buttonstyle="black" type="buy" locale="en"></apple-pay-button>'

              document.getElementById('apple-pay-btn')?.addEventListener('click', async () => {
                try {
                  const orderRequestBody = await createOrderPayload()
                  const order = await createRealOrder(orderRequestBody)

                  const session = new (window as any).ApplePaySession(4, {
                    countryCode: 'US',
                    currencyCode: 'USD',
                    merchantCapabilities: ['supports3DS'],
                    supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
                    total: {
                      label: 'Hijabi Bridal',
                      amount: order.purchase_units[0].amount.value,
                    },
                  })

                  session.onvalidatemerchant = async (event: any) => {
                    try {
                      const merchantSession = await applepay.validateMerchant({
                        validationUrl: event.validationURL,
                      })
                      session.completeMerchantValidation(merchantSession)
                    } catch (err) {
                      session.abort()
                      onPaymentError(err)
                    }
                  }

                  session.onpaymentauthorized = async (event: any) => {
                    try {
                      const confirmResult = await applepay.confirmOrder({
                        orderId: order.id,
                        token: event.payment.token,
                        billingContact: event.payment.billingContact,
                        shippingContact: event.payment.shippingContact,
                      })
                      if (confirmResult.status !== 'APPROVED') {
                        throw new Error('Order not approved: ' + JSON.stringify(confirmResult))
                      }

                      const captureResult = await captureRealOrder(order.id)
                      session.completePayment(session.STATUS_SUCCESS)
                      await onPaymentApproved(captureResult)
                    } catch (err) {
                      session.completePayment(session.STATUS_FAILURE)
                      onPaymentError(err)
                    }
                  }

                  session.begin()
                } catch (err) {
                  onPaymentError(err)
                }
              })
            }
          })
          .catch((err: any) => console.error('Apple Pay config error:', err))
      }
    }
  }, [])

  return (
    <div className="space-y-3 mt-3">
      <div ref={googlePayContainerRef} style={{ display: googlePayEligible ? 'block' : 'none' }} />
      <div ref={applePayContainerRef} style={{ display: applePayEligible ? 'block' : 'none' }} />
      {applePaySupported && !applePayEligible && (
        <p className="text-xs text-gray-400">
          Apple Pay device detected, but not yet eligible — likely pending
          domain verification and/or PayPal production approval.
        </p>
      )}
    </div>
  )
}