"use client";

import AboutUs from "@/components/AboutUs";
import CategoriesSection from "@/components/CategoriesSection";
import CurrentFavorite from "@/components/CurrentFavorite";
import HeroSection from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import ShopCard from "@/components/ShopCard";
import { useState } from "react";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="px-4 md:px-8 lg:px-36">
      <div className="h-[10px]"></div>
      <HeroSection />
      <div className="h-[100px]"></div>
      <CategoriesSection />
      <div className="h-[150px]"></div>
      <AboutUs />
      <div className="h-[200px]"></div>
      <CurrentFavorite />
    </div>
  );
}
