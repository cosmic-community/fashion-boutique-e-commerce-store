import Link from 'next/link'
import CartIcon from './CartIcon'

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Fashion Boutique
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="hover:text-gray-600 transition-colors">
              Products
            </Link>
            <Link href="/orders" className="hover:text-gray-600 transition-colors">
              Orders
            </Link>
          </nav>
          
          <CartIcon />
        </div>
      </div>
    </header>
  )
}