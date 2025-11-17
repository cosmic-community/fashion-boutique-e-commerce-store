import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative h-[600px] bg-secondary flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Your Style
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Shop our curated collection of premium fashion pieces designed to elevate your wardrobe.
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white px-8 py-4 rounded hover:bg-gray-800 transition-colors text-lg font-semibold"
        >
          Shop Now
        </Link>
      </div>
    </div>
  )
}