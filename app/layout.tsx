"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/NavigationBar/Navbar'
import Footer from '@/components/Footer/Footer'
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gradient-to-r from-slate-900 to-slate-500 dark:text-slate-300">
          <SessionProvider>
          <Navbar />
          </SessionProvider>
          {children}
          <Footer />
      </body>
    </html>
  )
}
