'use client'

import { useEffect, useState } from 'react'
import { useRegion } from '../../lib/context/region-context'
import { getProducts } from '../../lib/products'
import { formatPrice } from '../../lib/utils/price-formatter'
import { HttpTypes } from "@medusajs/types"
import Link from 'next/link'
import Image from 'next/image'

export default function ProductsPage() {
  const { regionId } = useRegion()
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      if (regionId) {
        try {
          const { products: productsList } = await getProducts({}, regionId)
          console.log("Product images:", productsList.map(p => p.images?.[0]?.url))
          console.log("Product variants:", productsList)
          setProducts(productsList)
        } catch (err) {
          console.error("Error loading products:", err)
          setError(`Une erreur est survenue lors du chargement des produits. Erreur: ${err}`)
        } finally {
          setLoading(false)
        }
      }
    }
    loadProducts()
  }, [regionId])

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
              {product.images?.[0] && (
                <div className="relative h-64 w-full bg-gray-100">
                  <Image
                    src={product.images[0]?.url ?? ''}
                    alt={product.title}
                    priority={true}
                    className="absolute inset-0 rounded-rounded"
                    fill
                    sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg text-black font-semibold mb-2 group-hover:text-gray-600">
                  {product.title}
                </h2>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    {product.variants?.[0]?.calculated_price?.calculated_amount && (
                      <p className="text-lg font-medium text-gray-700">
                        Prix : {formatPrice(product.variants[0].calculated_price.calculated_amount)}
                      </p>
                    )}
                  </span>

                  {product.variants?.[0]?.inventory_quantity !== undefined && (
                    <span className={`text-sm ${product.variants[0].inventory_quantity > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                      }`}>
                      {product.variants[0].inventory_quantity > 0
                        ? 'En stock'
                        : 'Rupture de stock'
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
