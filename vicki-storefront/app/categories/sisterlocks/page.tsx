"use client";

import Navbar from "@/components/navbar";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";
import { HttpTypes } from "@medusajs/types";
import { useEffect, useState } from "react";

export default function Habillement() {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { products } = await getProductsByCategory(
          "pcat_01JNRN4P3DKQXTDJNVVZKK7WR7",
          50
        );
        setProducts(products);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Une erreur est survenue lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const getProductPrice = (product: HttpTypes.StoreProduct): number => {
    const variant = product.variants?.[0];
    return variant?.calculated_price?.calculated_amount || 0;
  };

  return (
    <div className="px-4 md:px-8 lg:px-36">
      <Navbar />
      <div className="h-[50px]"></div>

      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D12E87]"></div>
        </div>
      )}

      {error && <div className="text-red-500 text-center py-8">{error}</div>}

      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold mb-8">Habillement</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
              key={product.handle}
              handle={product.handle}
              imageSrc={
                product.images?.[0]?.url ||
                "/placeholder-image.png"
              }
              productName={product.title}
              price={getProductPrice(product)}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun produit trouvé dans cette catégorie
            </div>
          )}
        </>
      )}
    </div>
  );
}
