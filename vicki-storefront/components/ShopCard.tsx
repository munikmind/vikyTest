"use client";
// import { sdk } from "@/lib/config";
// import { useQuery } from "@tanstack/react-query";
import { animate, inView } from "motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ShopCardProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ShopCard = ({ isOpen, onClose }: ShopCardProps) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

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

  // Animation d'entrée et de sortie du panneau
  useEffect(() => {
    if (!cardRef.current) return;

    if (isOpen) {
      // Animation d'entrée
      animate(
        cardRef.current,
        { transform: "translateX(0%)" },
        { duration: 0.4, easing: [0.22, 1, 0.36, 1] }
      );

      // Animer l'opacité du contenu
      const elements = cardRef.current.querySelectorAll(".animate-content");
      elements.forEach((el) => {
        animate(
          el,
          { opacity: 1, transform: "translateY(0px)" },
          { delay: 0.05 * Array.from(elements).indexOf(el), duration: 0.3 }
        );
      });
    } else if (cardRef.current) {
      // Animation de sortie
      animate(
        cardRef.current,
        { transform: "translateX(100%)" },
        { duration: 0.3 }
      );
    }
  }, [isOpen]);

  // Animation des éléments du panier lorsqu'ils sont visibles
  useEffect(() => {
    if (!itemsContainerRef.current || cartItems.length === 0) return;

    const items = itemsContainerRef.current.querySelectorAll(".cart-item");
    items.forEach((item, index) => {
      inView(item, () => {
        animate(
          item,
          { opacity: 1, transform: "translateY(0px)" },
          { delay: 0.08 * index, duration: 0.4 }
        );
      });
    });
  }, [cartItems]);

  // Données de test pour la démo
  useEffect(() => {
    if (isOpen) {
      // Simuler le chargement des données
      setTimeout(() => {
        setCartItems([
          {
            id: "1",
            title: "Belle chemise",
            thumbnail: "/modeleVetement4.jpg",
            unit_price: 10000,
            quantity: 1,
          },
          {
            id: "2",
            title: "Robe élégante",
            thumbnail: "/modeleVetement4.jpg",
            unit_price: 15000,
            quantity: 2,
          },
        ]);
        setTotal(40000);
        setIsLoading(false);
      }, 800);
    }
  }, [isOpen]);

  // Gérer l'animation de fermeture
  const handleClose = () => {
    if (!cardRef.current) {
      onClose();
      return;
    }

    animate(
      cardRef.current,
      { transform: "translateX(100%)" },
      {
        duration: 0.3,
        onComplete: () => onClose(),
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={cardRef}
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-lg z-50 overflow-hidden"
        style={{ transform: "translateX(100%)" }} // Position initiale hors écran
      >
        <div className="flex flex-col h-full">
          {/* En-tête du panier */}
          <div className="flex justify-between items-center p-4 border-b animate-content">
            <div className="flex items-center">
              <Image
                src="/shopping-bag-2.svg"
                alt="Panier"
                width={24}
                height={24}
              />
              <span className="ml-2 font-medium">{cartItems.length}</span>
            </div>
            <button onClick={handleClose} className="p-2 animate-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Message d'ajout au panier */}
          <div className="bg-[#D12E87] text-white p-4 text-center animate-content">
            <p>Ajoutez à votre panier et faites-vous plaisir en un clic !</p>
          </div>

          {/* Contenu du panier */}
          <div className="flex-grow overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-32 animate-content">
                <p>Chargement du panier...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex justify-center items-center h-32 animate-content">
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <div ref={itemsContainerRef} className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b pb-4 cart-item"
                    style={{ opacity: 0 }}
                  >
                    {/* Image du produit */}
                    <div className="relative w-24 h-24 bg-gray-100 rounded">
                      {item.thumbnail && (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      )}
                    </div>

                    {/* Informations du produit */}
                    <div className="flex-grow ml-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.title}</h3>
                        <button className="text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>

                      {/* Prix et quantité */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-gray-700">
                          {item.unit_price?.toLocaleString()} FCFA
                        </div>
                        <div className="flex items-center border rounded">
                          <button className="px-2 py-1 text-gray-500">−</button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button className="px-2 py-1 text-gray-500">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pied de page avec total et boutons */}
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center animate-content">
              <span className="font-medium">Total :</span>
              <span className="font-bold">{total.toLocaleString()} FCFA</span>
            </div>

            <button className="w-full bg-white border border-black text-black py-3 rounded-full font-medium hover:bg-gray-100 transition-colors animate-content">
              Procéder au paiement
            </button>

            <button
              className="w-full bg-[#D12E87] text-white py-3 rounded-full font-medium hover:bg-[#B0246F] transition-colors animate-content"
              onClick={handleClose}
            >
              Continuer vos achats
            </button>

            {/* Méthodes de paiement */}
            <div className="flex justify-center space-x-4 mt-4 animate-content">
              <Image
                src="/payment/icons8-visa.svg"
                alt="Visa"
                width={40}
                height={25}
              />
              <Image
                src="/payment/icons8-mastercard.svg"
                alt="Mastercard"
                width={40}
                height={25}
              />
              <Image
                src="/payment/WAVE-removebg-preview.png"
                alt="Wave"
                width={40}
                height={25}
              />
              <Image
                src="/payment/OM-removebg-preview.png"
                alt="Orange Money"
                width={40}
                height={25}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
