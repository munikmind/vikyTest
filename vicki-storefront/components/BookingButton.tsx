"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingButtonProps {
  productName: string;
  price: number;
}

export default function BookingButton({
  productName,
  price,
}: BookingButtonProps) {
  const router = useRouter();

  const handleBooking = () => {
    router.push(
      `/booking?service=${encodeURIComponent(productName)}&price=${price}`
    );
  };

  return (
    <Button
      onClick={handleBooking}
      className="w-full bg-pink-600 hover:bg-pink-700 text-white"
    >
      <div className="flex items-center gap-2">
        <ShoppingBag className="w-4 h-4" />
        <span>Reserver votre coiffure</span>
      </div>
    </Button>
  );
}
