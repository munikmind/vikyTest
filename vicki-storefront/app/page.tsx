import AboutUs from "@/components/AboutUs";
import CategoriesSection from "@/components/CategoriesSection";
import CurrentFavorite from "@/components/CurrentFavorite";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="px-4 md:px-8 lg:px-36">
      <div className="h-[10px]"></div>
      <HeroSection />
      <div className="h-[100px]"></div>      
      <CategoriesSection />
      <div className="h-[150px]"></div>
      <AboutUs />
      <div className="h-[200px]"></div>
      <CurrentFavorite />
      
    </div>
  );
}
