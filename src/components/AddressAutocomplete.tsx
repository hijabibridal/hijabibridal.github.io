'use client'

import { useEffect, useRef, useState } from 'react'

// Rebuilt directly against Google's own current official sample
// (developers.google.com/.../places-autocomplete-addressform, last
// verified current as of September 2026) after two earlier attempts
// both turned out to rely on outdated APIs — the legacy
// google.maps.places.Autocomplete class, then a hand-rolled
// PlaceAutocompleteElement usage that set options via the constructor
// instead of as properties on the created element, which is the
// pattern Google's own reference code actually uses.

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
  const elementRef = useRef<any>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!countryCode || !containerRef.current) return

    const scriptId = 'google-places-script'

    const init = async () => {
      const container = containerRef.current
      if (!container || !(window as any).google) return

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
      elementRef.current = element
      setReady(true)

      element.addEventListener('gmp-select', async ({ placePrediction }: any) => {
        const place = placePrediction.toPlace()
        // Requesting only the one field actually needed — Google's own
        // docs specifically flag unspecified fields as billed for all
        // of them, so this keeps cost down and matches their sample.
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
          // Some regions (UK, Sweden) use postal_town instead of locality.
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
      })

      element.addEventListener('input', (e: any) => {
        onManualChange(e.target.value || '')
      })
    }

    if ((window as any).google?.maps?.importLibrary) {
      init()
    } else if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&loading=async&libraries=places`
      script.async = true
      script.onload = init
      document.body.appendChild(script)
    }
  }, [countryCode])

  return (
    <div ref={containerRef} className={className}>
      {!ready && <span className="text-gray-400 text-sm">Loading address search...</span>}
    </div>
  )
}