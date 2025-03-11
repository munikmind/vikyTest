"use client";

import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";
import { HttpTypes } from "@medusajs/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import FilterModal from "./FilterModal";

type Filter = {
  name: string;
  value: string;
  label?: string;
};

interface CategoryPageProps {
  categoryId: string;
  categoryName: string;
}

export default function CategoryPage({
  categoryId,
  categoryName,
}: CategoryPageProps) {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { products } = await getProductsByCategory(categoryId, 50);
        setProducts(products);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Une erreur est survenue lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [categoryId]);

  const getProductPrice = (product: HttpTypes.StoreProduct): number => {
    const variant = product.variants?.[0];
    return variant?.calculated_price?.calculated_amount || 0;
  };

  const removeFilter = (filterToRemove: Filter) => {
    setActiveFilters(
      activeFilters.filter((filter) => filter.value !== filterToRemove.value)
    );
  };

  const handleApplyFilters = (filters: Filter[]) => {
    setActiveFilters(filters);
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const price = getProductPrice(product);
      const priceFilter = activeFilters.find((f) => f.name === "Prix");

      if (priceFilter) {
        const [min, max] = priceFilter.value.split("-").map(Number);
        if (price < min || price > max) return false;
      }

      // Ajoutez d'autres logiques de filtrage si nécessaire
      return true;
    });
  };

  return (
    <div className="px-4 md:px-8 lg:px-36 pt-24">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-5xl font-normal mb-6">{categoryName}</h1>

        {/* Filters Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Active Filters Display */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="px-4 py-2 border rounded-full text-sm flex items-center gap-2"
            >
              Filtres{" "}
              {activeFilters.length > 0 && (
                <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeFilters.length}
                </span>
              )}
            </button>

            <div className="flex gap-2">
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {filter.name}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="hover:text-[#D12E87]"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-50"
            onClick={() => setShowFilterModal(true)}
          >
            <span>Filtrer</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M6 12h12m-9 6h6" />
            </svg>
          </button>
        </div>
        <div className="w-full border border-gray-400"></div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D12E87]"></div>
        </div>
      )}

      {/* Error State */}
      {error && <div className="text-red-500 text-center py-8">{error}</div>}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {getFilteredProducts().map((product) => (
            <div key={product.handle} className="flex flex-col gap-3">
              <ProductCard
                handle={product.handle}
                imageSrc={
                  product.images?.[0]?.url ||
                  product.thumbnail ||
                  "/placeholder-image.png"
                }
                productName={product.title}
                price={getProductPrice(product)}
              />
              {/* <div className="flex flex-col">
                <h3 className="text-lg font-normal">{product.title}</h3>
                <span className="text-base text-gray-600">
                  {getProductPrice(product)} FCFA
                </span>
              </div> */}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun produit trouvé dans cette catégorie
        </div>
      )}

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}
