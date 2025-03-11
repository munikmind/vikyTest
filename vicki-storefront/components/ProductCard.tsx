import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="w-[300px] h-fit border-2 rounded-xl hover:shadow-lg transition-shadow">
        <CardContent className="flex items-center justify-center gap-3 p-3 rounded-xl">
          <Image
            src={imageSrc}
            alt={productName}
            width={100}
            height={100}
            className="object-cover object-top w-[150px] h-[130px] rounded-xl"
          />
          {/* Product details */}
          <div className="flex flex-col items-start gap-6">
            <p className={`${poppins.className} text-black font-semibold`}>
              {productName}
            </p>
            <div className="flex flex-col items-start justify-start gap-1">
              <p className={`${poppins.className} text-black font-semibold`}>
                {price} FcFA
              </p>
              <button className="w-24 bg-[#D12E87] text-white font-semibold rounded-md border">
                Ajouter
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
