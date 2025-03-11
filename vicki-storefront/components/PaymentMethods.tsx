"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useState } from "react";

interface PaymentMethodsProps {
  onSelect: (method: string) => void;
}

const PaymentMethods = ({ onSelect }: PaymentMethodsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("cash");

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    onSelect(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Méthode de paiement</h3>
      <RadioGroup
        defaultValue="cash"
        onValueChange={handleMethodChange}
        className="space-y-4"
      >
        <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="flex items-center gap-3">
            <span className="text-xl">💵</span>
            Paiement à la livraison
          </Label>
        </div>

        <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
          <RadioGroupItem value="wave" id="wave" />
          <Label htmlFor="wave" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/payment/WAVE-removebg-preview.png"
                alt="Wave"
                fill
                className="object-contain"
              />
            </div>
            Wave
          </Label>
        </div>

        <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
          <RadioGroupItem value="orange" id="orange" />
          <Label htmlFor="orange" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/payment/OM-removebg-preview.png"
                alt="Orange Money"
                fill
                className="object-contain"
              />
            </div>
            Orange Money
          </Label>
        </div>
      </RadioGroup>

      {selectedMethod === "wave" && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Pour payer avec Wave :
            <br />
            1. Envoyez le montant à ce numéro : <strong>77 123 45 67</strong>
            <br />
            2. Notez votre code de transaction
            <br />
            3. Nous vous contacterons pour confirmer le paiement
          </p>
        </div>
      )}

      {selectedMethod === "orange" && (
        <div className="mt-4 p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-800">
            Pour payer avec Orange Money :
            <br />
            1. Envoyez le montant à ce numéro : <strong>77 123 45 67</strong>
            <br />
            2. Notez votre code de transaction
            <br />
            3. Nous vous contacterons pour confirmer le paiement
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
