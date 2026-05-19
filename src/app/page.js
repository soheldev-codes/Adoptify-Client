import HeroBanner from "@/components/Home/HeroBanner";
import HowItWorks from "@/components/Home/HowItWorks";
import PetCareTips from "@/components/Home/PetCareTips";
import SuccessStories from "@/components/Home/SuccessStories";
import WhyAdopt from "@/components/Home/WhyAdopt";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <WhyAdopt />
      <HowItWorks />
      <SuccessStories />
      <PetCareTips />
    </div>
  );
}
