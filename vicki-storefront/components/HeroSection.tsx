"use client"
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const HeroSection = () => {
  const [pictures, setPictures] = useState(["/picture1.jpeg","/sistaLocks2.jpeg"])
  return (
    <div className='flex'>
      {/* Hero section carousel part */}
      <div className='w-fit h-[700px] '>
        <Carousel className="w-[600px] h-full ">
          <CarouselContent className='w-full h-[700px]'>
            {pictures.map((picture, index) => (
              <CarouselItem key={index} className='w-full h-full'>
                <div className="relative h-full w-full">
                  <Card className='h-full w-full bg-black rounded-xl relative'>
                      <Image
                        src={picture}
                        alt={`Picture ${index + 1}`}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full rounded-xl opacity-70"
                        />
                    <CardContent className="absolute
                       bottom-8 left-0 right-0  text-white w-[400px] flex flex-col gap-8">
                      <p className='text-left text-2xl text-white font-semibold'>Vêtements sur mesure pour un style unique et élégant.</p>

                      <div className='flex items-center gap-2'>
                        <p className='text-left text-sm text-white font-semibold'>Découvrire la collection.</p>
                        <Link href="/products" className='relative size-6 rounded-full bg-white'>
                          <Image
                            src="/arrow-top-right.svg"
                            alt="Profile"
                            width={15}
                            height={15}
                            className="object-cover w-full h-full rounded-full p-1"
                            />
                        </Link>
                      </div>
                      </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="relative left-5 -top-80"/>
          <CarouselNext className="relative -right-[500px] -top-80"/>
        </Carousel>
      </div>

      {/* Hero section content part */}
      <div className='relative w-full bg-grey-200 h-[700px] border-2 rounded-xl'>
        <Image
          src="/bgGrey.jpg"
          alt="Hero Image"
          width={500}
          height={500}
          className="object-cover w-full h-full rounded-xl"
        />

        <div className='w-full absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start gap-16 px-8'>
          {/* Text section */}
          <p className={`${poppins.className} text-3xl text-black font-medium w-[700px] tracking-wide
 leading-snug`}>VikiCollection : Votre destination beauté et mode. Coiffures professionnelles, vêtements sur mesure, et produits capillaires haut de gamme pour sublimer votre style.</p>

          {/* Button section */}
          <div className='flex items-center gap-32'>
            <p className='text-black w-80 font-semibold'>
              Découvrez notre univers et explorez toutes nos catégories.
            </p>

            <Link href="/products" >
              <button className='size-28 bg-white rounded-full border'>
                Découvrire
              </button>
            </Link>
          </div>

          {/* products section */}
          <div className="flex flex-wrap justify-center gap-4">
            <ProductCard
              imageSrc="/picture1.jpeg"
              productName="Belle Chemise dame"
              price={5000}
            />

            <ProductCard
              imageSrc="/picture1.jpeg"
              productName="Belle Chemise dame"
              price={5000}
            />

            <ProductCard
              imageSrc="/picture1.jpeg"
              productName="Belle Chemise dame"
              price={5000}
            />

            {/* Add more ProductCard components as needed */}
          </div>
        </div>
      </div>
   </div>
  );
};
export default HeroSection;