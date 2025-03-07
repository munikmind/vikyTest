import Image from "next/image";
import Navbar from '@/components/navbar';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
export default function Home() {
  return (
   <div className='px-36'>
      <Navbar />
      <div className='h-[50px]'></div>
      <HeroSection />
      <div className='h-[150px]'></div>
      <CategoriesSection />
      <div className='h-[200px]'></div>
    </div>
  );
}
