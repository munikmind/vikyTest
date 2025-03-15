import { HttpTypes } from "@medusajs/types";
import { sdk } from "./sdk";

export type ProductListParams = {
  limit?: number;
  offset?: number;
  q?: string;
  collection_id?: string[];
  category_id?: string[];
  expand?: string;
};

/**
 * Récupère la liste des produits avec pagination
 */
export async function getProducts(
  params?: ProductListParams,
  regionId?: string
) {
  try {
    const { products, count, offset, limit } = await sdk.store.product.list(
      {
        ...params,
        fields: `*variants.calculated_price, *categories`,
        region_id: regionId,
      },
      {
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
        },
      }
    );
    return { products, count, offset, limit };
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
}

/**
 * Récupère un produit par son ID
 */
export async function getProductById(
  productId: string
): Promise<HttpTypes.StoreProduct> {
  try {
    const { product } = await sdk.store.product.retrieve(productId, {
      fields: "*variants.calculated_price, *categories",
    });
    return product;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit ${productId}:`,
      error
    );
    throw error;
  }
}

/**
 * Recherche des produits avec des filtres spécifiques
 */
export async function searchProducts(
  query: string,
  limit: number = 10
): Promise<HttpTypes.StoreProduct[]> {
  try {
    const { products } = await sdk.store.product.list({
      q: query,
      limit,
    });
    return products;
  } catch (error) {
    console.error("Erreur lors de la recherche des produits:", error);
    throw error;
  }
}

/**
 * Récupère les produits d'une collection spécifique
 */
export async function getProductsByCollection(
  collectionId: string,
  limit: number = 10
): Promise<HttpTypes.StoreProduct[]> {
  try {
    const { products } = await sdk.store.product.list({
      collection_id: [collectionId],
      limit,
    });
    return products;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des produits de la collection ${collectionId}:`,
      error
    );
    throw error;
  }
}

/**
 * Récupère les produits d'une catégorie spécifique
 */
export async function getProductsByCategory(
  categoryId: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ products: HttpTypes.StoreProduct[]; count: number }> {
  try {
    const { products, count } = await sdk.store.product.list(
      {
        category_id: [categoryId],
        limit,
        offset,
        fields: `*variants.calculated_price, *categories`,
      },
      {
        headers: {
          "x-publishable-api-key":
            process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
        },
      }
    );
    return { products, count };
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des produits de la catégorie ${categoryId}:`,
      error
    );
    throw error;
  }
}

/**
 * Récupère un produit par son handle
 */
export async function getProductByHandle(
  handle: string
): Promise<HttpTypes.StoreProduct> {
  if (!handle) {
    throw new Error("Le handle du produit est requis");
  }

  try {
    const { products } = await sdk.store.product.list(
      {
        handle: handle,
        fields: "*variants.calculated_price, *categories",
        
      }
    );

    if (!products || products.length === 0) {
      throw new Error(`Produit non trouvé avec le handle: ${handle}`);
    }

    return products[0];
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du produit avec le handle ${handle}:`,
      error
    );
    throw error;
  }
}
