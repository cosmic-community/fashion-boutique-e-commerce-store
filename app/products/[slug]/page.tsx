// app/products/[slug]/page.tsx
import { getProductBySlug, getProducts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import Image from 'next/image'

export const revalidate = 60

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }
  
  const image = product.metadata?.image
  const price = product.metadata?.price || 0
  const description = product.metadata?.description || ''
  const stock = product.metadata?.stock || 0
  const category = product.metadata?.category
  
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square relative bg-secondary rounded-lg overflow-hidden">
            {image ? (
              <img
                src={`${image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            {category && (
              <p className="text-sm text-gray-600 mb-2">{category.title}</p>
            )}
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-3xl font-semibold mb-6">
              ${price.toFixed(2)}
            </p>
            
            <div className="mb-8">
              <p className="text-gray-700 whitespace-pre-line">{description}</p>
            </div>
            
            <div className="mb-8">
              <p className="text-sm text-gray-600">
                {stock > 0 ? (
                  <span className="text-green-600">In Stock ({stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
            
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}