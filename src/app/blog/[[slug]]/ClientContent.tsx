'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function ClientContent({ html }: { html: string }) {
  useEffect(() => {
    // Convert links after component mounts
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      const href = link.getAttribute('href')
      if (!href) return

      const span = document.createElement('span')
      link.parentNode?.replaceChild(span, link)
      
      span.innerHTML = link.outerHTML // Preserves all original attributes
    })
  }, [html])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}