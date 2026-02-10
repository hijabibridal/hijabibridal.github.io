'use client'
import { useEffect } from 'react'

export default function LinkHandler() {
  useEffect(() => {
    // This will run after the page loads
    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => {
      link.setAttribute('data-next-link', 'true')
    })
  }, [])

  return null
}