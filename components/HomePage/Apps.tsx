"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Apps() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchMobileGames = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apps`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error("Data not found!");
        }
        const data = await res.json();
        setApps(Array.isArray(data.apps) ? data.apps : []);
      } catch (error) {
        console.log("Error loading Data:", error);
        setApps([]);
      }
    };

    fetchMobileGames();
  }, []);

  return (
    <section>
      <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
      <h1 className="mb-3 font-semibold text-xl">● Apps</h1>
      <Swiper
        spaceBetween={8}
        grabCursor={true}
        slidesPerView={3}
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
        {apps.map((item, index) => (
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
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}>
    <div className="w-full rounded-lg shadow-xl lg:max-w-sm max-lg:h-[200px]">
      <Link href={`/apps/${slug}`}>
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
        <Link href={`/apps/${slug}`}>
          <h4 className="text-lg text-center font-medium tracking-tight text-slate-800 dark:text-slate-300">
            {title}
          </h4>
        </Link>
      </div>
    </div>
    </motion.div>
  );
}
