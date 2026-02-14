'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientLinkHandler() {
  const router = useRouter()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Skip if user is holding modifier keys (ctrl/cmd, shift, alt)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      
      // Find closest anchor element
      const target = e.target as Element
      const anchor = target.closest('a[href^="/"]')
      
      if (!anchor) return
      
      // Skip if link has target="_blank" or download attribute
      const targetAttr = anchor.getAttribute('target')
      if (targetAttr && targetAttr !== '_self') return
      if (anchor.hasAttribute('download')) return
      
      // Get href and prevent default navigation
      const href = anchor.getAttribute('href')
      if (!href) return
      
      e.preventDefault()
      router.push(href)
    }

    // Add single event listener to document
    document.addEventListener('click', handleClick)
    
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [router])

  return null
}