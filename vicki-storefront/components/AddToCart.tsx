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
  };
  onAddToCart?: () => void;
}

const AddToCart = ({ product, onAddToCart }: AddToCartProps) => {
  const { cartId, refetchCart } = useCart();

  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: async () => {
      // Si nous n'avons pas de cartId, créer un nouveau panier
      if (!cartId) {
        const createCartResponse = await fetch(
          "https://vikytest-production.up.railway.app/store/carts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-publishable-api-key":
                "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
            },
            body: JSON.stringify({
              region_id: "reg_01JHRQBVWA2VFNDB67M609BJQP",
            }),
          }
        );

        if (!createCartResponse.ok) {
          const errorData = await createCartResponse.json();
          console.error("Erreur détaillée:", errorData);
          throw new Error("Erreur lors de la création du panier");
        }

        const { cart } = await createCartResponse.json();

        // Ajouter l'article au nouveau panier
        const addItemResponse = await fetch(
          `https://vikytest-production.up.railway.app/store/carts/${cart.id}/line-items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-publishable-api-key":
                "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
            },
            body: JSON.stringify({
              variant_id: product.variantId || product.id,
              quantity: 1,
            }),
          }
        );

        if (!addItemResponse.ok) {
          const errorData = await addItemResponse.json();
          console.error("Erreur détaillée lors de l'ajout:", errorData);
          throw new Error("Erreur lors de l'ajout au panier");
        }

        const updatedCart = await addItemResponse.json();
        const newCartId = cart.id;
        console.log("Nouveau panier créé avec ID:", newCartId);
        localStorage.setItem("cart_id", newCartId);
        // Forcer le rafraîchissement du contexte
        refetchCart();
        return updatedCart;
      }

      console.log("Utilisation du panier existant:", cartId);
      // Si nous avons un cartId, ajouter l'article au panier existant
      const response = await fetch(
        `https://vikytest-production.up.railway.app/store/carts/${cartId}/line-items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
          },
          body: JSON.stringify({
            variant_id: product.variantId || product.id,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur détaillée lors de l'ajout:", errorData);
        throw new Error("Erreur lors de l'ajout au panier");
      }

      const { cart } = await response.json();
      return cart;
    },
    onSuccess: (data) => {
      console.log("Panier mis à jour avec succès:", data);
      refetchCart();
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
          <span>Ajouter au panier</span>
        </div>
      )}
    </Button>
  );
};

export default AddToCart;
