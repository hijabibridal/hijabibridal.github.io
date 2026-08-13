'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

type AddToCartButtonProps = {
  slug: string
  name: string
  price: number
}

export default function AddToCartButton({ slug, name, price }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleClick = () => {
    addItem({ slug, name, price })
    router.push('/cart')
  }

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: '#db2777',
        color: '#fff',
        fontWeight: 700,
        fontSize: 15,
        padding: '12px 24px',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        maxWidth: 320,
      }}
    >
      Add to Cart
    </button>
  )
}