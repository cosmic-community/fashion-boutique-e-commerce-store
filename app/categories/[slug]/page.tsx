// app/categories/[slug]/page.tsx
import { getCategories, getProductsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)
  
  if (!category) {
    notFound()
  }
  
  const products = await getProductsByCategory(category.id)
  
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
          {category.metadata?.description && (
            <p className="text-gray-600 text-lg">{category.metadata.description}</p>
          )}
        </div>
        
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}