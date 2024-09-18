import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SearchBar } from "./components";



export const metadata: Metadata = {
  title: "Car App",
  description: "Discover the best cars in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative">
          <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
