"use client";

import PaymentMethods from "@/components/PaymentMethods";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Check, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type CheckoutStep = "email" | "address" | "shipping" | "payment" | "complete";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: string;
  paymentMethod: string;
  transactionId?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemsCount, isLoading, cartId } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentCollection, setPaymentCollection] = useState<any>(null);
  const [paymentSession, setPaymentSession] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "sn",
      shippingMethod: "standard",
      paymentMethod: "card",
    },
  });

  useEffect(() => {
    if (!cartId || itemsCount === 0) {
      router.push("/cart");
    }

    // Vérifier si le panier est déjà complété
    const checkCartStatus = async () => {
      try {
        const storedCartId = localStorage.getItem("cart_id");
        if (!storedCartId) return;

        const response = await fetch(
          `https://vikytest-production.up.railway.app/store/carts/${storedCartId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-publishable-api-key":
                "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
            },
          }
        );

        if (!response.ok) {
          // Si le panier n'existe pas ou est inaccessible, créer un nouveau panier
          await createNewCart();
          return;
        }

        const cartData = await response.json();

        // Si le panier est déjà complété, créer un nouveau panier
        if (cartData.cart?.completed_at) {
          console.log("Panier déjà complété, création d'un nouveau panier...");
          await createNewCart();
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du panier:", error);
      }
    };

    checkCartStatus();
  }, [cartId, itemsCount, router]);

  // Fonction pour créer un nouveau panier
  const createNewCart = async () => {
    try {
      console.log("Création d'un nouveau panier...");
      const newCartResponse = await fetch(
        "https://vikytest-production.up.railway.app/store/carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
          },
        }
      );

      if (newCartResponse.ok) {
        const { cart: newCart } = await newCartResponse.json();
        console.log("Nouveau panier créé:", newCart);

        // Mettre à jour le localStorage avec le nouveau panier
        localStorage.removeItem("cart_id");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("transactionId");

        // Définir le nouveau cartId
        localStorage.setItem("cart_id", newCart.id);

        // Recharger la page pour réinitialiser le contexte
        window.location.reload();
      } else {
        console.error("Erreur lors de la création du nouveau panier");
      }
    } catch (error) {
      console.error("Erreur lors de la création du nouveau panier:", error);
    }
  };

  const calculateTotal = () => {
    return items?.reduce((total, item) => {
      return total + (item.unit_price * item.quantity) / 100;
    }, 0);
  };

  const initializePaymentCollection = async (cartId: string) => {
    try {
      // Récupérer les informations du panier
      console.log("Récupération des informations du panier...");
      const cartResponse = await fetch(
        `https://vikytest-production.up.railway.app/store/carts/${cartId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
          },
        }
      );

      if (!cartResponse.ok) {
        throw new Error(
          `Erreur lors de la récupération du panier: ${cartResponse.status}`
        );
      }

      const cart = await cartResponse.json();
      console.log("Informations du panier récupérées:", cart);

      // Mettre à jour les métadonnées du panier avec les informations de paiement
      console.log(
        "Mise à jour des métadonnées du panier avec les informations de paiement..."
      );
      const paymentMethod = localStorage.getItem("paymentMethod") || "manual";
      const transactionId = localStorage.getItem("transactionId") || "";

      const updateCartResponse = await fetch(
        `https://vikytest-production.up.railway.app/store/carts/${cartId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
          },
          body: JSON.stringify({
            metadata: {
              payment_method: paymentMethod,
              transaction_id: transactionId,
              payment_status: "pending",
            },
          }),
        }
      );

      if (!updateCartResponse.ok) {
        const errorData = await updateCartResponse.json();
        console.error(
          "Erreur détaillée lors de la mise à jour des métadonnées:",
          errorData
        );
        throw new Error(
          `Erreur lors de la mise à jour des métadonnées du panier: ${updateCartResponse.status}`
        );
      }

      const updatedCart = await updateCartResponse.json();
      console.log("Métadonnées du panier mises à jour:", updatedCart);

      return updatedCart;
    } catch (error) {
      console.error(
        "Erreur lors de l'initialisation de la collection de paiement:",
        error
      );
      throw error;
    }
  };

  const completeCart = async () => {
    try {
      const cartId = localStorage.getItem("cart_id");
      if (!cartId) {
        toast.error("Aucun panier trouvé");
        return;
      }

      // Finaliser le panier
      console.log("Finalisation du panier...");
      const response = await fetch(
        `https://vikytest-production.up.railway.app/store/carts/${cartId}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
          },
        }
      );

      const data = await response.json();
      console.log("Réponse de la finalisation:", data);

      if (data.type === "cart" && data.cart) {
        // Une erreur s'est produite
        console.error("Erreur lors de la finalisation:", data.error);
        throw new Error(
          data.error?.message || "Impossible de finaliser la commande"
        );
      } else if (data.type === "order" && data.order) {
        // Commande réussie
        console.log("Commande placée avec succès:", data.order);
        setOrder(data.order);
        setCurrentStep("complete");

        // Créer un nouveau panier
        try {
          console.log("Création d'un nouveau panier...");
          const newCartResponse = await fetch(
            "https://vikytest-production.up.railway.app/store/carts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
              },
            }
          );

          if (newCartResponse.ok) {
            const { cart: newCart } = await newCartResponse.json();
            console.log("Nouveau panier créé:", newCart);

            // Mettre à jour le localStorage avec le nouveau panier
            localStorage.removeItem("cart_id");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("paymentMethod");
            localStorage.removeItem("transactionId");

            // Attendre un court instant pour s'assurer que le localStorage est nettoyé
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Définir le nouveau cartId
            localStorage.setItem("cart_id", newCart.id);

            // Forcer le rechargement de la page pour réinitialiser complètement le contexte
            window.location.href = "/";
          } else {
            console.error("Erreur lors de la création du nouveau panier");
          }
        } catch (error) {
          console.error("Erreur lors de la création du nouveau panier:", error);
        }

        toast.success("Commande finalisée avec succès !");
        return data.order;
      }
    } catch (error: any) {
      console.error("Erreur lors du processus de paiement:", error);
      toast.error(error.message || "Une erreur est survenue lors du paiement");
      throw error;
    }
  };

  const onSubmit = async (data: CheckoutForm) => {
    try {
      setIsSubmitting(true);

      if (currentStep === "email") {
        // Mettre à jour l'email du panier
        const cartId = localStorage.getItem("cart_id");
        if (cartId) {
          const response = await fetch(
            `https://vikytest-production.up.railway.app/store/carts/${cartId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
              },
              body: JSON.stringify({ email: data.email }),
            }
          );

          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de l'email");
          }
        }
        setCurrentStep("address");
      } else if (currentStep === "address") {
        // Mettre à jour l'adresse de livraison
        const cartId = localStorage.getItem("cart_id");
        if (cartId) {
          const response = await fetch(
            `https://vikytest-production.up.railway.app/store/carts/${cartId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
              },
              body: JSON.stringify({
                shipping_address: {
                  first_name: data.firstName,
                  last_name: data.lastName,
                  address_1: data.address,
                  city: data.city,
                  postal_code: data.postalCode,
                  country_code: data.country,
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour de l'adresse");
          }
        }
        setCurrentStep("shipping");
      } else if (currentStep === "shipping") {
        // Sélectionner la méthode de livraison
        const cartId = localStorage.getItem("cart_id");
        if (cartId) {
          console.log("Ajout de la méthode d'expédition...");
       
          // Récupérer d'abord les options d'expédition disponibles
          const optionsResponse = await fetch(
            `https://vikytest-production.up.railway.app/store/shipping-options?cart_id=${cartId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
              },
            }
          );

          if (!optionsResponse.ok) {
            const errorData = await optionsResponse.json();
            console.error(
              "Erreur lors de la récupération des options d'expédition:",
              errorData
            );
            throw new Error("Impossible de récupérer les options d'expédition");
          }

          const { shipping_options } = await optionsResponse.json();
          console.log("Options d'expédition disponibles:", shipping_options);

          // Sélectionner l'option appropriée en fonction du choix de l'utilisateur
          const selectedOption = shipping_options.find(
            (option: { name: string; id: string }) =>
              data.shippingMethod === "express"
                ? option.name.toLowerCase().includes("express")
                : option.name.toLowerCase().includes("standard")
          );

          if (!selectedOption) {
            throw new Error("Option d'expédition non trouvée");
          }

          console.log("Option d'expédition sélectionnée:", selectedOption);

          // Ajouter la méthode d'expédition au panier
          const shippingResponse = await fetch(
            `https://vikytest-production.up.railway.app/store/carts/${cartId}/shipping-methods`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
              },
              body: JSON.stringify({
                option_id: selectedOption.id,
              }),
            }
          );

          if (!shippingResponse.ok) {
            const errorData = await shippingResponse.json();
            console.error(
              "Erreur lors de l'ajout de la méthode d'expédition:",
              errorData
            );
            throw new Error(
              errorData.message ||
                "Erreur lors de la sélection de la méthode de livraison"
            );
          }

          const shippingData = await shippingResponse.json();
          console.log("Méthode d'expédition ajoutée:", shippingData);

          // Vérifier que la méthode d'expédition a bien été ajoutée
          const cartCheckResponse = await fetch(
            `https://vikytest-production.up.railway.app/store/carts/${cartId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
              },
            }
          );

          const cartCheckData = await cartCheckResponse.json();
          if (!cartCheckData.cart.shipping_methods?.length) {
            throw new Error(
              "La méthode d'expédition n'a pas été correctement ajoutée au panier"
            );
          }
        }
        setCurrentStep("payment");
      } else if (currentStep === "payment") {
        console.log("Début du processus de paiement...");

        try {
          // 1. Vérifier le cartId
          const storedCartId = localStorage.getItem("cart_d");
          if (!storedCartId && !cartId) {
            throw new Error("Aucun panier trouvé");
          }
          const currentCartId = storedCartId || cartId;
          console.log("CartId utilisé:", currentCartId);

          // 2. Récupérer les informations du panier
          console.log("Récupération des informations du panier...");
          const cartResponse = await fetch(
            `https://vikytest-production.up.railway.app/store/carts/${currentCartId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
              },
            }
          );

          if (!cartResponse.ok) {
            throw new Error(
              "Impossible de récupérer les informations du panier"
            );
          }

          const cartData = await cartResponse.json();
          console.log("Informations du panier récupérées:", cartData);

          // 3. Créer une collection de paiement si elle n'existe pas
          console.log("Création/vérification de la collection de paiement...");
          let paymentCollectionId = cartData.cart?.payment_collection?.id;

          if (!paymentCollectionId) {
            const paymentCollectionResponse = await fetch(
              "https://vikytest-production.up.railway.app/store/payment-collections",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-publishable-api-key":
                    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
                },
                body: JSON.stringify({
                  cart_id: currentCartId,
                }),
              }
            );

            if (!paymentCollectionResponse.ok) {
              const errorData = await paymentCollectionResponse.json();
              console.error("Erreur de création de la collection:", errorData);
              throw new Error("Impossible de créer la collection de paiement");
            }

            const { payment_collection } =
              await paymentCollectionResponse.json();
            paymentCollectionId = payment_collection.id;
          }

          // 4. Initialiser la session de paiement
          console.log("Initialisation de la session de paiement...");
          const initSessionResponse = await fetch(
            `https://vikytest-production.up.railway.app/store/payment-collections/${paymentCollectionId}/payment-sessions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
              },
              body: JSON.stringify({
                provider_id: "pp_system_default",
              }),
            }
          );

          if (!initSessionResponse.ok) {
            const errorData = await initSessionResponse
              .json()
              .catch(() => ({}));
            console.error("Erreur d'initialisation de la session:", errorData);
            throw new Error(
              errorData.message ||
                `Erreur d'initialisation de la session (${initSessionResponse.status})`
            );
          }

          const sessionData = await initSessionResponse.json();
          console.log("Session de paiement créée:", sessionData);

          // Autoriser la session de paiement
          console.log("Autorisation de la session de paiement...");
          const authorizeResponse = await fetch(
            `https://vikytest-production.up.railway.app/store/payment-collections/${paymentCollectionId}/sessions/batch/authorize`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
              },
              mode: "no-cors",
            }
          );

          // Comme nous utilisons no-cors, nous ne pouvons pas vérifier le statut de la réponse
          // Nous supposons que la requête a réussi si elle ne génère pas d'erreur
          console.log("Session de paiement autorisée");

          // 5. Finaliser la commande
          console.log("Finalisation de la commande...");
          const completeResponse = await fetch(
            `https://vikytest-production.up.railway.app/store/carts/${currentCartId}/complete`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-publishable-api-key":
                  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "temp",
              },
            }
          );

          const completeData = await completeResponse.json();
          console.log("Réponse de la finalisation:", completeData);

          if (completeData.type === "cart") {
            throw new Error(
              completeData.error?.message ||
                "Impossible de finaliser la commande"
            );
          }

          if (completeData.type === "order" && completeData.order) {
            console.log("Commande placée avec succès:", completeData.order);
            setOrder(completeData.order);
            setCurrentStep("complete");

            // Créer un nouveau panier
            try {
              console.log("Création d'un nouveau panier...");
              const newCartResponse = await fetch(
                "https://vikytest-production.up.railway.app/store/carts",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "x-publishable-api-key":
                      "pk_473000f8cbe0c01a9786d645f6dd877d21f5808740588f9c65131196ac5c84af",
                  },
                }
              );

              if (newCartResponse.ok) {
                const { cart: newCart } = await newCartResponse.json();
                console.log("Nouveau panier créé:", newCart);

                // Mettre à jour le localStorage avec le nouveau panier
                localStorage.removeItem("cart_id");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("paymentMethod");
                localStorage.removeItem("transactionId");

                // Attendre un court instant pour s'assurer que le localStorage est nettoyé
                await new Promise((resolve) => setTimeout(resolve, 100));

                // Définir le nouveau cartId
                localStorage.setItem("cart_id", newCart.id);

                // Forcer le rechargement de la page pour réinitialiser complètement le contexte
                window.location.href = "/";
              } else {
                console.error("Erreur lors de la création du nouveau panier");
              }
            } catch (error) {
              console.error(
                "Erreur lors de la création du nouveau panier:",
                error
              );
            }

            toast.success("Commande finalisée avec succès !");
          }
        } catch (error: any) {
          console.error("Erreur lors du processus de paiement:", error);
          toast.error(
            error.message || "Une erreur est survenue lors du paiement"
          );
          throw error;
        }
      }
    } catch (error: any) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (itemsCount === 0 && currentStep !== "complete") {
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

  if (currentStep === "complete" && order) {
    return (
      <div className="container mx-auto py-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Commande confirmée</h1>
        <p className="mb-2 text-gray-600">Merci pour votre commande!</p>
        <p className="mb-6 text-gray-600">Numéro de commande: {order.id}</p>
        <p className="mb-6 text-gray-600">
          Un email de confirmation a été envoyé à {watch("email")}
        </p>
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Finalisation de la commande</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex mb-4">
              {["email", "address", "shipping", "payment", "complete"].map(
                (step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep === step
                          ? "bg-pink-600 text-white"
                          : index <
                            [
                              "email",
                              "address",
                              "shipping",
                              "payment",
                              "complete",
                            ].indexOf(currentStep)
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {index <
                      [
                        "email",
                        "address",
                        "shipping",
                        "payment",
                        "complete",
                      ].indexOf(currentStep) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < 4 && (
                      <div
                        className={`h-1 w-10 ${
                          index <
                          ["email", "address", "shipping", "payment"].indexOf(
                            currentStep
                          )
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      ></div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === "email" && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4">
                  Informations de contact
                </h2>
                <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      L'email est requis
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Traitement en cours...</span>
                    </div>
                  ) : (
                    "Continuer"
                  )}
                </Button>
              </div>
            )}

            {currentStep === "address" && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4">Adresse de livraison</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      {...register("firstName", { required: true })}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        Le prénom est requis
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      {...register("lastName", { required: true })}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        Le nom est requis
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    {...register("address", { required: true })}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      L'adresse est requise
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      {...register("city", { required: true })}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        La ville est requise
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input
                      id="postalCode"
                      {...register("postalCode", { required: true })}
                      className={errors.postalCode ? "border-red-500" : ""}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        Le code postal est requis
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor="country">Pays</Label>
                  <select
                    id="country"
                    {...register("country", { required: true })}
                    className={`w-full p-2 border rounded-md ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="fr">France</option>
                    <option value="sn">Sénégal</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      Le pays est requis
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Traitement en cours...</span>
                    </div>
                  ) : (
                    "Continuer"
                  )}
                </Button>
              </div>
            )}

            {currentStep === "shipping" && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4">Méthode d'expédition</h2>
                <RadioGroup
                  defaultValue={watch("shippingMethod")}
                  className="mb-4"
                  onValueChange={(value) => {
                    // @ts-ignore
                    register("shippingMethod").onChange({ target: { value } });
                  }}
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md mb-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-grow">
                      <div className="font-medium">Livraison standard</div>
                      <div className="text-sm text-gray-500">
                        3-5 jours ouvrables
                      </div>
                    </Label>
                    <div className="font-medium">Gratuit</div>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-grow">
                      <div className="font-medium">Livraison express</div>
                      <div className="text-sm text-gray-500">
                        1-2 jours ouvrables
                      </div>
                    </Label>
                    <div className="font-medium">10,00 €</div>
                  </div>
                </RadioGroup>
                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Traitement en cours...</span>
                    </div>
                  ) : (
                    "Continuer"
                  )}
                </Button>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4">Méthode de paiement</h2>
                <PaymentMethods onSelect={setPaymentMethod} />

                <div className="border p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Dans un environnement de production, ici s'afficherait le
                    formulaire de paiement Stripe.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input id="expiry" placeholder="MM/AA" disabled />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" disabled />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Traitement en cours...</span>
                    </div>
                  ) : (
                    "Payer et finaliser la commande"
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

          <div className="space-y-4 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 relative">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                  <div className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {item.quantity}
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {(item.unit_price / 100).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4 pt-4 border-t">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{calculateTotal().toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span>
                {watch("shippingMethod") === "express" ? "10,00 €" : "Gratuit"}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>
                {(
                  calculateTotal() +
                  (watch("shippingMethod") === "express" ? 10 : 0)
                ).toFixed(2)}{" "}
                €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
