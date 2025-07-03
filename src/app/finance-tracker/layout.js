import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Finance Tracker",
  description: "Aplikasi Pelacakan Keuangan Sederhana",
};

export default function RootLayout({ children }) {
  return (
      <div className="bg-gray-50">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">{children}</main>
        <Toaster richColors position="top-right" />
      </div>
  );
}
