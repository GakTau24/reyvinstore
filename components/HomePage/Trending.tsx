"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { CardsProps } from "@/helper";

const Trending = () => {
  const { data, isLoading, isFetching } = useQuery({
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
    <>
    {isLoading ? null :
      <h1 className="mb-3 font-bold md:text-center md:text-2xl max-sm:text-xl">
        Trending
      </h1>
    }
      <div className="flex flex-col justify-center items-center p-4 mx-auto">
        <div className="grid grid-cols-1 max-sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-sm:gap-[10px]">
          {data &&
            data.trending.map((item: CardsProps) => {
              return (
                <div key={item.id}>
                  <Link href={`/trending/${item.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      onHoverStart={(e) => {}}
                      onHoverEnd={(e) => {}}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-110 rounded-xl shadow-xl">
                      {isLoading || isFetching || !item ? (
                        <>
                          <Skeleton height={210} />
                        </>
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          objectFit="cover"
                          priority
                          className="rounded-md lg:h-[10rem] max-sm:h-[5.5rem] md:h-40 w-full"
                        />
                      )}
                      <div className="py-3">
                        {!data || isLoading || isFetching ? (
                          <Skeleton height={20} />
                        ) : (
                          <h1 className="md:text-md max-md:text-sm max-md:font-semibold max-md:font-sans text-center">
                            {item.title}
                          </h1>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Trending;
