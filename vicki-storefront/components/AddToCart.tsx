"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useMutation } from "@tanstack/react-query";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface AddToCartProps {
  product: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    variantId?: string;
    categorie?: string;
  };
  onAddToCart?: () => void;
}

const AddToCart = ({ product, onAddToCart }: AddToCartProps) => {
  const { cartId, refetchCart, addItem, cart } = useCart();

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: async () => {
      console.log('product', product)
      // console.log("Utilisation du panier existant:", cartId);
      // Si nous avons un cartId, ajouter l'article au panier existant
      await addItem(product.variantId || product.id, 1);

      // console.log('cart provided by cart context', cart);
      return cart;
    },
    onSuccess: (data) => {
      console.log("Panier mis à jour avec succès:", data);
      // refetchCart();
      toast.success("Le produit a été ajouté à votre panier");
      if (onAddToCart) {
        onAddToCart();
      }
    },
    onError: (error) => {
      console.error("Erreur détaillée:", error);
      // Si l'erreur est 404, on supprime le cartId invalide
      if (error.message?.includes("404")) {
        console.log("Suppression du cartId invalide");
        localStorage.removeItem("cart_id");
        refetchCart();
      }
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
          { product.categorie === "coiffure" ? (
            <span>Reserver votre coiffure</span>
          ) : (
            <span>Ajouter au panier</span>
          )
          }
        </div>
      )}
    </Button>
  );
};

export default AddToCart;
