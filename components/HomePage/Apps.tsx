"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css";
import { RotatingLines } from "react-loader-spinner";

type AppsItem = {
  slug: string;
  title: string;
  image: string;
};

type AppsProps = {
  voucher: AppsItem[];
};

export default function Apps() {
  const [apps, setApps] = useState<AppsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMobileGames = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apps`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error("Data not found!");
        }
        const data = await res.json();
        setApps(Array.isArray(data.apps) ? data.apps : []);
        setIsLoading(false);
      } catch (error) {
        console.log("Error loading Data:", error);
        setApps([]);
        setIsLoading(false);
      }
    };

    fetchMobileGames();
  }, []);

  return (
    <section>
      <hr className="my-3 sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
      <h1 className="mb-3 font-semibold text-xl">● Apps</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-10">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="54"
            visible={true}
          />
        </div>
      ) : (
        <Swiper
          spaceBetween={8}
          slidesPerView={3.5}
          grabCursor={true}
          freeMode={true}
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
          }}>
          {apps.map((item, index) => (
            <SwiperSlide key={index}>
              <Cards data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

type CardsProps = {
  data: AppsItem;
};

function Cards({ data }: CardsProps) {
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
    <div className="w-full rounded-lg shadow-xl lg:max-w-sm max-lg:h-[200px] md:h-[235px]">
      <Link href={`/apps/${slug}`}>
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
        <Link href={`/apps/${slug}`}>
          <h2 className="text-lg text-center font-medium tracking-tight">
            {title}
          </h2>
        </Link>
      </div>
    </div>
    </motion.div>
  );
}
