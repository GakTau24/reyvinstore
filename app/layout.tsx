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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
            ? "bg-neutral-200 text-slate-800"
            : "bg-neutral-800 text-white"
        }`}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </SkeletonTheme>
          </QueryClientProvider>
        </SessionProvider>

        <div>
          <motion.button
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
            onClick={handleToggleMode}
            className="fixed opacity-70 hover:opacity-100 max-sm:bottom-10 md:bottom-4 right-4 p-5 rounded-full bg-yellow-500 z-10">
            {isDarkMode ? (
              <BsSun size={20} color="black" />
            ) : (
              <BsMoon size={20} color="white" />
            )}
          </motion.button>
        </div>
      </body>
    </html>
  );
}
