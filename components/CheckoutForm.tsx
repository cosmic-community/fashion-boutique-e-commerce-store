'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartItem } from '@/types'
import { saveCart } from '@/lib/cart'

interface CheckoutFormProps {
  cart: CartItem[];
  total: number;
}

export default function CheckoutForm({ cart, total }: CheckoutFormProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)
    
    try {
      // Create payment intent
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })
      
      if (!paymentResponse.ok) {
        throw new Error('Failed to create payment')
      }
      
      const { clientSecret } = await paymentResponse.json()
      
      // In a real app, you would use Stripe Elements here
      // For this demo, we'll simulate a successful payment
      const paymentIntentId = clientSecret.split('_secret_')[0]
      
      // Create order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: formData.email,
          customerName: formData.name,
          orderItems: JSON.stringify(cart.map(item => ({
            productId: item.product.id,
            productTitle: item.product.title,
            quantity: item.quantity,
            price: item.product.metadata?.price || 0,
          }))),
          totalAmount: total,
          stripePaymentIntent: paymentIntentId,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        }),
      })
      
      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }
      
      // Clear cart
      saveCart([])
      
      // Redirect to success page
      alert('Order placed successfully! Check your email for confirmation.')
      router.push('/orders')
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to process payment. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      
      <div>
        <label htmlFor="name" className="block font-semibold mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block font-semibold mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block font-semibold mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="state" className="block font-semibold mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block font-semibold mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            required
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-black text-white py-4 rounded font-semibold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
      
      <p className="text-sm text-gray-600 text-center">
        Note: This is a demo checkout. No real payment will be processed.
      </p>
    </form>
  )
}