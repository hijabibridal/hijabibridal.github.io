'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type CartItem = {
  slug: string
  name: string
  price: number
  color?: string
  sku?: string
  image?: string
  url?: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = 'hijabi-bridal-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch (err) {
      console.error('Failed to load cart:', err)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('Failed to save cart:', err)
    }
  }, [items, hydrated])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug && i.color === item.color)
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(slug)
      return
    }
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)
  const toggleDrawer = () => setIsDrawerOpen((o) => !o)

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQuantity, clearCart,
        itemCount, subtotal, isDrawerOpen, openDrawer, closeDrawer, toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}