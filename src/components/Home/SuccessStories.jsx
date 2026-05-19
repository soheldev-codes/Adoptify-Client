"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaQuoteRight } from "react-icons/fa";

const stories = [
  {
    name: "Sarah & Max",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    pet: "Golden Retriever",
    story:
      "Max was shy and scared when we first met him at the shelter. Now he's the most playful, loving dog. Adopting him was the best decision we ever made!",
  },
  {
    name: "James & Luna",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    pet: "Tabby Cat",
    story:
      "Luna curled up on my lap within minutes of meeting her. She's been my constant companion through everything. Adoption changed both our lives.",
  },
  {
    name: "The Patel Family",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    pet: "Parrot",
    story:
      "Our kids learned responsibility and compassion through adopting Rio. He's become part of the family and brings so much joy and laughter every day.",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Success Stories
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto">
            Real families, real love, real transformations
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <FaQuoteRight className="absolute top-5 right-5 text-primary/15 text-4xl" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <FaStar key={j} className="text-primary text-sm" />
                ))}
              </div>

              {/* Story */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {story.story}
              </p>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {story.name}
                  </h4>

                  <p className="text-xs text-muted-foreground">
                    Adopted a {story.pet}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
