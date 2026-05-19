"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlusCircle, FaPaw, FaMapMarkerAlt, FaSyringe } from "react-icons/fa";

const SPECIES = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Fish",
  "Hamster",
  "Turtle",
  "Other",
];
const GENDERS = ["Male", "Female"];
const VACCINATION = ["Vaccinated", "Not Vaccinated", "Partially Vaccinated"];

export default function AddPetPage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    // api call example
    // fetch("/api/pets", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    toast("Pet Added Successfully");
  };

  return (
    <div className="min-h-screen  px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="rounded-full bg-violet-100 p-4 text-3xl text-violet-600">
              <FaPaw />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground">Add a New Pet</h1>

          <p className="mt-2 text-foreground/80">
            Fill up the details below to list your lovely pet
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Pet Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Pet Name
              </label>

              <input
                type="text"
                name="petName"
                placeholder="e.g. Buddy"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                required
              />
            </div>

            {/* Species */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Species
              </label>

              <select
                name="species"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                required
              >
                <option value="">Select species</option>

                {SPECIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Breed */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Breed
              </label>

              <input
                type="text"
                name="breed"
                placeholder="e.g. Golden Retriever"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Age
              </label>

              <input
                type="text"
                name="age"
                placeholder="e.g. 2 years"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Gender
              </label>

              <select
                name="gender"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              >
                {GENDERS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Vaccination */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaSyringe className="text-violet-500" />
                Vaccination Status
              </label>

              <select
                name="vaccinationStatus"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              >
                {VACCINATION.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              required
            />
          </div>

          {/* Health + Location */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Health */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Health Status
              </label>

              <input
                type="text"
                name="healthStatus"
                placeholder="e.g. Healthy"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt className="text-violet-500" />
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. New York"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          {/* Adoption Fee */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Adoption Fee ($)
            </label>

            <input
              type="number"
              name="adoptionFee"
              placeholder="0"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              placeholder="Tell us about this pet..."
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          {/* Owner Email */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Owner Email
            </label>

            <input
              type="email"
              name="ownerEmail"
              defaultValue={"admin@gmail.com"}
              readOnly
              className="w-full cursor-not-allowed rounded-xl bg-gray-100 px-4 py-3 text-gray-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:scale-[1.01]"
          >
            <FaPlusCircle />
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
}
