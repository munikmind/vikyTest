"use client";

import Navbar from "@/components/navbar";
import { getProductByHandle } from "@/lib/products";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function ProductInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<HttpTypes.StoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        console.log(resolvedParams);
        const productData = await getProductByHandle(resolvedParams.id);
        setProduct(productData);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Une erreur est survenue lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [resolvedParams.id]);

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

      {!loading && !error && product && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative h-[500px] w-full">
            <Image
              src={
                product.images?.[0]?.url ||
                product.thumbnail ||
                "/placeholder-image.png"
              }
              alt={product.title}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="text-2xl font-semibold">
              Prix : {getProductPrice(product)} FcFA
            </div>
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
            <button className="w-full md:w-auto px-8 py-3 bg-[#D12E87] text-white font-semibold rounded-md hover:bg-[#B0246F] transition-colors">
              Ajouter au panier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
