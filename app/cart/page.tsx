'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CartItem } from '@/types'
import { getCart, saveCart, calculateCartTotal } from '@/lib/cart'
import CartItemComponent from '@/components/CartItemComponent'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setCart(getCart())
    setIsLoading(false)
  }, [])
  
  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, quantity) }
      }
      return item
    })
    setCart(updatedCart)
    saveCart(updatedCart)
  }
  
  const removeItem = (productId: string) => {
    const updatedCart = cart.filter(item => item.product.id !== productId)
    setCart(updatedCart)
    saveCart(updatedCart)
  }
  
  const total = calculateCartTotal(cart)
  
  if (isLoading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center">Loading cart...</p>
        </div>
      </div>
    )
  }
  
  if (cart.length === 0) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some items to get started!</p>
          <Link 
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Shop Products
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <CartItemComponent
              key={item.product.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
        
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-3xl font-bold">${total.toFixed(2)}</span>
          </div>
          
          <Link
            href="/checkout"
            className="block w-full bg-black text-white text-center px-8 py-4 rounded hover:bg-gray-800 transition-colors text-lg font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}