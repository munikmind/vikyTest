"use client";
import { motion, useInView } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useRef } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const AboutUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="w-full bg-gray-100 py-8 sm:py-12 md:py-16 px-4">
      <div className="container mx-auto">
        {/* Titre principal */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className={`${poppins.className} text-3xl sm:text-4xl md:text-5xl font-medium mb-4 sm:mb-6`}>
            Pourquoi choisir{" "}
            <span className={`${poppins.className} text-[#D12E87]`}>
              VikiCollection
            </span>{" "}
            ?
          </h1>
        </div>

        {/* Cartes des avantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Carte 1: Qualité et Savoir-Faire */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
            <div className="bg-[#D12E87] rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/sparkle-star-ai.svg"
                alt="Qualité"
                width={24}
                height={24}
                className="object-contain sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Qualité et Savoir-Faire
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Nous vous proposons des produits et services de haute qualité,
              réalisés avec expertise et passion, pour sublimer votre beauté et
              votre style.
            </p>
          </div>

          {/* Carte 2: Créations Sur Mesure */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
            <div className="bg-[#D12E87] rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/cut-scissors.svg"
                alt="Créations"
                width={24}
                height={24}
                className="object-contain sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Créations Sur Mesure</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Que ce soit pour vos vêtements ou vos coiffures, nous offrons des
              solutions personnalisées qui s'adaptent parfaitement à vos goûts
              et besoins.
            </p>
          </div>

          {/* Carte 3: Extensions et perruques */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
            <div className="bg-[#D12E87] rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
              <Image
                src="/icons8-barbershop-100 1.svg"
                alt="Extensions"
                width={24}
                height={24}
                className="object-contain sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Extensions et perruques haut de gamme
            </h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Découvrez notre collection de mèches, extensions et perruques pour
              tous vos styles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;