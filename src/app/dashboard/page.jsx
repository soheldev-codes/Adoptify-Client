"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { FaClipboardList, FaPlusCircle, FaListUl } from "react-icons/fa";

const sidebarLinks = [
  {
    label: "My Requests",
    path: "/dashboard/requests",
    icon: FaClipboardList,
  },
  {
    label: "Add Pet",
    path: "/dashboard/add-pet",
    icon: FaPlusCircle,
  },
  {
    label: "My Listings",
    path: "/dashboard/listings",
    icon: FaListUl,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 border-r border-border bg-card flex-col p-4 gap-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            Dashboard
          </h3>

          {sidebarLinks.map((link) => {
            const active = pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="text-sm" />

                {link.label}

                {active && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </aside>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex">
          {sidebarLinks.map((link) => {
            const active = pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="text-sm" />

                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
