"use client";
import Link from "next/link";
import { motion } from "framer-motion";

function Sidebar() {
  return (
    <>
      <div className="w-[10rem]">
        <div className="p-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}>
            <h1 className="text-xl font-bold mb-4">
              Reyvin <span className="text-sky-400">Store</span>
            </h1>
          </motion.div>
          <hr className="my-3 sm:mx-auto border-gray-500 lg:my-4 opacity-20" />
          <ul className="space-y-2">
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin"}
                  className="block p-2 rounded hover:bg-gray-700">
                  Home
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/carousel"}
                  className="block p-2 rounded hover:bg-gray-700">
                  Carousel
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/trending"}
                  className="block p-2 rounded hover:bg-gray-700">
                  Trending
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/mobile-games"}
                  className="block p-2 rounded hover:bg-gray-700">
                  Mobile Games
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/pc-games"}
                  className="block p-2 rounded hover:bg-gray-700">
                  PC Games
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/apps"}
                  className="block p-2 rounded hover:bg-gray-700">
                  Apps
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}>
                <Link
                  href={"/dashboard/admin/voucher"}
                  className="block p-2 rounded hover:bg-gray-700">
                  Voucher
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
