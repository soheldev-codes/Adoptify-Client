"use client";

import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaHandSparkles,
  FaStethoscope,
  FaUtensils,
} from "react-icons/fa";
// import {
//   FaStethoscope,
//   FaUtensils,
//   FaDumbbell,
//   FaSparkles,
// } from "react-icons/fa";

const tips = [
  {
    icon: FaStethoscope,
    title: "Regular Vet Visits",
    description:
      "Schedule annual check-ups and keep vaccinations up to date for a healthy pet.",
  },
  {
    icon: FaUtensils,
    title: "Balanced Nutrition",
    description:
      "Feed age-appropriate, high-quality food and always provide fresh water.",
  },
  {
    icon: FaDumbbell,
    title: "Daily Exercise",
    description:
      "Keep your pet active with daily walks, playtime, and mental stimulation.",
  },
  {
    icon: FaHandSparkles,
    title: "Grooming & Hygiene",
    description:
      "Regular grooming, dental care, and bathing keeps your pet comfortable.",
  },
];

export default function PetCareTips() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-violet-300/5 to-sky-200/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Pet Care Tips
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto">
            Essential tips to keep your new family member happy and healthy
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, i) => {
            const Icon = tip.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-violet-300/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-2xl text-violet-600" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-foreground mb-2">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
