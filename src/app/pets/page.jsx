"use client";

import { useMemo, useState } from "react";

import { FaSearch, FaFilter, FaMapMarkerAlt } from "react-icons/fa";
import PetCard from "@/components/Home/PetCard";

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

const speciesOptions = ["All", "Dog", "Cat", "Bird", "Rabbit", "Fish"];

export default function AllPetsPage() {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("All");
  const [sort, setSort] = useState("newest");

  const filteredPets = useMemo(() => {
    let filtered = [...petsData];

    // Search
    filtered = filtered.filter((pet) =>
      `${pet.pet_name} ${pet.breed} ${pet.location}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

    // Species filter
    if (species !== "All") {
      filtered = filtered.filter((pet) => pet.species === species);
    }

    // Sorting
    if (sort === "low") {
      filtered.sort((a, b) => a.adoption_fee - b.adoption_fee);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.adoption_fee - a.adoption_fee);
    }

    return filtered;
  }, [search, species, sort]);

  return (
    <section className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">All Pets</h1>

          <p className="text-muted-foreground">
            Find your perfect companion from our available pets
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex items-center gap-2 border border-border rounded-xl px-4 h-12 flex-1 bg-card">
            <FaSearch className="text-muted-foreground" />

            <input
              type="text"
              placeholder="Search by name, breed, or location..."
              className="bg-transparent outline-none w-full text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Species */}
          <div className="flex items-center gap-2 border border-border rounded-xl px-4 h-12 bg-card">
            <FaFilter className="text-muted-foreground" />

            <select
              className="bg-transparent outline-none text-sm"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              {speciesOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            className="border border-border rounded-xl px-4 h-12 bg-card text-sm outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="low">Price Low to High</option>
            <option value="high">Price High to Low</option>
          </select>
        </div>

        {/* Result */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredPets.length} pet(s) found
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPets.map((pet, inx) => (
            <PetCard pet={pet} key={inx} />
          ))}
        </div>
      </div>
    </section>
  );
}
