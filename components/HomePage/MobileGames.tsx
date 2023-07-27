"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { RotatingLines } from "react-loader-spinner";

type MobileItem = {
  slug: string;
  title: string;
  image: string;
};

type VoucherProps = {
  voucher: MobileItem[];
};

export default function MobileGames() {
  const [mobileGames, setMobileGames] = useState<MobileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMobileGames = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/mobilegames`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error("Data not found!");
        }
        const data = await res.json();
        setMobileGames(Array.isArray(data.mobileGames) ? data.mobileGames : []);
        setIsLoading(false);
      } catch (error) {
        console.log("Error loading Data:", error);
        setMobileGames([]);
        setIsLoading(false);
      }
    };

    fetchMobileGames();
  }, []);

  return (
    <section>
      <hr className="my-6 sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
      <h1 className="mb-3 font-semibold text-xl">● Mobile Games</h1>
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
          modules={[FreeMode]}
          spaceBetween={8}
          grabCursor={true}
          freeMode={true}
          breakpoints={{
            300: {
              slidesPerView: 3.4,
            },
            768: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 10,
            },
          }}>
          {mobileGames.map((item, index) => (
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
  data: MobileItem;
};

function Cards({ data }: CardsProps) {
  const { slug, title, image } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <Link href={`/mobile-games/${slug}`}>
        <div className="w-auto rounded-lg shadow-xl max-sm:h-44 md:h-52 lg:h-56">
          <Image
            className="rounded-lg"
            src={image}
            width={100}
            height={100}
            layout="responsive"
            objectFit="contain"
            alt={title}
            loading="lazy"
          />
          <div className="md:p-3 max-md:py-2">
            <h1 className="md:text-md max-md:text-sm max-md:font-semibold max-md:font-sans text-center">
              {title}
            </h1>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
