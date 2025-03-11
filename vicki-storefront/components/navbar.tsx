'use client'
import { Search, CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShopCard from "./ShopCard";
import { useState } from "react";

export default function Navbar() {
  const [isShopCardOpen, setIsShopCardOpen] = useState(false);

  const toggleShopCard = () => {
    setIsShopCardOpen(!isShopCardOpen);
  };
  return (
    <nav className="flex items-center justify-around bg-transparent p-4 w-full gap-32 px-4 md:px-8 lg:px-36">

      {/* Logo & Search */}
      <div className='flex items-center justify-between w-full'>
      {/* Logo */}
        <Link href="/" className="text-pink-600 text-2xl font-semibold">VikiCollection</Link>

        {/* Barre de recherche */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Recherchez un produit ou un service..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none"
          />
        </div>

      </div>


      {/* Menu and Profile */}
      <div className='flex items-center w-2/3 justify-between'>
      {/* Menu */}
      <div className='flex items-center '>
        <button className='relative flex items-center gap-2'>
        <Image
            src="/align-justify-editor.svg"
          alt="Profile"
          width={50}
          height={50}
          className="size-7 rounded-full"
          />
          <p>Menu</p>
        </button>
        </div>

        {/* Cart */}
        <div className='flex items-center gap-4'>

          {/* Shop Button */}
          <button className='relative flex items-center gap-2' onClick={toggleShopCard}>
          <Image
                src="/shopping-bag-2.svg"
            alt="Profile"
            width={50}
            height={50}
            className="size-7 rounded-full"
            />
              <div className='bg-[#D12E87] rounded-full size-6 flex items-center justify-center'>
                <p className='text-white font-bold text-sm text-center'>5</p>
              </div>
          </button>

          {/* Seperator */}
          <div className='h-12 bg-gray-200 w-[2px] rounded-xl'></div>


          {/* Profile */}
          <div className='flex items-center gap-3'>
            <div className='bg-gray-200 w-12 h-12 rounded-full'></div>

            <div>
              <p className='font-bold'>Bienvenue, </p>
              <p className='text-sm'>Cherif</p>
            </div>
          </div>
        </div>

      </div>





      <ShopCard isOpen={isShopCardOpen} onClose={() => setIsShopCardOpen(false)} />
    </nav>
  );
}
