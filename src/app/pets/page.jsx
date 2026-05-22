"use client";

import { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import PetCard from "@/components/Home/PetCard";

const speciesOptions = ["All", "Dog", "Cat", "Bird", "Rabbit", "Fish"];

export default function AllPetsPage() {
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("All");
  const [sort, setSort] = useState("newest");

  // Fetch Pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);

        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/pets?`;

        // search query
        if (search) {
          url += `search=${search}&`;
        }

        // species query
        if (species !== "All") {
          url += `species=${species}`;
        }

        const res = await fetch(url);

        let data = await res.json();

        // sorting frontend
        if (sort === "low") {
          data.sort((a, b) => a.adoption_fee - b.adoption_fee);
        }

        if (sort === "high") {
          data.sort((a, b) => b.adoption_fee - a.adoption_fee);
        }

        setPetsData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [search, species, sort]);

  return (
    <section className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Pets</h1>

          <p className="text-muted-foreground">Find your perfect companion</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex items-center gap-2 border rounded-xl px-4 h-12 flex-1">
            <FaSearch />

            <input
              type="text"
              placeholder="Search pets..."
              className="bg-transparent outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Species */}
          <div className="flex items-center gap-2 border rounded-xl px-4 h-12">
            <FaFilter />

            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="bg-transparent outline-none"
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
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-xl px-4 h-12"
          >
            <option value="newest">Newest First</option>

            <option value="low">Price Low to High</option>

            <option value="high">Price High to Low</option>
          </select>
        </div>

        {/* Result */}
        <p className="text-sm mb-6">{petsData.length} pet(s) found</p>

        {/* Cards */}
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {petsData.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
