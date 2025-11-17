# Fashion Boutique E-Commerce Store

![App Preview](https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop&auto=format)

A modern, fully functional e-commerce platform built for fashion brands. Features include product browsing, shopping cart, Stripe-powered checkout, and comprehensive order management.

## Features

- 🛍️ **Product Catalog** - Browse products with detailed views and category filtering
- 🛒 **Shopping Cart** - Add/remove items with persistent cart state
- 💳 **Stripe Checkout** - Secure payment processing with Stripe integration
- 📦 **Order Management** - Track orders with status updates and order history
- 🏷️ **Category System** - Organize products by collection, season, or type
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Updates** - Dynamic content powered by Cosmic CMS
- 🎨 **Modern UI** - Clean, professional design with smooth animations

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=691b476be7349beda2921223&clone_repository=691b4a6fe7349beda2921250)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a web developer portfolio with projects, skills, work experience, and testimonials"

### Code Generation Prompt

> "A modern fully functional e-commerce store with products and categories. Include shopping cart, checkout powered by Stripe, and order management for a fashion brand"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Payment**: Stripe
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account and bucket
- Stripe account for payment processing

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your environment variables to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```

5. Run the development server:
   ```bash
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with category relationships
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get products by category
const { objects: categoryProducts } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating Orders

```typescript
// Create order after successful payment
await cosmic.objects.insertOne({
  title: `Order #${orderNumber}`,
  type: 'orders',
  metadata: {
    customer_email: email,
    customer_name: name,
    order_items: JSON.stringify(cartItems),
    total_amount: totalAmount,
    stripe_payment_intent: paymentIntentId,
    order_status: 'pending',
    shipping_address: shippingAddress
  }
})
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS for:

1. **Product Management**
   - Product details (name, description, price)
   - Product images with imgix optimization
   - Inventory tracking
   - Category relationships

2. **Category Organization**
   - Category names and descriptions
   - Category images
   - Product grouping

3. **Order Storage**
   - Customer information
   - Order items and totals
   - Payment status
   - Order history

All content is fetched server-side for optimal performance and SEO.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables

Make sure to set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

<!-- README_END -->