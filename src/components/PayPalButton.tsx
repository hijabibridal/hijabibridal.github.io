'use client'

import { useEffect, useState } from 'react'

export default function PayPalButton({ hostedButtonId }: { hostedButtonId: string }) {
  const [status, setStatus] = useState('loading')
  const containerId = `paypal-container-${hostedButtonId}`

  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://www.paypal.com/sdk/js?client-id=BAAGXFcABmGYsu3sSR7CBoopizFVTwzHVp8XzZwfs45JPPZ9CYmUBhktn-FGdS7fGuG2zN_-fsii3jNcEg&components=hosted-buttons&disable-funding=venmo&currency=USD'
    script.async = true

    script.onload = () => {
      try {
        ;(window as any).paypal
          .HostedButtons({ hostedButtonId })
          .render(`#${containerId}`)
        setStatus('rendered')
      } catch (err) {
        console.error('PayPal render failed:', err)
        setStatus('render-error')
      }
    }

    script.onerror = () => setStatus('load-error')
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [hostedButtonId, containerId])

  return (
    <div>
      <div id={containerId}></div>
      {status !== 'rendered' && (
        <p style={{ fontSize: 12, color: '#888' }}>paypal status: {status}</p>
      )}
    </div>
  )
}