import { getProducts } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}