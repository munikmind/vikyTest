"use client";
import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, X, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ShopCard from "./ShopCard";

export default function Navbar() {
  const [isShopCardOpen, setIsShopCardOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemsCount } = useCart();
  const menuRef = useRef(null);

  const toggleShopCard = () => {
    setIsShopCardOpen(!isShopCardOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-transparent p-4 w-full px-4 md:px-8 lg:px-12 xl:px-36">
      {/* Mobile Header */}
      <div className="flex items-center justify-between w-full md:hidden">
        <button onClick={toggleMobileMenu} className="flex items-center gap-2">
          <Image
            src="/align-justify-editor.svg"
            alt="Menu"
            width={28}
            height={28}
            className="size-7"
          />
          <span>Menu</span>
        </button>

        <Link href="/" className="text-pink-600 text-xl font-semibold">
          VikiCollection
        </Link>

        <Link href="/cart" className="relative flex items-center">
          <ShoppingBag className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 bg-[#D12E87] rounded-full size-5 flex items-center justify-center">
            <p className="text-white font-bold text-xs">{itemsCount}</p>
          </div>
        </Link>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="text-pink-600 text-2xl font-semibold">
          VikiCollection
        </Link>

        {/* Search Bar */}
        <div className="relative w-64 lg:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Recherchez un produit ou un service..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none"
          />
        </div>
      </div>

      {/* Desktop Menu and Profile */}
      <div className="hidden md:flex items-center justify-end w-full gap-10 lg:w-2/3 mt-4 md:mt-0">
        {/* Menu Button */}
        <div className="flex items-center mr-4">
          <button onClick={toggleMobileMenu} className="relative flex items-center gap-2">
            <Image
              src="/align-justify-editor.svg"
              alt="Profile"
              width={28}
              height={28}
              className="size-7 rounded-full"
            />
            <p>Menu</p>
          </button>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <div className="bg-[#D12E87] rounded-full size-5 flex items-center justify-center">
              <p className="text-white font-bold text-xs">{itemsCount}</p>
            </div>
          </Link>

          {/* Separator */}
          <div className="h-10 bg-gray-200 w-[2px] rounded-xl"></div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 w-10 h-10 rounded-full"></div>
            <div className="hidden lg:block">
              <p className="font-bold">Bienvenue, </p>
              <p className="text-sm">Nom</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search - Below Header */}
      <div className="w-full mt-4 md:hidden">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Recherchez un produit ou un service..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobileMenu}>
          <div
            ref={menuRef}
            className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={toggleMobileMenu}>
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="block py-2 hover:text-pink-600">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="block py-2 hover:text-pink-600">
                    Catégories
                  </Link>
                </li>
                <li>
                  <Link href="/nouveautes" className="block py-2 hover:text-pink-600">
                    Nouveautés
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="block py-2 hover:text-pink-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Info (Mobile) */}
            <div className="absolute bottom-0 w-full border-t p-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 w-10 h-10 rounded-full"></div>
                <div>
                  <p className="font-bold">Cherif</p>
                  <Link href="/logout" className="text-sm text-gray-500">
                    Déconnexion
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ShopCard isOpen={isShopCardOpen} onClose={() => setIsShopCardOpen(false)} />
    </nav>
  );
}