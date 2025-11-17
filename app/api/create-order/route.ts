import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const orderData = await request.json()
    
    const order = await createOrder({
      customerEmail: orderData.customerEmail,
      customerName: orderData.customerName,
      orderItems: orderData.orderItems,
      totalAmount: orderData.totalAmount,
      stripePaymentIntent: orderData.stripePaymentIntent,
      shippingAddress: orderData.shippingAddress
    })
    
    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}