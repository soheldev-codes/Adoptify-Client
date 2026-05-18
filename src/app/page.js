import HeroBanner from "@/components/Home/HeroBanner";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
    </div>
  );
}
