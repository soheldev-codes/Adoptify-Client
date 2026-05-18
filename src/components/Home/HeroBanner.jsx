"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaArrowRight, FaHeart, FaShieldAlt, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-sm font-medium mb-6 border border-primary/20">
              <FaHeart className="text-xs" />
              Find your perfect companion
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Give a Pet a <br />
              <span className="text-primary">Loving Home</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Browse hundreds of adorable pets waiting for their forever
              families. Every adoption saves a life and brings endless joy.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/pets">
                <Button
                  size="lg"
                  radius="lg"
                  className="bg-gradient-to-r from-violet-500 to-blue-500 text-white px-7 font-medium shadow-lg hover:scale-105 transition-all"
                  endContent={<FaArrowRight />}
                >
                  Adopt Now
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[
                {
                  value: "2,000+",
                  label: "Pets Adopted",
                  color: "text-violet-500",
                },
                {
                  value: "500+",
                  label: "Happy Families",
                  color: "text-blue-500",
                },
                {
                  value: "4.9",
                  label: "Rating",
                  icon: FaStar,
                  color: "text-yellow-500",
                },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex items-center gap-1">
                    <span className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </span>

                    {stat.icon && (
                      <stat.icon className={`text-sm ${stat.color}`} />
                    )}
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                width={300}
                height={300}
                src="https://images.unsplash.com/photo-1521247560470-d2cbfe2f7b47?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy pets"
                className="w-full h-[500px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute -bottom-4 -left-4 bg-background  rounded-2xl shadow-2xl p-4 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
                  <FaShieldAlt className="text-blue-500 text-lg" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Verified Shelters
                  </p>

                  <p className="text-xs text-muted-foreground">
                    100% trusted partners
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
