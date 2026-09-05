'use client'

// Uses react-google-autocomplete (actively maintained, widely used) —
// after two failed attempts hand-rolling Google's own APIs directly,
// a proven library handling the React integration correctly.
//
// Install first: npm install react-google-autocomplete

import Autocomplete from 'react-google-autocomplete'

type AddressAutocompleteProps = {
  countryCode: string
  value: string
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
  value,
  className,
  onManualChange,
  onAddressSelect,
}: AddressAutocompleteProps) {
  return (
    <Autocomplete
      apiKey="AIzaSyCVzmLmZNb7moxks70aP9EXm9Qd-lWKXJA"
      className={className}
      placeholder="Start typing your address..."
      defaultValue={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onManualChange(e.target.value)}
      options={{
        types: ['address'],
        componentRestrictions: { country: countryCode.toLowerCase() },
      }}
      onPlaceSelected={(place) => {
        const components = place.address_components || []
        const getComponent = (type: string) =>
          components.find((c: any) => c.types.includes(type))?.long_name || ''

        onAddressSelect({
          line1: [getComponent('street_number'), getComponent('route')].filter(Boolean).join(' '),
          city: getComponent('locality') || getComponent('postal_town'),
          state: getComponent('administrative_area_level_1'),
          postalCode: getComponent('postal_code'),
        })
      }}
    />
  )
}