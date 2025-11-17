import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-secondary mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Fashion Boutique</h3>
            <p className="text-gray-600">
              Your destination for the latest fashion trends and timeless classics.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-black">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-600 hover:text-black">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-600">
              Email: support@fashionboutique.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Fashion Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}