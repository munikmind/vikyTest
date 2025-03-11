"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface AddToCartProps {
  product: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
  };
  onAddToCart?: () => void;
}

const AddToCart = ({ product, onAddToCart }: AddToCartProps) => {
  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: async () => {
      // Récupérer le panier existant du localStorage
      const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");

      // Vérifier si le produit existe déjà
      const existingItemIndex = cartItems.findIndex(
        (item: any) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        // Incrémenter la quantité si le produit existe
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Ajouter le nouveau produit avec quantité 1
        cartItems.push({
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          unit_price: product.price,
          quantity: 1,
        });
      }

      // Sauvegarder dans le localStorage
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
      // Dispatch custom event
      window.dispatchEvent(new Event("cartUpdated"));

      return cartItems;
    },
    onSuccess: () => {
      toast.success("Le produit a été ajouté à votre panier");
      // Ouvrir le panier après l'ajout
      if (onAddToCart) {
        onAddToCart();
      }
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'ajout au panier");
    },
  });

  return (
    <Button
      onClick={() => addToCart()}
      disabled={isPending}
      className="w-full bg-pink-600 hover:bg-pink-700 text-white"
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Ajout en cours...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          <span>Ajouter au panier</span>
        </div>
      )}
    </Button>
  );
};

export default AddToCart;
