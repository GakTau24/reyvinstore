import React, { useState } from "react";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSession, signOut, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const router = usePathname();
  const activeLink =
    "hover:bg-sky-400 hover:text-white px-3 py-2 mx-3 rounded-md text-sm font-medium bg-sky-400";
  const nonActiveLink =
    "hover:bg-sky-400 hover:text-white px-3 py-2 mx-3 rounded-md text-sm font-medium";
  const activeLinkDropdown =
    "hover:bg-sky-400 bg-sky-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium";
  const nonActiveLinkDropdown =
    "hover:bg-sky-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium";

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="shadow-xl rounded-b-lg">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}>
            <Link href={"/"}>
              <h1 className="lg:text-xl font-bold text-xl">
                Reyvin <span className="text-sky-400">Store</span>
              </h1>
            </Link>
          </motion.div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/"}
                  className={router === "/" ? activeLink : nonActiveLink}>
                  Home
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/contact"}
                  className={
                    router === "/contact" ? activeLink : nonActiveLink
                  }>
                  Contact
                </Link>
              </motion.div>
              {session.data ? (
                <div className="relative inline-block text-left">
                  <button
                    className="hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                    onClick={toggleDropdown}>
                    <div className="flex">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        onHoverStart={(e) => {}}
                        onHoverEnd={(e) => {}}>
                        {session.data.user?.name}
                        {""}
                      </motion.div>
                      <span>
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}>
                        <div className="origin-top-right z-10 absolute border border-slate-700 right-0 mt-2 w-48 rounded-md ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu">
                            <Link
                              href={"/dashboard/admin"}
                              onClick={closeDropdown}
                              className="block px-4 py-2 text-sm hover:bg-sky-400 hover:rounded hover:text-gray-900"
                              role="menuitem">
                              Dashboard
                            </Link>
                            <hr className="border-gray-900 opacity-30" />
                            <button
                              onClick={handleLogout}
                              className="block px-4 py-2 text-sm hover:bg-sky-400 hover:rounded hover:text-gray-900 w-full text-left"
                              role="menuitem">
                              Logout
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={(e) => {}}
                  onHoverEnd={(e) => {}}>
                  <button
                    className={
                      router === "/login/:path*" ? activeLink : nonActiveLink
                    }
                    onClick={() => signIn()}>
                    Login
                  </button>
                </motion.div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="hover:bg-sky-400 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              onClick={toggleDropdown}>
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href={"/"}
                  onClick={closeDropdown}
                  className={
                    router === "/" ? activeLinkDropdown : nonActiveLinkDropdown
                  }>
                  Home
                </Link>
                <Link
                  href={"/contact"}
                  onClick={closeDropdown}
                  className={
                    router === "/contact"
                      ? activeLinkDropdown
                      : nonActiveLinkDropdown
                  }>
                  Contact
                </Link>
              </div>
              <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
              {session.data ? (
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    href={"/dashboard/admin"}
                    onClick={closeDropdown}
                    className="hover:bg-sky-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-sky-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <button
                    className={
                      router === "/login/:path*"
                        ? activeLinkDropdown
                        : nonActiveLinkDropdown
                    }
                    onClick={() => signIn()}>
                    Login
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
