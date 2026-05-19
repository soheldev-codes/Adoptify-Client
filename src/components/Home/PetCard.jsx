"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function PetCard({ pet, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div
        key={pet.id}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-64">
          <Image
            src={pet.image_url}
            alt={pet.pet_name}
            fill
            className="object-cover"
          />

          <span className="absolute top-3 left-3 bg-background/90 text-xs px-3 py-1 rounded-full font-medium">
            {pet.species}
          </span>

          <span className="absolute bottom-3 right-3 bg-background/90 text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold">
            ${pet.adoption_fee}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-bold text-foreground">
              {pet.pet_name}
            </h3>

            <span className="text-sm text-muted-foreground">{pet.age}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-1">
            {pet.breed} • {pet.gender}
          </p>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <FaMapMarkerAlt className="text-xs" />
            {pet.location}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-5">
            {pet.description}
          </p>

          <Link href={`/pets/${pet.id}`}>
            <button className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
