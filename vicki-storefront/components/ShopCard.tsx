"use client";
// import { sdk } from "@/lib/config";
// import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { deleteItem, updateItem } from "@/lib/cart";
import { HttpTypes } from "@medusajs/types";
import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ShopCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopCard = ({ isOpen, onClose }: ShopCardProps) => {
  const { items, itemsCount, isLoading, refetchCart, cartId } = useCart();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.unit_price * item.quantity);
    }, 0);
  };
  const getProductPrice = (product: HttpTypes.StoreProduct): number => {
    const variant = product.variants?.[0];
    return variant?.calculated_price?.calculated_amount || 0;
  };
  const updateQuantity = async (itemId: string, change: number) => {
    if (!cartId) return;

    setUpdatingItemId(itemId);
    try {
      const currentItem = items.find((item) => item.id === itemId);
      if (!currentItem) return;

      const newQuantity = Math.max(1, currentItem.quantity + change);

      const response = await updateItem(cartId, itemId, newQuantity);

      if (!response) {
        throw new Error("Erreur lors de la mise à jour de la quantité");
      }

      await refetchCart();
      toast.success("Quantité mise à jour");
    } catch (error: any) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la mise à jour de la quantité");
    } finally {
      setUpdatingItemId(null);
    }
  };

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

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-6 h-6" />
            <SheetTitle className="text-2xl font-semibold">Votre Panier</SheetTitle>
            <div className="ml-2 bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm">
              {itemsCount} articles
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center flex-grow gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
              <p>Chargement de votre panier...</p>
            </div>
          ) : itemsCount === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow gap-4 text-gray-500">
              <ShoppingBag className="w-12 h-12" />
              <p>Votre panier est vide</p>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
                  >
                    <div className="relative w-20 h-20">
                      {item.thumbnail && (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      )}
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product_title}</h3>
                      <p className="text-gray-600">{item.unit_price} FCFA</p>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100"
                            disabled={updatingItemId === item.id}
                          >
                            {updatingItemId === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Minus className="w-4 h-4" />
                            )}
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100"
                            disabled={updatingItemId === item.id}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                          disabled={removingItemId === item.id}
                        >
                          {removingItemId === item.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total :</span>
                  <span>{calculateTotal()} FCFA</span>
                </div>
                <div className="flex gap-6">
                  <Link href="/cart" onClick={onClose} className="w-1/2">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                      Voir le panier
                    </Button>
                  </Link>

                  <Link href="/checkout" onClick={onClose} className="w-1/2">
                    <Button className="w-full  bg-pink-600 hover:bg-pink-700 text-white">
                      Passer la commande
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShopCard;
