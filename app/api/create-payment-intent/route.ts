import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { formatAmountForStripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const { amount } = await request.json()
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })
    
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}