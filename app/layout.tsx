"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavigationBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { motion } from "framer-motion";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode !== null) {
      setIsDarkMode(storedMode === "true");
    }
  }, []);

  const handleToggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${
          isDarkMode
            ? "bg-slate-200 text-slate-800"
            : "dark:bg-gradient-to-r from-slate-900 to-slate-500 dark:text-slate-300"
        }`}
      >
        <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </SessionProvider>

        <div>
        <motion.button
         whileHover={{ scale: 1.2 }}
         onHoverStart={(e) => {}}
         onHoverEnd={(e) => {}}
          onClick={handleToggleMode}
          className="fixed max-sm:bottom-10 md:bottom-4 right-4 p-5 rounded-full bg-sky-400 z-10"
          >
          {isDarkMode ? (
            <BsSun size={20} color="white" />
          ) : (
            <BsMoon size={20} color="black" />
          )}
          </motion.button>
        </div>
      </body>
    </html>
  );
}
