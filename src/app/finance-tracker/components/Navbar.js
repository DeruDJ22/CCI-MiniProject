"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/finance-tracker", label: "Home" },
  { href: "/finance-tracker/transactions", label: "Transactions" },
  { href: "/finance-tracker/add-transaction", label: "Add" },
  { href: "/finance-tracker/statistics", label: "Statistics" },
  { href: "/finance-tracker/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Menu Link */}
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "hover:underline",
                  pathname === link.href ? "font-semibold underline" : ""
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol Balik ke Home Utama */}
        <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
          <Link href="/">🏠 Home Utama</Link>
        </Button>
      </div>
    </nav>
  );
}
