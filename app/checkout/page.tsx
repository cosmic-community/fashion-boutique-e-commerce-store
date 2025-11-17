'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { getCart, calculateCartTotal } from '@/lib/cart'
import CheckoutForm from '@/components/CheckoutForm'
import { CartItem } from '@/types'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    const currentCart = getCart()
    if (currentCart.length === 0) {
      router.push('/cart')
    }
    setCart(currentCart)
    setIsLoading(false)
  }, [router])
  
  const total = calculateCartTotal(cart)
  
  if (isLoading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center">Loading checkout...</p>
        </div>
      </div>
    )
  }
  
  if (cart.length === 0) {
    return null
  }
  
  return (
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="bg-secondary p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.title} x {item.quantity}</span>
                <span>${((item.product.metadata?.price || 0) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <CheckoutForm cart={cart} total={total} />
      </div>
    </div>
  )
}