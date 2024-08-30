import Hero from "@/components/Hero";
import Navbar from "@/components/navbar";
import PricingSection from "@/components/Pricing";

export default function Home() {
  return (
    <div className="bg-black pattern relative  h-screen w-full">

      <Navbar />
      <Hero />
      <PricingSection />
    </div>
  );
}
