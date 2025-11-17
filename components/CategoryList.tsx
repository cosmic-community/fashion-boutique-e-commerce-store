import Link from 'next/link'
import { Category } from '@/types'

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No categories available.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category) => {
        const image = category.metadata?.image
        
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group"
          >
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-3">
              {image ? (
                <img
                  src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {category.title}
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-center group-hover:text-gray-600 transition-colors">
              {category.title}
            </h3>
          </Link>
        )
      })}
    </div>
  )
}