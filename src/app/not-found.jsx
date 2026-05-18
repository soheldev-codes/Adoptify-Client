"use client";
import { motion } from "framer-motion";
import { GiPawPrint } from "react-icons/gi";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
          <GiPawPrint className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-bold font-display text-foreground mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Oops! Looks like this page has wandered off. Let's get you back on
          track.
        </p>

        <Link href="/">
          <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6">
            <BsArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
