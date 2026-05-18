"use client";
import { FaHeart, FaHome, FaSmile, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: FaHeart,
    title: "Save a Life",
    description:
      "Every adoption gives a homeless pet a second chance at happiness and a loving family.",
  },
  {
    icon: FaHome,
    title: "Reduce Overpopulation",
    description:
      "Adopting from shelters helps reduce the number of animals without homes.",
  },
  {
    icon: FaSmile,
    title: "Unconditional Love",
    description:
      "Adopted pets show incredible gratitude and form deep bonds with their new families.",
  },
  {
    icon: FaUsers,
    title: "Support the Community",
    description:
      "By adopting, you support local shelters and rescue organizations in their mission.",
  },
];

export default function WhyAdopt() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-violet-200/20 to-sky-300/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-3">
            Why Adopt a Pet?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Adoption is the most rewarding way to welcome a new friend into your
            life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
