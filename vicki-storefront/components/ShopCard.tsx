"use client";
// import { sdk } from "@/lib/config";
// import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  title: string;
  thumbnail: string;
  unit_price: number;
  quantity: number;
}

interface ShopCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopCard = ({ isOpen, onClose }: ShopCardProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Récupération du panier
  // const { data, isLoading: isCartLoading } = useQuery({
  //   queryFn: () => sdk.store.cart.retrieve(),
  //   queryKey: ["cart"],
  //   enabled: isOpen,
  // });

  // useEffect(() => {
  //   if (data?.cart) {
  //     setCartItems(data.cart.items || []);
  //     setTotal(data.cart.total || 0);
  //     setIsLoading(false);
  //   }
  // }, [data]);

  useEffect(() => {
    if (isOpen) {
      // Charger les données du localStorage
      const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");
      setCartItems(cartItems);
      calculateTotal(cartItems);
    }
  }, [isOpen]);

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateQuantity = (itemId: string, change: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedItems);
    localStorage.setItem("cart_items", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
    calculateTotal(updatedItems);
    toast.success("Quantité mise à jour");
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem("cart_items", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
    calculateTotal(updatedItems);
    toast.success("Produit supprimé du panier");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-2xl font-semibold">Votre Panier</h2>
            <div className="ml-2 bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm">
              {cartItems.length} articles
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow gap-4 text-gray-500">
              <ShoppingBag className="w-12 h-12" />
              <p>Votre panier est vide</p>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
                  >
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">
                        {item.unit_price.toLocaleString()} FCFA
                      </p>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4 border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{totalPrice.toLocaleString()} FCFA</span>
                </div>

                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  Passer la commande
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShopCard;
