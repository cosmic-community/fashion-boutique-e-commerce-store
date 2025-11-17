import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Category, Order } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Get products by category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.category': categoryId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by category');
  }
}

// Create order
export async function createOrder(orderData: {
  customerEmail: string;
  customerName: string;
  orderItems: string;
  totalAmount: number;
  stripePaymentIntent: string;
  shippingAddress: string;
}): Promise<Order> {
  try {
    const orderNumber = Date.now().toString();
    const response = await cosmic.objects.insertOne({
      title: `Order #${orderNumber}`,
      type: 'orders',
      metadata: {
        customer_email: orderData.customerEmail,
        customer_name: orderData.customerName,
        order_items: orderData.orderItems,
        total_amount: orderData.totalAmount,
        stripe_payment_intent: orderData.stripePaymentIntent,
        order_status: 'pending',
        shipping_address: orderData.shippingAddress,
        order_date: new Date().toISOString()
      }
    })
    
    return response.object as Order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

// Get orders by email
export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'orders',
        'metadata.customer_email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    const orders = response.objects as Order[];
    
    // Sort by order date (newest first)
    return orders.sort((a, b) => {
      const dateA = new Date(a.metadata?.order_date || '').getTime();
      const dateB = new Date(b.metadata?.order_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch orders');
  }
}