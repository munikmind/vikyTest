import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const CategoriesSection = () => {
  return (
    <div className="flex flex-col items-start gap-16">
      {/* Heading */}
      <div className="flex flex-col items-start gap-2">
        <h2
          className={`${poppins.className} text-[#D12E87] text-5xl font-medium `}
        >
          <span className="text-black">Nos</span> Categories
        </h2>
        <p className={`${poppins.className} text-black font-medium w-[600px]`}>
          Explorez nos catégories et trouvez votre style. Habillement,
          coiffures, extension et Perruque vous attendent.
        </p>
      </div>

      {/* Categories grid */}
      <div className="flex flex-wrap items-center justify-between w-full gap-4">
        {/* Category card */}
        <div className="relative w-[500px] h-[700px] bg-black rounded-xl">
          <Image
            src="/modelVetement3.jpg"
            alt="Category"
            width={500}
            height={700}
            className="object-cover w-full h-full rounded-xl opacity-60"
          />
          <div className="absolute top-5 left-[300px] right-0 w-[180px] h-[45px] bg-white rounded-3xl flex items-center justify-center">
            <p
              className={`${poppins.className} text-black font-medium text-xl`}
            >
              Habillement
            </p>
          </div>
          <a href="/categories/habillement">
            <div className="absolute bottom-10 left-5 right-0 w-[180px] h-[45px] bg-white rounded-3xl flex items-center justify-center gap-3">
              <p
                className={`${poppins.className} text-black font-medium text-xl`}
              >
                Decouvrir
              </p>
              <Image
                src="/eye-password.svg"
                alt="Profile"
                width={15}
                height={15}
                className="object-cover size-9"
              />
            </div>
          </a>
        </div>
        {/* Category card */}
        <div className="relative w-[500px] h-[700px] bg-black rounded-xl">
          <Image
            src="/sistaLocks2.jpeg"
            alt="Category"
            width={500}
            height={700}
            className="object-cover w-full h-full rounded-xl opacity-60"
          />

          <div className="absolute top-5 left-[300px] right-0 w-[180px] h-[45px] bg-white rounded-3xl flex items-center justify-center">
            <p
              className={`${poppins.className} text-black font-medium text-xl`}
            >
              Coiffure
            </p>
          </div>

          <a href="/categories/sisterlocks">
            <div className="absolute bottom-10 left-5 right-0 w-[180px] h-[45px] bg-white rounded-3xl flex items-center justify-center gap-3">
              <p
                className={`${poppins.className} text-black font-medium text-xl`}
              >
                Decouvrir
              </p>
              <Image
                src="/eye-password.svg"
                alt="Profile"
                width={15}
                height={15}
                className="object-cover size-9"
              />
            </div>
          </a>
        </div>
        {/* Category card */}
        <div className="relative w-[500px] h-[700px] bg-black rounded-xl">
          <Image
            src="/perruque.jpeg"
            alt="Category"
            width={500}
            height={700}
            className="object-cover w-full h-full rounded-xl opacity-60"
          />

          <div className="absolute top-5 left-[200px] right-0 w-[280px] h-[45px] bg-white rounded-3xl flex items-center justify-center">
            <p
              className={`${poppins.className} text-black font-medium text-xl text-center`}
            >
              Extension et Perruque
            </p>
          </div>

          <a href="/categories/perruques">
            <div className="absolute bottom-10 left-5 right-0 w-[180px] h-[45px] bg-white rounded-3xl flex items-center justify-center gap-3">
              <p
                className={`${poppins.className} text-black font-medium text-xl`}
              >
                Decouvrir
              </p>
              <Image
                src="/eye-password.svg"
                alt="Profile"
                width={15}
                height={15}
                className="object-cover size-9"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
