'use client'

import { useState } from 'react'
import { Order } from '@/types'

export default function OrderLookup() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSearched(true)
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      
      const data = await response.json()
      setOrders(data.orders)
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Failed to fetch orders. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white px-8 py-2 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {isLoading ? 'Searching...' : 'Search Orders'}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded mb-8">
          {error}
        </div>
      )}
      
      {searched && orders.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">No orders found for this email address.</p>
        </div>
      )}
      
      {orders.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Orders</h2>
          {orders.map((order) => {
            const orderItems = JSON.parse(order.metadata?.order_items || '[]')
            const orderDate = order.metadata?.order_date
            const status = order.metadata?.order_status || 'pending'
            
            return (
              <div key={order.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{order.title}</h3>
                    {orderDate && (
                      <p className="text-sm text-gray-600">
                        {new Date(orderDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(status)}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {orderItems.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.productTitle} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${order.metadata?.total_amount?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}