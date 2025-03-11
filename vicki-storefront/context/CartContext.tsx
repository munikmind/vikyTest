"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartId: string | null;
  items: any[];
  itemsCount: number;
  isLoading: boolean;
  refetchCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  items: [],
  itemsCount: 0,
  isLoading: false,
  refetchCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer l'ID du panier depuis le localStorage au chargement
    const storedCartId = localStorage.getItem("cart_id");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  const {
    data: cart,
    isLoading,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (!cartId) return null;

      const response = await fetch(`/store/carts/${cartId}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du panier");
      }
      return response.json();
    },
    enabled: !!cartId,
  });

  const value = {
    cartId,
    items: cart?.cart?.items || [],
    itemsCount: cart?.cart?.items?.length || 0,
    isLoading,
    refetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "useCart doit être utilisé à l'intérieur d'un CartProvider"
    );
  }
  return context;
};
