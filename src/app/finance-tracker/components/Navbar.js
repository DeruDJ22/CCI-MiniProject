"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/finance-tracker", label: "Home" },
  { href: "/finance-tracker/transactions", label: "Transactions" },
  { href: "/finance-tracker/add-transaction", label: "Add" },
  { href: "/finance-tracker/statistics", label: "Statistics" },
  { href: "/finance-tracker/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScroll = window.scrollY;
      setShowNavbar(currentScroll < lastScrollY || currentScroll < 50);
      setLastScrollY(currentScroll);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow transition-transform duration-300",
        showNavbar ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo + Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/finance-tracker" className="font-bold text-xl">
            Finance Tracker
          </Link>
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 rounded-md hover:bg-blue-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop nav */}
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

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4">
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
            className="mt-2 w-full bg-white text-blue-600 hover:bg-gray-100"
            asChild
            onClick={() => setIsOpen(false)}
          >
            <Link href="/">🏠 Home Utama</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
