"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { CardsProps } from "@/helper";

const Trending = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending`
      );
      return response.data;
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  

  return (
    <div className="p-4 mx-auto">
      <hr className="sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
      {isLoading ? null : (
        <h1 className="mb-3 font-bold md:text-center text-2xl">
          Trending
        </h1>
      )}
      <div className="flex flex-col justify-center items-center">
        <div className="grid sm:grid-cols-3 max-sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-3 max-sm:gap-2.5 md:gap-2.5 md:w-2/3 lg:w-1/2 max-sm:w-full">
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <div key={index}>
                  <Skeleton width="100%" className="md:h-40 max-sm:h-28" />
                </div>
              ))
            : data?.trending?.map((item: CardsProps) => (
                <div key={item.id}>
                  <Link href={`/trending/${item.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      onHoverStart={(e) => {}}
                      onHoverEnd={(e) => {}}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-110 rounded-xl shadow-xl lg:h-48 md:h-52">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={800}
                        objectFit="cover"
                        priority
                        className="rounded-md lg:h-[120px] max-sm:h-[5.5rem] md:h-28 w-full"
                      />
                      <div className="py-3">
                        <h1 className="md:text-md max-md:text-sm max-md:font-semibold max-md:font-sans text-center">
                          {item.title}
                        </h1>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
