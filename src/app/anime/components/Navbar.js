"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/anime", label: "Home" },
  { href: "/anime/list", label: "Daftar List" },
  { href: "/anime/seasons", label: "Tayang Sekarang" },
  { href: "/anime/search", label: "Cari Anime" },
  { href: "/anime/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white px-4 py-3 shadow-md transition-transform duration-300",
        showNavbar ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <p className="font-bold text-xl hidden sm:block">AnimeApp</p>
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 rounded-md hover:bg-blue-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <ul className="hidden sm:flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "hover:bg-blue-700 px-3 py-2 rounded-md transition-all",
                  pathname === link.href ? "bg-blue-800 font-semibold" : ""
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          className="bg-white text-blue-600 hover:bg-gray-100 border-white hidden sm:block"
          asChild
        >
          <Link href="/">🏠 Home Utama</Link>
        </Button>
      </div>

      {isOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-4 py-2 rounded-md hover:bg-blue-700",
                    pathname === link.href ? "bg-blue-800 font-semibold" : ""
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="bg-white text-blue-600 hover:bg-gray-100 w-full"
            asChild
            onClick={() => false}
          >
            <Link href="/">🏠 Home Utama</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
