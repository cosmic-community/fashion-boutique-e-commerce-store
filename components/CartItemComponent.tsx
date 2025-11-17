import { CartItem } from '@/types'

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) {
  const image = item.product.metadata?.image
  const price = item.product.metadata?.price || 0
  
  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="w-24 h-24 bg-secondary rounded overflow-hidden flex-shrink-0">
        {image ? (
          <img
            src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={item.product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No image
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold mb-1">{item.product.title}</h3>
        <p className="text-gray-600 mb-2">${price.toFixed(2)} each</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="w-8 h-8 border rounded hover:bg-secondary transition-colors"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="w-12 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="w-8 h-8 border rounded hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>
          
          <button
            onClick={() => onRemove(item.product.id)}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-bold">${(price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}