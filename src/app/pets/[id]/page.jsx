"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeart,
  FaShieldAlt,
  FaArrowLeft,
  FaPaw,
  FaDollarSign,
  FaSyringe,
  FaHeartbeat,
  FaUser,
} from "react-icons/fa";

// Dummy Data
const petsData = [
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
    description: "Buddy is a friendly and energetic Golden Retriever.",
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
    description: "Luna is a calm and affectionate Siamese cat.",
    owner_email: "demo@example.com",
  },
  {
    id: 3,
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
    description: "Charlie is a playful Labrador who loves swimming.",
    owner_email: "demo@example.com",
  },
  {
    id: 4,
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
    description: "Kiwi is a cheerful cockatiel who loves singing.",
    owner_email: "demo@example.com",
  },
  {
    id: 5,
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
    description: "Cinnamon is a soft and cuddly rabbit.",
    owner_email: "demo@example.com",
  },
  {
    id: 6,
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
    description: "Milo is a gentle Maine Coon with a fluffy coat.",
    owner_email: "demo@example.com",
  },
  {
    id: 7,
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
    description: "Daisy is an adorable Beagle who loves adventures.",
    owner_email: "demo@example.com",
  },
  {
    id: 8,
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
    description: "Nemo is a colorful clownfish perfect for aquariums.",
    owner_email: "demo@example.com",
  },
];

export default function PetDetailsPage() {
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const pet = petsData.find((item) => item.id === parseInt(id));

  if (!pet) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-5">Pet Not Found</h2>

        <Link href="/pets">
          <button className="h-11 px-5 rounded-xl border">Back To Pets</button>
        </Link>
      </div>
    );
  }

  const isAdopted = pet.status === "adopted";

  const infoItems = [
    {
      icon: FaPaw,
      label: "Species",
      value: pet.species,
    },
    {
      icon: FaHeart,
      label: "Breed",
      value: pet.breed,
    },
    {
      icon: FaCalendarAlt,
      label: "Age",
      value: pet.age,
    },
    {
      icon: FaUser,
      label: "Gender",
      value: pet.gender,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: pet.location,
    },
    {
      icon: FaDollarSign,
      label: "Adoption Fee",
      value: `$${pet.adoption_fee}`,
    },
    {
      icon: FaHeartbeat,
      label: "Health",
      value: pet.health_status,
    },
    {
      icon: FaSyringe,
      label: "Vaccination",
      value: pet.vaccination_status,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const adoptionData = {
      pet_id: pet.id,

      pet_image: pet.image_url,
      owner_email: pet.owner_email,

      pet_name: form.pet_name.value,
      user_name: form.user_name.value,
      user_email: form.user_email.value,
      adoption_date: form.adoption_date.value,
      message: form.message.value,

      status: "pending",
      created_at: new Date().toISOString(),
    };

    console.log(adoptionData);

    // success alert
    alert("Adoption Request Submitted Successfully!");

    // modal close
    setOpen(false);

    // reset form
    form.reset();
  };

  return (
    <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <Link
        href={"/pets"}
        className="inline-flex font-semibold items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
      >
        <FaArrowLeft className="text-xs" />
        Back To All Pets
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-border">
            <Image
              src={pet.image_url}
              alt={pet.pet_name}
              fill
              className="object-cover"
            />

            {isAdopted && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-white text-black px-5 py-2 rounded-full font-semibold">
                  Adopted
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-7"
        >
          {/* Title */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <h1 className="text-4xl font-bold">{pet.pet_name}</h1>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  isAdopted
                    ? "bg-muted text-muted-foreground"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isAdopted ? "Adopted" : "Available"}
              </span>
            </div>

            <p className="text-muted-foreground">
              {pet.breed} • {pet.species}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 border border-border rounded-2xl p-6 bg-card">
            {infoItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                    <Icon className="text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>

                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3">About {pet.pet_name}</h3>

            <p className="text-muted-foreground leading-relaxed">
              {pet.description}
            </p>
          </div>

          {/* Button */}
          {!isAdopted ? (
            <button
              onClick={() => setOpen(true)}
              className="w-full cursor-pointer h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <FaHeart />
              Adopt {pet.pet_name}
            </button>
          ) : (
            <div className="bg-muted rounded-2xl p-5 text-center">
              <p className="text-muted-foreground">
                This pet has already been adopted.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-3xl w-full max-w-lg p-6 relative">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6">Adoption Request</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pet Name */}
              <input
                type="text"
                name="pet_name"
                defaultValue={pet.pet_name}
                readOnly
                className="w-full h-12 rounded-xl border border-border px-4 outline-none bg-muted"
              />

              {/* User Name */}
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
                className="w-full h-12 rounded-xl border border-border px-4 outline-none"
              />

              {/* User Email */}
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                className="w-full h-12 rounded-xl border border-border px-4 outline-none"
              />

              {/* Adoption Date */}
              <input
                type="date"
                name="adoption_date"
                required
                className="w-full h-12 rounded-xl border border-border px-4 outline-none"
              />

              {/* Message */}
              <textarea
                rows={4}
                name="message"
                placeholder="Why do you want to adopt this pet?"
                className="w-full rounded-xl border border-border px-4 py-3 outline-none"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-slate-200 text-foreground font-medium cursor-pointer hover:bg-slate-300 transition"
              >
                Confirm Adoption
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
