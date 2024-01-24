"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function Sidebar() {
  const router = usePathname();
  console.log(router);
  
  const activeLink = "block p-2 rounded hover:bg-yellow-500 bg-yellow-500 font-bold"; 
  const nonActiveLink = "block p-2 rounded";

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
                  className={router === "/dashboard/admin" ? activeLink : nonActiveLink}
                  >
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
                  className={router === "/dashboard/admin/carousel" ? activeLink : nonActiveLink}>
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
                  className={router === "/dashboard/admin/trending" ? activeLink : nonActiveLink}>
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
                  className={router === "/dashboard/admin/mobile-games" ? activeLink : nonActiveLink}>
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
                  className={router === "/dashboard/admin/pc-games" ? activeLink : nonActiveLink}>
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
                  className={router === "/dashboard/admin/apps" ? activeLink : nonActiveLink}>
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
                  className={router === "/dashboard/admin/voucher" ? activeLink : nonActiveLink}>
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
