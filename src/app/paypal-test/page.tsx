// app/paypal-test/page.tsx
'use client'

import { useEffect, useState } from 'react'

export default function PayPalTestPage() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAGXFcABmGYsu3sSR7CBoopizFVTwzHVp8XzZwfs45JPPZ9CYmUBhktn-FGdS7fGuG2zN_-fsii3jNcEg&components=hosted-buttons&disable-funding=venmo&currency=USD'
    script.async = true

    script.onload = () => {
      console.log('PayPal SDK loaded, window.paypal:', (window as any).paypal)
      try {
        ;(window as any).paypal
          .HostedButtons({ hostedButtonId: 'YJR7FGY6LZBGU' })
          .render('#paypal-container-YJR7FGY6LZBGU')
        setStatus('rendered')
      } catch (err) {
        console.error('PayPal render failed:', err)
        setStatus('render-error')
      }
    }

    script.onerror = (err) => {
      console.error('PayPal SDK failed to load:', err)
      setStatus('load-error')
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="p-8">
      <h1>PayPal Test</h1>
      <p style={{ fontSize: 12, color: '#888' }}>status: {status}</p>
      <div id="paypal-container-YJR7FGY6LZBGU"></div>
    </div>
  )
}