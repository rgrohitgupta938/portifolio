import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Rohit Gupta Portfolio",
  description: "AI Engineer, Data Scientist, and GenAI Builder portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        {children}
        <Footer />
        <Toaster position="top-right" richColors theme="dark" closeButton />
      </body>
    </html>
  );
}
