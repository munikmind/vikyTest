import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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
}

export const ProductCard = ({
  imageSrc,
  productName,
  price,
  handle,
}: ProductCardProps) => {
  return (
    <Link href={`/products/${handle}`}>
      <div className="group relative flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-[#F5F0F0]">
          <Image
            src={imageSrc}
            alt={productName}
            fill
            className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
          {/* Add to Cart Button - Appears on Hover */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-black text-white p-2 rounded-full shadow-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 12h8M12 8v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          <h3
            className={`${poppins.className} text-base font-normal text-black`}
          >
            {productName}
          </h3>
          <p className={`${poppins.className} text-base font-normal`}>
            {price.toLocaleString()} FCFA
          </p>
        </div>
      </div>
    </Link>
  );
};
