"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// better-auth client
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Password Validation
    if (password.length < 8) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain one uppercase letter");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain one lowercase letter");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
        image,
      });

      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
        return;
      }

      toast.success("Registration successful");

      // Redirect
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
          {/* Top */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Create Account</h1>

            <p className="text-gray-500 mt-2">
              Register and start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full text-black pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full text-black pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Photo URL
              </label>

              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="url"
                  name="image"
                  placeholder="Enter photo URL"
                  required
                  className="w-full text-black pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Validation */}
              <div className="mt-3 text-sm text-gray-500 space-y-1">
                <p>• At least 6 characters</p>
                <p>• One uppercase letter</p>
                <p>• One lowercase letter</p>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  className="w-full pl-12 pr-4 text-black py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-violet-400/20 dark:bg-violet-400 text-foreground font-semibold hover:opacity-90 transition-all duration-300 cursor-pointer"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
