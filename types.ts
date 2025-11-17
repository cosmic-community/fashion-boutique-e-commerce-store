// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product interface
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description: string;
    price: number;
    image?: {
      url: string;
      imgix_url: string;
    };
    category?: Category;
    stock: number;
    sku?: string;
    sizes?: string[];
    colors?: string[];
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Order interface
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    customer_email: string;
    customer_name: string;
    order_items: string;
    total_amount: number;
    stripe_payment_intent: string;
    order_status: OrderStatus;
    shipping_address?: string;
    order_date: string;
  };
}

// Type literals for order status
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Cart item interface
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// Checkout form data
export interface CheckoutFormData {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guard for Product
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

// Type guard for Category
export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Type guard for Order
export function isOrder(obj: CosmicObject): obj is Order {
  return obj.type === 'orders';
}