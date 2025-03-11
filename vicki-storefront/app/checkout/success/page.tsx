"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <div className="text-center space-y-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold">Commande confirmée !</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Merci pour votre commande. Nous vous contacterons bientôt pour
          confirmer les détails de la livraison.
          {/* Instructions spécifiques selon le mode de paiement peuvent être ajoutées ici */}
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
