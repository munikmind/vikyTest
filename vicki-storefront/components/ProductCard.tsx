"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToCart from "./AddToCart";
import BookingButton from "./BookingButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

interface ProductCardProps {
  imageSrc: string;
  productName: string;
  price: number;
  handle: string;
  productId: string;
  variantId: string;
  categorie?: string;
  onOpenCart?: () => void;
}

export const ProductCard = ({
  imageSrc,
  productName,
  price,
  handle,
  productId,
  variantId,
  categorie,
  onOpenCart,
}: ProductCardProps) => {
  const [showAddToCart, setShowAddToCart] = useState(false);

  const product = {
    id: productId,
    variantId: variantId,
    title: productName,
    thumbnail: imageSrc,
    categorie: categorie,
    price: price,
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setShowAddToCart(true)}
      onMouseLeave={() => setShowAddToCart(false)}
    >
      {/* Image Container */}
      <Link href={`/products/${handle}`} className="w-[385px]">
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-[#F5F0F0]">
          <Image
            src={imageSrc}
            alt={productName}
            fill
            className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      {categorie === "coiffure" ? (
        <div
          className={`absolute bottom-20 left-0 right-0 px-4 transition-opacity duration-300 ${
            showAddToCart ? "opacity-100" : "opacity-0"
          }`}
        >
          <BookingButton productName={productName} price={price} />
        </div>
      ) : (
        <div
          className={`absolute bottom-20 left-0 right-0 px-4 transition-opacity duration-300 ${
            showAddToCart ? "opacity-100" : "opacity-0"
          }`}
        >
          <AddToCart product={product} onAddToCart={onOpenCart} />
        </div>
      )}
      {/* Product Info */}
      <div className="mt-4 space-y-1">
        <Link href={`/products/${handle}`}>
          <h3 className={`${poppins.className} text-lg font-medium text-black`}>
            {productName}
          </h3>
          <p className={`${poppins.className} text-base font-normal`}>
            {price} FCFA
          </p>
        </Link>
      </div>
    </div>
  );
};
