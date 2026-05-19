"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// HeroUI কম্পোনেন্টসমূহ ইমপোর্ট করা হয়েছে
import { Card, Badge, Button } from "@heroui/react";

// React Icons ইমপোর্ট
import { FaMapMarkerAlt } from "react-icons/fa";

export default function PetCard({ pet, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      {/* HeroUI Card ব্যবহার করা হয়েছে এবং hover ইফেক্ট দেওয়া হয়েছে */}
      <Card
        isPressable
        className="group rounded-xl overflow-hidden border border-divider  hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 p-0"
      >
        <div className="p-0 overflow-visible">
          {/* Image Section */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={
                pet.image_url ||
                "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop"
              }
              alt={pet.pet_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority={index < 3}
            />

            {/* HeroUI Badges */}
            <div className="absolute top-5 left-12 flex gap-2 z-10">
              <Badge
                variant="flat"
                color="default"
                className="backdrop-blur-sm text-xs p-2"
              >
                {pet.species}
              </Badge>
              {pet.status === "adopted" && (
                <Badge color="danger" variant="flat" className="text-xs p-2">
                  Adopted
                </Badge>
              )}
            </div>

            {pet.adoption_fee !== undefined && (
              <div className="absolute bottom-8 right-5 z-10">
                <Badge variant="shadow" className="font-semibold p-2">
                  ${pet.adoption_fee || "Free"}
                </Badge>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-4 w-full">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground text-lg leading-tight">
                {pet.pet_name}
              </h3>
              <span className="text-xs text-default-500">{pet.age}</span>
            </div>
            <p className="text-sm text-default-500 mb-1">
              {pet.breed} · {pet.gender}
            </p>

            {pet.location && (
              <div className="flex items-center gap-1 text-xs text-default-400 mb-3">
                <FaMapMarkerAlt className="w-3 h-3" />
                {pet.location}
              </div>
            )}

            {/* Next.js Link ও HeroUI Button-এর সমন্বয় */}
            <Link
              href={`/pets/${pet.id}`}
              className="w-full rounded-lg bg-gradient-to-r from-violet-400/20 to-sky-400/20 px-4 py-2  hover:shadow text-foreground font-medium transition-all"
            >
              View Details
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
