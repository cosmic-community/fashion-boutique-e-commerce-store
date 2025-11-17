import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
})

// Format amount for Stripe (convert to cents)
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

// Format amount for display
export function formatAmountForDisplay(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}