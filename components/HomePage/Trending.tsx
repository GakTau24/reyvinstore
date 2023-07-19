"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error("Data not found!");
        }
        const data = await res.json();
        setTrending(Array.isArray(data.trending) ? data.trending : []);
      } catch (error) {
        console.log("Error loading Data:", error);
        setTrending([]);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section>
      <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
      <h1 className="mb-3 font-semibold text-xl">● Trending</h1>
      <div className="grid grid-cols-10 max-md:grid-cols-3 md:p-3 gap-3 px-2 max-md:px-[5px] my-5">
        {trending.map((item, index) => (
          <Cards data={item} key={index} />
        ))}
      </div>
    </section>
  );
}

function Cards({ data }: any) {
  const { slug, title, image } = data;
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}>
      <div className="w-full rounded-lg shadow-xl lg:max-w-sm">
        <Link href={`/trending/${slug}`}>
          <Image
            className="rounded-lg"
            src={image}
            width="100"
            height="100"
            layout="responsive"
            objectFit="contain"
            alt={title}
          />
        </Link>
        <div className="md:p-3 max-md:py-2">
          <Link href={`/trending/${slug}`}>
            <h4 className="text-lg text-center font-medium tracking-tight text-slate-800 dark:text-slate-300">
              {title}
            </h4>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
