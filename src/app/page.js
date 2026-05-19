import FeaturedPets from "@/components/Home/FeaturedPets";
import HeroBanner from "@/components/Home/HeroBanner";
import HowItWorks from "@/components/Home/HowItWorks";
import PetCareTips from "@/components/Home/PetCareTips";
import ReadyAdoption from "@/components/Home/ReadyAdoption";
import SuccessStories from "@/components/Home/SuccessStories";
import WhyAdopt from "@/components/Home/WhyAdopt";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedPets />
      <WhyAdopt />
      <HowItWorks />
      <SuccessStories />
      <PetCareTips />
      <ReadyAdoption />
    </div>
  );
}
