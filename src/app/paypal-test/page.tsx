// app/paypal-test/page.tsx
'use client'

import Script from 'next/script'

export default function PayPalTestPage() {
  return (
    <div className="p-8">
      <h1>PayPal Test</h1>

      {/* Part 1: SDK loader */}
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAAGXFcABmGYsu3sSR7CBoopizFVTwzHVp8XzZwfs45JPPZ9CYmUBhktn-FGdS7fGuG2zN_fsii3jNcEg&components=hosted-buttons&disable-funding=venmo&currency=USD"
        strategy="afterInteractive"
        onLoad={() => {
          // Part 2: render the button, only after SDK is ready
          // @ts-ignore
          window.paypal.HostedButtons({
            hostedButtonId: 'YJR7FGY6LZBGU',
          }).render('#paypal-container-YJR7FGY6LZBGU')
        }}
      />

      <div id="paypal-container-YJR7FGY6LZBGU"></div>
    </div>
  )
}