import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.metadata?.image
  const price = product.metadata?.price || 0
  const stock = product.metadata?.stock || 0
  
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-3">
        {image ? (
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      <h3 className="font-semibold mb-1 group-hover:text-gray-600 transition-colors">
        {product.title}
      </h3>
      <p className="text-lg font-bold">${price.toFixed(2)}</p>
      {stock <= 0 && (
        <p className="text-sm text-red-600">Out of Stock</p>
      )}
    </Link>
  )
}