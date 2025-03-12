"use client";

import { addItemToCart, createCart, getCartById } from "@/lib/cart";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  thumbnail?: string;
  product_title: string;
}

interface CartContextType {
  cartId: string | null;
  cart: any;
  items: CartItem[];
  itemsCount: number;
  isLoading: boolean;
  refetchCart: () => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  cart: null,
  items: [],
  itemsCount: 0,
  isLoading: false,
  refetchCart: () => {},
  addItem: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any>([])
  const [itemsCount, setitemsCount] = useState<any>(0)
  useEffect(() => {
    const storedCartId = localStorage.getItem("cart_id");
    if (storedCartId) {
      setCartId(storedCartId);
      fetchCart(storedCartId);
    }
  }, []);

  const fetchCart = async (id: string) => {
    setIsLoading(true);
    try {
      const cartData = await getCartById(id);
      setCart(cartData);
      setItems(cartData.cart.items)
        setitemsCount(cartData.cart.items?.length || 0);
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Erreur lors de la récupération du panier:", errorMessage);
      if (errorMessage.includes("404")) {
        localStorage.removeItem("cart_id");
        setCartId(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refetchCart = () => {
    if (cartId) {
      fetchCart(cartId);
    }
  };

  const addItem = async (variantId: string, quantity: number) => {
    if (cartId) {
      try {
        const updatedCart = await addItemToCart(cartId, variantId, quantity);
        setCart(updatedCart);
        setItems(updatedCart.cart.items)
        setitemsCount(updatedCart.cart.items?.length || 0);
        console.log('adding item to cart by the cart context ', updatedCart.cart.items);
      } catch (error) {
        console.error("Erreur lors de l'ajout du produit au panier:", error);
      }
      refetchCart();
    } else {
      console.log('adding item to cart by the cart context fail creating cart and add item again')
      const newCart = await createCart();
      setCartId(newCart.cart.id);
      localStorage.setItem("cart_id", newCart.cart.id);
      const newCartData = await addItemToCart(newCart.cart.id, variantId, quantity)
      setCart(newCartData)
      setItems(newCartData.cart.items)
      setitemsCount(newCartData.cart.items?.length || 0);
      refetchCart();
    }
  };

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
        addItem,
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
