"use client";

import AddToCart from "@/components/AddToCart";
import { getProductByHandle } from "@/lib/products";
import { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface ProductType {
  id: string;
  variantId: string;
  title: string;
  thumbnail: string;
  price: number;
  onOpenCart?: () => void;
}

const getProductVariantId = (product: HttpTypes.StoreProduct): string => {
  return product.variants?.[0]?.id || "";
};

const getProductPrice = (product: HttpTypes.StoreProduct): number => {
  const variant = product.variants?.[0];
  return variant?.calculated_price?.calculated_amount || 0;
};

export default function ProductInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<HttpTypes.StoreProduct>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("green");
  const [selectedSize, setSelectedSize] = useState<string>("xl");
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
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

  const productToAddCart = {
    id: product?.id || "",
    variantId: product ? getProductVariantId(product) : "",
    title: product?.title || "Produit sans titre",
    thumbnail:
      product?.images?.[0]?.url ||
      product?.thumbnail ||
      "/placeholder-image.png",
    price: product ? getProductPrice(product) : 0,
  };

  return (
    <div className="px-4 md:px-8 lg:px-36 w-full">
      <div className="h-[50px]"></div>

      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D12E87]"></div>
        </div>
      )}

      {error && <div className="text-red-500 text-center py-8">{error}</div>}

      {!loading && !error && product && (
        <div className="flex flex-col md:flex-row justify-center items-start gap-20 w-full">
          {/* Image Section */}
          <div className="relative h-[600px] md:w-[500px] w-full">
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
            <h1 className="text-3xl font-normal">
              {product.title || "Élégance traditionnelle moderne"}
            </h1>

            <div className="text-2xl font-normal text-[#D12E87]">
              {getProductPrice(product)} fcfa
            </div>

            <div className="prose max-w-[600px] min-md:max-w-full text-gray-700">
              <p>
                {product.description ||
                  "Un homme pose avec assurance dans une tenue traditionnelle revisitée, alliant modernité et authenticité. Le tissu blanc, rehaussé de motifs verts et noirs, offre un style raffiné et intemporel. Une touche de sophistication parfaite pour les amateurs de mode africaine contemporaine."}
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Color</h3>
              <div className="flex space-x-2">
                <button
                  className={`w-7 h-7 rounded-full bg-green-500 ${
                    selectedColor === "green"
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  }`}
                  onClick={() => setSelectedColor("green")}
                ></button>
                <button
                  className={`w-7 h-7 rounded-full bg-gray-600 ${
                    selectedColor === "gray"
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  }`}
                  onClick={() => setSelectedColor("gray")}
                ></button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Taille</h3>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-md ${
                    selectedSize === "xs"
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedSize("xs")}
                >
                  XS
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    selectedSize === "xl"
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedSize("xl")}
                >
                  XL
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    selectedSize === "l"
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => setSelectedSize("l")}
                >
                  L
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}

            <AddToCart product={productToAddCart} onAddToCart={() => setIsCartOpen(true)} />

            {/* Accordion Sections */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center py-3 cursor-pointer">
                <h3 className="text-lg font-medium">Caracteristique</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center py-3 cursor-pointer">
                <h3 className="text-lg font-medium">Payment et livraison</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
