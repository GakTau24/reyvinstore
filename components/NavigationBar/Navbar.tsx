import React, { useState } from "react";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSession, signOut, signIn } from "next-auth/react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="dark:bg-gray-800 shadow-xl rounded-b-lg">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
      <motion.div
          whileHover={{ scale: 1.2 }}
          onHoverStart={e => {}}
          onHoverEnd={e => {}}
        >
          <Link href={"/"}>
            <h1 className="lg:text-xl dark:text-white text-slate-700 font-bold">
              Reyvin <span className="text-sky-400">Store</span>
            </h1>
          </Link>
          </motion.div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center">
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => {}}
              onHoverEnd={e => {}}
            >
              <Link
                href={"/"}
                className="dark:text-gray-300 text-slate-700 dark:hover:bg-gray-700 hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              onHoverStart={e => {}}
              onHoverEnd={e => {}}
            >
              <Link
                href={"/contact"}
                className="dark:text-gray-300 text-slate-700 dark:hover:bg-gray-700 hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
              </motion.div>
              {session.data ? (
                <div className="relative inline-block text-left">
                  <button
                    className="dark:text-gray-300 text-slate-700 dark:hover:bg-gray-700 hover:bg-sky-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    <div className="flex">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      onHoverStart={e => {}}
                      onHoverEnd={e => {}}
                    >
                      {/* Settings{" "} */}
                      {session.data.user?.name}{""}
                      </motion.div>
                      <span>
                        <IoMdArrowDropdown />
                      </span>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl-lg bg-slate-200 dark:bg-slate-800 ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link
                          href={"/dashboard/admin"}
                          className="block px-4 py-2 text-sm dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-sky-400 hover:text-gray-900"
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-sky-400 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // <Link
                //   href={"/login"}
                //   className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                // >
                //   Login
                // </Link>
                <button className="" onClick={() => signIn()}>
                Login
              </button>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              onClick={toggleDropdown}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
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
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={"/"}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href={"/contact"}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
          <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
          {session.data ? (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href={"/dashboard/admin"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={"/login"}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              login
            </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
