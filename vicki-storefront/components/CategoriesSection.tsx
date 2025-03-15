import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const CategoriesSection = () => {
  return (
    <div className="flex flex-col items-start gap-8 md:gap-12 lg:gap-16 px-4 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col items-start gap-2 w-full">
        <h2
          className={`${poppins.className} text-[#D12E87] text-3xl md:text-4xl lg:text-5xl font-medium`}
        >
          <span className="text-black">Nos</span> Categories
        </h2>
        <p className={`${poppins.className} text-black font-medium w-full md:w-[80%] lg:w-[600px]`}>
          Explorez nos catégories et trouvez votre style. Habillement,
          coiffures, extension et Perruque vous attendent.
        </p>
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-6 w-full">
        {/* Category card 1 - Habillement */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black rounded-xl">
          <Image
            src="/modelVetement3.jpg"
            alt="Category"
            fill
            className="object-cover rounded-xl opacity-60"
          />
          <div className="absolute top-4 md:top-5 right-4 w-[140px] sm:w-[160px] md:w-[180px] h-[40px] md:h-[45px] bg-white rounded-3xl flex items-center justify-center">
            <p
              className={`${poppins.className} text-black font-medium text-lg md:text-xl`}
            >
              Habillement
            </p>
          </div>
          <a href="/categories/habillement">
            <div className="absolute bottom-4 md:bottom-10 left-4 md:left-5 w-[160px] sm:w-[180px] h-[40px] md:h-[45px] bg-white rounded-3xl flex items-center justify-center gap-2 md:gap-3">
              <p
                className={`${poppins.className} text-black font-medium text-lg md:text-xl`}
              >
                Decouvrir
              </p>
              <Image
                src="/eye-password.svg"
                alt="Profile"
                width={15}
                height={15}
                className="object-cover size-6 md:size-9"
              />
            </div>
          </a>
        </div>
        
        {/* Category card 2 - Coiffure */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black rounded-xl">
          <Image
            src="/sistaLocks2.jpeg"
            alt="Category"
            fill
            className="object-cover rounded-xl opacity-60"
          />

          <div className="absolute top-4 md:top-5 right-4 w-[140px] sm:w-[160px] md:w-[180px] h-[40px] md:h-[45px] bg-white rounded-3xl flex items-center justify-center">
            <p
              className={`${poppins.className} text-black font-medium text-lg md:text-xl`}
            >
              Coiffure
            </p>
          </div>

          <a href="/categories/coiffure">
            <div className="absolute bottom-4 md:bottom-10 left-4 md:left-5 w-[160px] sm:w-[180px] h-[40px] md:h-[45px] bg-white rounded-3xl flex items-center justify-center gap-2 md:gap-3">
              <p
                className={`${poppins.className} text-black font-medium text-lg md:text-xl`}
              >
                Decouvrir
              </p>
              <Image
                src="/eye-password.svg"
                alt="Profile"
                width={15}
                height={15}
                className="object-cover size-6 md:size-9"
              />
            </div>
          </a>
        </div>
        
        {/* Category card 3 - Extension et Perruque */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-black rounded-xl">
          <Image
            src="/perruque.jpeg"
            alt="Category"
            fill
            className="object-cover rounded-xl opacity-60"
          />

          <div className="absolute top-4 md:top-5 right-4 w-[160px] sm:w-[180px] md:w-[220px] lg:w-[280px] h-[40px] md:h-[45px] bg-white rounded-3xl flex items-center justify-center">
            <p
              className={`${poppins.className} text-black font-medium text-lg md:text-xl text-center px-2`}
            >
              Extension et Perruque
            </p>
          </div>

          <a href="/categories/perruques">
            <div className="absolute bottom-4 md:bottom-10 left-4 md:left-5 w-[160px] sm:w-[180px] h-[40px] md:h-[45px] bg-white rounded-3xl flex items-center justify-center gap-2 md:gap-3">
              <p
                className={`${poppins.className} text-black font-medium text-lg md:text-xl`}
              >
                Decouvrir
              </p>
              <Image
                src="/eye-password.svg"
                alt="Profile"
                width={15}
                height={15}
                className="object-cover size-6 md:size-9"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;