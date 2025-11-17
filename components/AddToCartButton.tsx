'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { getCart, saveCart } from '@/lib/cart'

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  
  const stock = product.metadata?.stock || 0
  const isOutOfStock = stock <= 0
  
  const handleAddToCart = () => {
    const cart = getCart()
    const existingItem = cart.find(item => item.product.id === product.id)
    
    if (existingItem) {
      const updatedCart = cart.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + quantity }
        }
        return item
      })
      saveCart(updatedCart)
    } else {
      saveCart([...cart, { product, quantity }])
    }
    
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="font-semibold">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max={stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-3 py-2 border rounded"
          disabled={isOutOfStock}
        />
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdded}
        className={`w-full py-4 rounded font-semibold text-lg transition-colors ${
          isOutOfStock
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : isAdded
            ? 'bg-green-600 text-white'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isOutOfStock ? 'Out of Stock' : isAdded ? 'Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  )
}