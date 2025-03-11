"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const HeroSection = () => {
  return (
    <div className="w-full px-4 py-8">
      {/* Main content grid */}
      <div className="grid grid-cols-12 gap-4 h-[750px]">
        {/* Left main card */}
        <div className="col-span-7 relative rounded-xl overflow-hidden">
          <Image
            src="/modeleVetement4.jpg"
            alt="Collection principale"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-2xl font-medium mb-4">
              Vêtements sur mesure pour un style unique et élégant.
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Découvrire la collection
              </span>
              <Link href="/categories/habillement" className="bg-white rounded-full p-2">
                <Image
                  src="/arrow-top-right.svg"
                  alt="Voir plus"
                  width={16}
                  height={16}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Right cards stack */}
        <div className="col-span-5 grid grid-rows-2 gap-6">
          
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/sistaLocks2.jpeg"
                alt="Coiffure professionnelle"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-xl font-medium mb-4">
                  Coiffures professionnelles sur mesure pour sublimer votre
                  beauté naturelle.
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Découvrez nos coiffures sur mesure.
                  </span>
                  <Link
                    href="/hairstyles"
                    className="bg-white rounded-full p-2"
                  >
                    <Image
                      src="/arrow-top-right.svg"
                      alt="Voir plus"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/perruque.jpeg"
                alt="Coiffure professionnelle"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-xl font-medium mb-4">
                  Coiffures professionnelles sur mesure pour sublimer votre
                  beauté naturelle.
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Découvrez nos coiffures sur mesure.
                  </span>
                  <Link
                    href="/hairstyles"
                    className="bg-white rounded-full p-2"
                  >
                    <Image
                      src="/arrow-top-right.svg"
                      alt="Voir plus"
                      width={16}
                      height={16}
                    />
                  </Link>
                </div>
              </div>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
