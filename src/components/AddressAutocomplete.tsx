'use client'

import { useEffect, useRef, useState } from 'react'

// Server-side proxy approach — the browser only ever talks to our own
// Cloudflare Worker, never to a Google domain directly. This is what
// actually fixes ad blockers catching the request: they can only block
// what the browser itself calls, and the browser now calls nothing but
// our own backend.

const BACKEND_BASE = 'https://hijabi-bridal-cloudflare.nooradrip.workers.dev'

type Suggestion = { placeId: string; text: string }

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
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close the dropdown on outside click.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (newValue: string) => {
    setValue(newValue)
    onManualChange(newValue)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (newValue.length < 3) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    // Wait 300ms after the last keystroke before actually calling the
    // backend — avoids firing a request on every single character.
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`${BACKEND_BASE}/address-autocomplete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: newValue, countryCode }),
        })
        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setShowDropdown((data.suggestions || []).length > 0)
      } catch (err) {
        console.error('Address autocomplete request failed:', err)
      }
    }, 300)
  }

  const handleSelect = async (suggestion: Suggestion) => {
    setValue(suggestion.text)
    setShowDropdown(false)
    setSuggestions([])

    try {
      const response = await fetch(`${BACKEND_BASE}/address-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeId: suggestion.placeId }),
      })
      const data = await response.json()
      if (data.line1 || data.city || data.postalCode) {
        onAddressSelect(data)
      }
    } catch (err) {
      console.error('Address details request failed:', err)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Start typing your address..."
        className={className}
      />
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto">
          {suggestions.map((s) => (
            <button
              key={s.placeId}
              type="button"
              onClick={() => handleSelect(s)}
              className="block w-full text-left px-3 py-2 text-sm hover:bg-pink-50 border-b border-gray-100 last:border-b-0"
            >
              {s.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}