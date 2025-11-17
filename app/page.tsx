import { getProducts, getCategories } from '@/lib/cosmic'
import ProductGrid from '@/components/ProductGrid'
import Hero from '@/components/Hero'
import CategoryList from '@/components/CategoryList'

export const revalidate = 60

export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories()
  
  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8)
  
  return (
    <div>
      <Hero />
      
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <CategoryList categories={categories} />
        </div>
      </section>
      
      <section className="py-16 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  )
}