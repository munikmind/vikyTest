"use client";
import { HttpTypes } from "@medusajs/types"
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProductsByCollection } from "../lib/products";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const CurrentFavorite = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<
    HttpTypes.StoreProduct[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Récupération des produits de la collection "Coup de Coeur"
        const products = await getProductsByCollection(
          "pcol_01JNRND7C841843MHSEPGWYKKP"
        );
        setFavoriteProducts(products);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">Chargement des produits...</div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="container mx-auto py-10">
        Aucun produit trouvé dans cette collection.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Titre et sous-titre */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
            Nos <span className="text-[#D12E87]">Coup de Cœur du Moment</span>
          </h2>
          <p className="text-gray-700 text-lg font-medium">
            Découvrez les produits tendances et incontournables du moment.
          </p>
        </div>

        {/* Galerie de produits - Layout spécial avec première carte plus grande */}
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          {/* Première carte (plus grande) */}
          {favoriteProducts.length > 0 && (
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="relative rounded-xl overflow-hidden h-[500px] md:h-[600px]">
                <Image
                  src={favoriteProducts[0].images?.[0]?.url || "/placeholder.jpg"}
                  alt={favoriteProducts[0].title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay avec nom du produit */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-20 pb-6 px-6">
                  <h3 className="text-white text-2xl font-semibold">
                    {favoriteProducts[0].title}
                  </h3>
                </div>

                {/* Bouton d'action */}
                <div className="absolute bottom-6 right-6">
                  <Link href={`/products/${favoriteProducts[0].handle}`}>
                    <button className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                      <Image
                        src="/shopping-cart 2.svg"
                        alt="Ajouter au panier"
                        width={24}
                        height={24}
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Autres cartes (plus petites, en grille) */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 h-full">
              {favoriteProducts.slice(1, 4).map((product) => (
                <div
                  key={product.id}
                  className="relative rounded-xl overflow-hidden h-[300px] md:h-[290px]"
                >
                  {/* Image du produit */}
                  <Image
                    src={product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay avec nom du produit */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent pt-12 pb-4 px-4">
                    <h3 className="text-white text-xl font-semibold">
                      {product.title}
                    </h3>
                  </div>

                  {/* Boutons d'action */}
                  <div className="absolute bottom-4 right-4">
                    <Link href={`/products/${product.handle}`}>
                      <button className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
                        <Image
                          src="/shopping-cart 2.svg"
                          alt="Ajouter au panier"
                          width={24}
                          height={24}
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentFavorite;
