"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  thumbnail?: string;
}

interface CartContextType {
  cartId: string | null;
  cart: any;
  items: CartItem[];
  itemsCount: number;
  isLoading: boolean;
  refetchCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  cart: null,
  items: [],
  itemsCount: 0,
  isLoading: false,
  refetchCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const storedCartId = localStorage.getItem("cart_id");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  const {
    data: cart,
    refetch: refetchCart,
    isLoading,
  } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (!cartId) return null;

      const response = await fetch(
        `https://vikytest-production.up.railway.app/store/carts/${cartId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          // Si le panier n'existe pas, on le supprime du localStorage
          localStorage.removeItem("cart_id");
          setCartId(null);
          return null;
        }
        throw new Error("Erreur lors de la récupération du panier");
      }

      const data = await response.json();
      return data.cart;
    },
    enabled: !!cartId,
  });

  const items = cart?.items || [];
  const itemsCount = items.length;

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart_id") {
        setCartId(e.newValue);
        refetchCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [refetchCart]);

  return (
    <CartContext.Provider
      value={{
        cartId,
        cart,
        items,
        itemsCount,
        isLoading,
        refetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
