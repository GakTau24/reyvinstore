"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavigationBar/Navbar";
import Footer from "@/components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";

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
        className={
          isDarkMode
            ? " bg-slate-200 text-slate-800"
            : "dark:bg-gradient-to-r from-slate-900 to-slate-500 dark:text-slate-300"
        }>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
        <Footer />
        <button
          onClick={handleToggleMode}
          className="fixed max-sm:bottom-10 md:bottom-4 right-4 p-5 rounded-full bg-sky-400">
          {isDarkMode ? (
            <BsSun size={20} color="white" />
          ) : (
            <BsMoon size={20} color="black" />
          )}
        </button>
      </body>
    </html>
  );
}
