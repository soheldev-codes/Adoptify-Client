"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// HeroUI কম্পোনেন্টসমূহ ইমপোর্ট করা হয়েছে
import { Button, Spinner } from "@heroui/react";

// react-icons থেকে ArrowRight ব্যবহার করা হয়েছে
import { FaArrowRight } from "react-icons/fa6";
import PetCard from "./PetCard";

export default function FeaturedPets() {
  const [petsData, setPetsData] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  // Fetch API Data
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/featured-pets`,
        );

        const data = await res.json();

        setPetsData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };

    fetchPets();
  }, []);

  console.log(petsData);

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-3">
            Featured Pets
          </h2>
          <p className="text-default-500 max-w-md mx-auto">
            Meet some of our wonderful pets looking for their forever homes
          </p>
        </motion.div>

        {/* Loading State with HeroUI Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Spinner
              size="lg"
              color="primary"
              label="Loading featured pets..."
              labelColor="primary"
            />
          </div>
        ) : (
          <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {petsData.map((pet, i) => (
                <PetCard key={i} pet={pet} index={i} />
              ))}
            </div>

            {/* View All Button */}
            {petsData.length > 0 && (
              <div className="text-center mt-10">
                <Link
                  href="/pets"
                  className="rounded-xl font-medium underline text-foreground  px-6"
                >
                  View All Pets
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
