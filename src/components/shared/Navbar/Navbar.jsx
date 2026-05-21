"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  FaPaw,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSignOutAlt,
  FaClipboardList,
  FaPlusCircle,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import { BiLogIn } from "react-icons/bi";
import { session } from "@/lib/userData";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "All Pets", path: "/pets" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const isActive = (path) => pathname === path;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const router = useRouter();
  const handelLogout = async () => {
    await authClient.signOut();

    router.push("/");
    toast.success("Logged out successfully");
    setProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <FaPaw className="text-white text-lg" />
            </div>

            <h1 className="text-2xl font-bold text-foreground">Adoptify</h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400"
                    : "text-muted-foreground hover:text-foreground hover:bg-violet-100 dark:hover:bg-violet-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 relative">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-violet-100 dark:hover:bg-violet-800 transition"
            >
              {darkMode ? (
                <FaSun className="text-lg" />
              ) : (
                <FaMoon className="text-lg" />
              )}
            </button>

            {/* Profile Dropdown */}
            {user ? (
              <>
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center cursor-pointer gap-3 px-3 py-2 rounded-xl hover:bg-violet-100 dark:hover:bg-violet-600 transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-violet-200 dark:bg-violet-500/20 flex items-center justify-center">
                      <span className="">
                        {(
                          <Image
                            className="rounded-full ring-2 ring-violet-400"
                            src={user?.image}
                            height={50}
                            width={50}
                            alt="User Image"
                          />
                        ) || <FaUser />}
                      </span>
                    </div>

                    <span className="text-sm font-medium text-foreground">
                      {user?.name || "User"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-14 w-56 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
                      >
                        <div className="p-2">
                          <Link
                            href="/dashboard/add-pet"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-violet-100 dark:hover:bg-violet-600 transition"
                          >
                            <FaTachometerAlt className="text-sm" />
                            Dashboard
                          </Link>

                          <div className="my-2 h-px bg-border" />

                          <button
                            onClick={handelLogout}
                            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                          >
                            <FaSignOutAlt className="text-sm" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <Link href={"/login"}>
                <button className=" cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-foreground hover:bg-violet-200 dark:hover:bg-violet-400/10 transition">
                  <BiLogIn className="" />
                  Login Now
                </button>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-muted transition"
            >
              {mobileOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive(link.path)
                      ? "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400"
                      : "text-white hover:bg-violet-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Profile */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center gap-3 px-2">
                  <FaUserCircle className="text-4xl text-violet-500" />

                  <div>
                    <h3 className="text-sm font-semibold">Sohel Rana</h3>
                    <p className="text-xs text-muted-foreground">
                      User Account
                    </p>
                  </div>
                </div>

                <button
                  onClick={handelLogout}
                  className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
