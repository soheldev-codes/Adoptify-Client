"use client";

import { motion } from "framer-motion";
import { FaSearch, FaFileAlt, FaHeart, FaHome } from "react-icons/fa";

const steps = [
  {
    icon: FaSearch,
    title: "Browse Pets",
    description:
      "Explore our collection of adorable pets waiting for loving homes.",
  },
  {
    icon: FaFileAlt,
    title: "Submit Request",
    description:
      "Fill out a simple adoption form for the pet you want to adopt.",
  },
  {
    icon: FaHeart,
    title: "Get Approved",
    description:
      "The pet owner reviews your request and approves your adoption.",
  },
  {
    icon: FaHome,
    title: "Welcome Home",
    description:
      "Take your new furry friend home and start your journey together.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-violet-900/10 via-background to-sky-200/10   overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed">
            Adopting a pet is quick and simple with our easy 4-step adoption
            process.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative text-center shadow p-6 rounded-xl dark:border border-violet-800/20 group"
              >
                {/* Icon Box */}
                <div className="relative w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-300/20 to-sky-300/20 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300">
                  <Icon className="text-3xl text-violet-500" />

                  {/* Step Number */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-violet-700 text-white text-sm font-bold flex items-center justify-center shadow">
                    {index + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
