'use client'

import { useEffect, useState } from 'react'

const BACKEND_BASE = 'https://hijabi-bridal-backend.netlify.app'

type Order = {
  orderId: string
  customerName: string
  email: string
  phone: string
  items: { sku: string; quantity: number }[]
  deliveryInstructions: string
  addressLine1: string
  city: string
  state: string
  postalCode: string
  country: string
  total: string
  status: string
  capturedAt: string
  trackingNumber?: string
  carrier?: string
  trackingUrl?: string
}

const STATUS_OPTIONS = [
  { value: 'processing', label: 'Order Processing' },
  { value: 'customs_hold', label: 'Customs Hold' },
  { value: 'shipped', label: 'Shipped' },
]

export default function AdminOrdersPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [trackingInputs, setTrackingInputs] = useState<Record<string, { number: string; carrier: string; url: string }>>({})

  const fetchOrders = async (pw: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BACKEND_BASE}/.netlify/functions/list-orders`, {
        headers: { 'x-admin-password': pw },
      })
      if (res.status === 401) {
        setError('Incorrect password.')
        setAuthed(false)
        return
      }
      const data = await res.json()
      setOrders(data.orders || [])
      setAuthed(true)
    } catch (err) {
      setError('Failed to load orders.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    fetchOrders(password)
  }

  const updateStatus = async (orderId: string, status: string) => {
    const tracking = trackingInputs[orderId] || { number: '', carrier: '', url: '' }
    try {
      await fetch(`${BACKEND_BASE}/.netlify/functions/update-order-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({
          orderId,
          status,
          trackingNumber: tracking.number,
          carrier: tracking.carrier,
          trackingUrl: tracking.url,
        }),
      })
      fetchOrders(password) // refresh
    } catch (err) {
      alert('Failed to update status.')
    }
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-4 py-24">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full mb-3"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button
          onClick={handleLogin}
          className="bg-[#db2777] text-white font-bold py-2 px-6 rounded-full text-sm w-full"
        >
          Log In
        </button>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-black uppercase tracking-tight mb-8">Orders</h1>

      {loading && <p>Loading...</p>}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="border border-pink-100 rounded-2xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.email}</p>
                {order.phone && <p className="text-sm text-gray-600">{order.phone}</p>}
                <p className="text-xs text-gray-400">{order.orderId} — ${order.total}</p>
              </div>
              <span className="text-xs font-bold uppercase bg-gray-100 px-2 py-1 rounded shrink-0">
                {order.status}
              </span>
            </div>

            {/* Full shipping info — backup reference in case LingXing data is
                ever wrong, missing, or needs a manual double-check. */}
            <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm text-gray-700">
              <p className="font-bold text-xs uppercase text-gray-500 mb-1">Shipping Address</p>
              <p>{order.addressLine1}</p>
              <p>{order.city}, {order.state} {order.postalCode}</p>
              <p>{order.country}</p>
              {order.deliveryInstructions && (
                <p className="mt-2">
                  <span className="font-bold text-xs uppercase text-gray-500">Delivery Instructions: </span>
                  {order.deliveryInstructions}
                </p>
              )}
            </div>

            <div className="text-sm mb-3">
              {order.items.map((item, i) => (
                <span key={i}>{item.quantity} × {item.sku}{i < order.items.length - 1 ? ', ' : ''}</span>
              ))}
            </div>

            {/* Tracking fields — only relevant for the "Shipped" action */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <input
                placeholder="Tracking number"
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                onChange={(e) =>
                  setTrackingInputs((prev) => ({
                    ...prev,
                    [order.orderId]: { ...prev[order.orderId], number: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Carrier"
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                onChange={(e) =>
                  setTrackingInputs((prev) => ({
                    ...prev,
                    [order.orderId]: { ...prev[order.orderId], carrier: e.target.value },
                  }))
                }
              />
              <input
                placeholder="Tracking URL (optional)"
                className="border border-gray-300 rounded px-2 py-1 text-xs"
                onChange={(e) =>
                  setTrackingInputs((prev) => ({
                    ...prev,
                    [order.orderId]: { ...prev[order.orderId], url: e.target.value },
                  }))
                }
              />
            </div>

            <div className="flex gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => updateStatus(order.orderId, opt.value)}
                  className="text-xs font-bold bg-pink-50 hover:bg-pink-100 text-[#db2777] px-3 py-1.5 rounded-full"
                >
                  ✓ {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}