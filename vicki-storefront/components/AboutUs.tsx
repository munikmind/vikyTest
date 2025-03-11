"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});


const AboutUs = () => {
  return (
    <div className="w-full bg-gray-100 py-16 px-4">
      <div className="container mx-auto">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <h1 className={`${poppins.className} text-5xl font-medium mb-6`}>
            Pourquoi choisir{" "}
            <span className={`${poppins.className} text-[#D12E87]`}>VikiCollection</span> ?
          </h1>
        </div>

        {/* Cartes des avantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Carte 1: Qualité et Savoir-Faire */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="bg-[#D12E87] rounded-lg w-16 h-16 flex items-center justify-center mb-6">
              <Image
                src="/sparkle-star-ai.svg"
                alt="Qualité"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Qualité et Savoir-Faire
            </h3>
            <p className="text-gray-700">
              Nous vous proposons des produits et services de haute qualité,
              réalisés avec expertise et passion, pour sublimer votre beauté et
              votre style.
            </p>
          </div>

          {/* Carte 2: Créations Sur Mesure */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="bg-[#D12E87] rounded-lg w-16 h-16 flex items-center justify-center mb-6">
              <Image
                src="/cut-scissors.svg"
                alt="Créations"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">Créations Sur Mesure</h3>
            <p className="text-gray-700">
              Que ce soit pour vos vêtements ou vos coiffures, nous offrons des
              solutions personnalisées qui s'adaptent parfaitement à vos goûts
              et besoins.
            </p>
          </div>

          {/* Carte 3: Extensions et perruques */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="bg-[#D12E87] rounded-lg w-16 h-16 flex items-center justify-center mb-6">
              <Image
                src="/icons8-barbershop-100 1.svg"
                alt="Extensions"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Extensions et perruques haut de gamme
            </h3>
            <p className="text-gray-700">
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
