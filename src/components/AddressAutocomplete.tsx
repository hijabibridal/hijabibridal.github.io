'use client'

import { useEffect, useRef, useState } from 'react'

// Rebuilt against Google's own current official sample
// (developers.google.com/.../places-autocomplete-addressform) after two
// earlier attempts both relied on outdated APIs. This version adds a
// critical piece the earlier ones were missing: a real, working fallback
// text input if Google's script fails to load for ANY reason (ad
// blockers, network issues, a Google-side outage) — without one, a
// failed load left the customer with no way to type an address at all,
// which is a genuine checkout-blocking bug, not just a missing feature.

const GOOGLE_PLACES_API_KEY = 'AIzaSyCVzmLmZNb7moxks70aP9EXm9Qd-lWKXJA'

type AddressAutocompleteProps = {
  countryCode: string
  className: string
  onManualChange: (value: string) => void
  onAddressSelect: (data: {
    line1: string
    city: string
    state: string
    postalCode: string
  }) => void
}

export default function AddressAutocomplete({
  countryCode,
  className,
  onManualChange,
  onAddressSelect,
}: AddressAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')

  useEffect(() => {
    if (!countryCode || !containerRef.current) return

    const scriptId = 'google-places-script'
    setStatus('loading')

    const init = async () => {
      try {
        const container = containerRef.current
        if (!container || !(window as any).google?.maps?.importLibrary) {
          throw new Error('Google Maps script did not load correctly')
        }

        container.innerHTML = ''

        const placesLibrary = await (window as any).google.maps.importLibrary('places')

        // Created with NO constructor arguments — options are set as
        // properties on the instance afterward, matching Google's own
        // current reference implementation exactly.
        const element = new placesLibrary.PlaceAutocompleteElement()
        element.includedRegionCodes = [countryCode.toLowerCase()]
        element.includedPrimaryTypes = ['street_address']
        element.style.width = '100%'

        container.appendChild(element)
        setStatus('ready')

        element.addEventListener('gmp-select', async ({ placePrediction }: any) => {
          try {
            const place = placePrediction.toPlace()
            await place.fetchFields({ fields: ['addressComponents'] })
            if (!place.addressComponents) return

            let line1 = ''
            let city = ''
            let state = ''
            let postalCode = ''

            for (const component of place.addressComponents) {
              if (component.types.includes('street_number')) {
                line1 = `${component.longText} ${line1}`
              }
              if (component.types.includes('route')) {
                line1 += component.shortText
              }
              if (component.types.includes('locality')) {
                city = component.longText
              }
              if (!city && component.types.includes('postal_town')) {
                city = component.longText
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.shortText
              }
              if (component.types.includes('postal_code')) {
                postalCode = component.longText
              }
            }

            onAddressSelect({ line1: line1.trim(), city, state, postalCode })
          } catch (err) {
            console.error('Address selection failed:', err)
          }
        })

        element.addEventListener('input', (e: any) => {
          onManualChange(e.target.value || '')
        })
      } catch (err) {
        // This is the fix for today's actual bug: if Google's script
        // fails for any reason, fall back to a plain input instead of
        // leaving the customer with no way to type an address at all.
        console.error('Address autocomplete failed to load, falling back to plain input:', err)
        setStatus('failed')
      }
    }

    if ((window as any).google?.maps?.importLibrary) {
      init()
    } else if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&loading=async&libraries=places`
      script.async = true
      script.onload = init
      script.onerror = () => setStatus('failed')
      document.body.appendChild(script)

      // If the script hangs (blocked silently rather than erroring),
      // don't leave the customer waiting forever.
      setTimeout(() => {
        setStatus((current) => (current === 'loading' ? 'failed' : current))
      }, 6000)
    }
  }, [countryCode])

  if (status === 'failed') {
    return (
      <input
        placeholder="Street address"
        onChange={(e) => onManualChange(e.target.value)}
        className={className}
      />
    )
  }

  return (
    <div ref={containerRef} className={className}>
      {status === 'loading' && <span className="text-gray-400 text-sm">Loading address search...</span>}
    </div>
  )
}