"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="rounded-lg shadow-xl m-4 relative">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* <Link href="/" className="flex items-center mb-4 sm:mb-0"> */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
            >
              <div className="self-center text-2xl font-semibold whitespace-nowrap">
                <Link href={"/"}>
                <span>Reyvin</span><span className="text-sky-400">Store</span>{" "}
                </Link>
              </div>
            </motion.div>
          {/* </Link> */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href={"/"} className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={"/"} className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className="hover:underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href={"/"} className="hover:underline">
            Reyvin Store™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}