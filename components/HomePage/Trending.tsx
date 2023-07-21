"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
      <Swiper
        spaceBetween={8}
        slidesPerView={3}
        grabCursor={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 10,
          },
          1024: {
            slidesPerView: 10,
          },
          1280: {
            slidesPerView: 10,
          },
        }}
      >
        {trending.map((item, index) => (
          <SwiperSlide key={index}>
            <Cards data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Cards({ data }: any) {
  const { slug, title, image } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      variants={containerVariants} initial="hidden" animate="visible"
      >
      <div className="w-full rounded-lg shadow-xl lg:max-w-sm max-lg:h-[200px]">
        <Link href={`/trending/${slug}`}>
          <Image
            className="rounded-lg"
            src={image}
            width="100"
            height="100"
            layout="responsive"
            objectFit="contain"
            alt={title}
            loading="lazy"
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
