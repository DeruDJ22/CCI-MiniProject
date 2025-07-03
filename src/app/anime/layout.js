import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wishlist Anime",
  description: "Aplikasi untuk mencatat wishlist anime yang ingin ditonton."
};

export default function LayoutWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}

