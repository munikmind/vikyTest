"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { deleteItem } from "@/lib/cart";
import { Loader2, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const { items, itemsCount, isLoading, refetchCart, cartId } = useCart();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const removeItem = async (itemId: string) => {
    if (!cartId) return;

    setRemovingItemId(itemId);
    try {
      const response = await deleteItem(cartId, itemId);

      if (!response) {
        throw new Error("Erreur lors de la suppression de l'article");
      }

      await refetchCart();
      toast.success("Produit supprimé du panier");
    } catch (error: any) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la suppression de l'article");
    } finally {
      setRemovingItemId(null);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.unit_price * item.quantity);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (itemsCount === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <p className="mb-6 text-gray-600">
          Ajoutez des articles à votre panier pour commencer vos achats.
        </p>
        <Link href="/">
          <Button>Continuer vos achats</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Votre Panier</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="flex border-b py-4">
              <div className="w-24 h-24 relative flex-shrink-0">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.product_title}
                    fill
                    className="object-cover rounded"
                  />
                )}
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{item.product_title}</h3>
                <p className="text-gray-600">Quantité: {item.quantity}</p>
                <p className="font-medium">
                  {item.unit_price } FCFA
                </p>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  disabled={removingItemId === item.id}
                >
                  {removingItemId === item.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{calculateTotal()} FCFA</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>{calculateTotal()} FCFA</span>
            </div>
          </div>

          <Link href="/checkout">
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              Passer à la caisse
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
