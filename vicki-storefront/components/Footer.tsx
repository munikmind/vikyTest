"use client";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          {/* VikiCollection Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-pink-600">
              VikiCollection
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              VikiCollection, votre partenaire beauté et mode. Découvrez nos
              vêtements sur mesure, coiffures professionnelles, et produits de
              soins pour sublimer votre style au quotidien. Rejoignez-nous et
              vivez l'élégance à votre image.
            </p>
          </div>

          {/* Categorie Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-pink-600">Categorie</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/habillement"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Habillement
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/coiffure"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Coiffure
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/extension-perruque"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Extension et Perruque
                </Link>
              </li>
            </ul>
          </div>

          {/* Entreprise Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-pink-600">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/a-propos"
                  className="text-gray-600 hover:text-pink-600"
                >
                  A propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-pink-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Methode de Payment Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-pink-600">
              Methode de Payment
            </h3>
            <div className="flex gap-4">
              <Image
                src="/payment/icons8-mastercard.svg"
                alt="Mastercard"
                width={40}
                height={25}
                className="object-contain"
              />
              <Image
                src="/payment/icons8-visa.svg"
                alt="Visa"
                width={40}
                height={25}
                className="object-contain"
              />
              <Image
                src="/payment/WAVE-removebg-preview.png"
                alt="Wave"
                width={40}
                height={25}
                className="object-contain"
              />
              <Image
                src="/payment/OM-removebg-preview.png"
                alt="Orange Money"
                width={40}
                height={25}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-300">
          <p className="text-center text-gray-600 text-sm">
            © 2025 VikiCollection. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
