'use client'

import { useState } from 'react'
import OrderLookup from '@/components/OrderLookup'

export default function OrdersPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Order Lookup</h1>
        <OrderLookup />
      </div>
    </div>
  )
}