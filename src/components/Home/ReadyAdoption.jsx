"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaPaw, FaArrowRight } from "react-icons/fa";
import { Button } from "@heroui/react";

export default function ReadyAdoption() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-300/50  to-sky-200/50  p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-primary/30"
        >
          {/* Background Paw Icons */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10">
              <FaPaw className="w-20 h-20" />
            </div>

            <div className="absolute bottom-10 right-10 rotate-45">
              <FaPaw className="w-16 h-16" />
            </div>

            <div className="absolute top-1/2 left-1/3 -rotate-12">
              <FaPaw className="w-12 h-12" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Make a Difference?
            </h2>

            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg">
              Thousands of pets are waiting for someone just like you. Start
              your adoption journey today.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/pets">
                <Button className="rounded-xl bg-background text-foreground hover:bg-background/90 gap-2 px-6">
                  Find a Pet
                  <FaArrowRight className="text-sm" />
                </Button>
              </Link>

              <Link href="/dashboard/add-pet">
                <Button
                  variant="outline"
                  className="rounded-xl border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 px-6"
                >
                  List for Adoption
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
