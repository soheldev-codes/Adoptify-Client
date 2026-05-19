"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// HeroUI কম্পোনেন্টসমূহ ইমপোর্ট করা হয়েছে
import { Button, Spinner } from "@heroui/react";

// react-icons থেকে ArrowRight ব্যবহার করা হয়েছে
import { FaArrowRight } from "react-icons/fa6";
import PetCard from "./PetCard";

export default function FeaturedPets() {
  const pets = [
    {
      id: 1,
      pet_name: "Buddy",
      species: "Dog",
      breed: "Golden Retriever",
      age: "2 Years",
      gender: "Male",
      image_url:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Vaccinated",
      location: "New York, USA",
      adoption_fee: 150,
      description:
        "Buddy is a friendly and energetic Golden Retriever who loves outdoor activities and playing fetch.",
      owner_email: "demo@example.com",
    },
    {
      id: 2,
      pet_name: "Luna",
      species: "Cat",
      breed: "Siamese",
      age: "1 Year",
      gender: "Female",
      image_url:
        "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Vaccinated",
      location: "Los Angeles, USA",
      adoption_fee: 100,
      description:
        "Luna is a calm and affectionate Siamese cat with stunning blue eyes and a loving personality.",
      owner_email: "demo@example.com",
    },
    {
      pet_name: "Charlie",
      species: "Dog",
      breed: "Labrador",
      age: "3 Years",
      gender: "Male",
      image_url:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Vaccinated",
      location: "Chicago, USA",
      adoption_fee: 200,
      description:
        "Charlie is a playful Labrador who enjoys swimming, running, and spending time with families.",
      owner_email: "demo@example.com",
    },
    {
      pet_name: "Kiwi",
      species: "Bird",
      breed: "Cockatiel",
      age: "6 Months",
      gender: "Male",
      image_url:
        "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Not Vaccinated",
      location: "San Francisco, USA",
      adoption_fee: 50,
      description:
        "Kiwi is a cheerful cockatiel who loves singing and interacting with people.",
      owner_email: "demo@example.com",
    },
    {
      pet_name: "Cinnamon",
      species: "Rabbit",
      breed: "Holland Lop",
      age: "8 Months",
      gender: "Female",
      image_url:
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Vaccinated",
      location: "Austin, USA",
      adoption_fee: 75,
      description:
        "Cinnamon is a soft and cuddly rabbit who enjoys exploring and relaxing in cozy spaces.",
      owner_email: "demo@example.com",
    },
    {
      pet_name: "Milo",
      species: "Cat",
      breed: "Maine Coon",
      age: "4 Years",
      gender: "Male",
      image_url:
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Vaccinated",
      location: "Seattle, USA",
      adoption_fee: 120,
      description:
        "Milo is a gentle Maine Coon with a fluffy coat and calm personality.",
      owner_email: "demo@example.com",
    },
    {
      pet_name: "Daisy",
      species: "Dog",
      breed: "Beagle",
      age: "1.5 Years",
      gender: "Female",
      image_url:
        "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Vaccinated",
      location: "Denver, USA",
      adoption_fee: 175,
      description:
        "Daisy is an adorable Beagle who loves adventures, sniffing trails, and playing outdoors.",
      owner_email: "demo@example.com",
    },
    {
      pet_name: "Nemo",
      species: "Fish",
      breed: "Clownfish",
      age: "1 Year",
      gender: "Male",
      image_url:
        "https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=800&auto=format&fit=crop",
      health_status: "Healthy",
      vaccination_status: "Not Vaccinated",
      location: "Miami, USA",
      adoption_fee: 25,
      description:
        "Nemo is a colorful clownfish perfect for aquarium lovers and beginner fish keepers.",
      owner_email: "demo@example.com",
    },
  ];

  const isLoading = false;

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
              {pets.map((pet, i) => (
                <PetCard key={i} pet={pet} index={i} />
              ))}
            </div>

            {/* View All Button */}
            {pets.length > 0 && (
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
