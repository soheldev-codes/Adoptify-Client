"use client";

import Link from "next/link";
import {
  FaPaw,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const socials = [
    {
      icon: FaFacebookF,
      href: "#",
    },
    {
      icon: FaTwitter,
      href: "#",
    },
    {
      icon: FaInstagram,
      href: "#",
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400/20 to-sky-400/20 flex items-center justify-center shadow-md">
                <FaPaw className="text-primary-foreground text-lg" />
              </div>

              <span className="text-xl font-bold text-foreground">
                Adoptify
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting loving homes with pets in need. Every adoption changes
              two lives forever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>

            <div className="space-y-2.5">
              <Link
                href="/"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>

              <Link
                href="/pets"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                All Pets
              </Link>

              <Link
                href="/dashboard/add-pet"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                List a Pet
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaEnvelope className="text-primary" />
                hello@adoptify.com
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaPhone className="text-primary" />
                +1 (555) 123-4567
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FaMapMarkerAlt className="text-primary" />
                123 Pet Street, NY 10001
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>

            <div className="flex gap-3">
              {socials.map((social, i) => {
                const Icon = social.icon;

                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-violet-300/20 flex items-center justify-center text-muted-foreground  transition-all duration-300"
                  >
                    <Icon className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Adoptify. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with
            <FaHeart className="text-destructive" />
            for pets everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
