"use client";

import { useEffect, useState } from "react";
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
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function PetDetailsPage() {
  const [open, setOpen] = useState(false);
  const params = useParams();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pets/${params.id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      setPet(data);
    };

    fetchPet();
  }, [params.id]);

  if (!pet) {
    return <div>Loading...</div>;
  }

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

  console.log(pet);

  const isAdopted = pet?.status === "adopted";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      // token
      const token = localStorage.getItem("token");
      // final object
      const newData = {
        ...data,
        status: "pending",
        owner_email: pet.owner_email,
        created_at: new Date().toISOString(),
      };

      // API CALL
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/adoptions/${pet._id}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newData),
        },
      );

      const result = await res.json();

      // error from backend
      if (!res.ok) {
        return toast(result.message);
      }

      // success
      toast.success("Adoption Request Submitted Successfully!");

      // close modal
      setOpen(false);

      // reset form
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
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
              src={pet?.image_url}
              alt={pet?.pet_name}
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
                defaultValue={user?.name}
                required
                className="w-full h-12 rounded-xl border border-border px-4 outline-none"
              />

              {/* User Email */}
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                defaultValue={user?.email}
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
