"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CardsProps } from "@/helper";

export default function PcGames() {
  const { data, isLoading } = useQuery({
    queryKey: ["pcgames"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames`
      );
      return response.data;
    },
  });

  return (
    <section>
      <hr className="my-6 sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
      <h1 className="mb-3 font-semibold text-xl">● PC Games</h1>
      <Swiper
        modules={[FreeMode]}
        spaceBetween={8}
        grabCursor={true}
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 3.4,
          },
          700: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 10,
          },
        }}>
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <SwiperSlide key={index}>
                <Skeleton width="100%" height="200px" />
              </SwiperSlide>
            ))
          : data?.pcgames.map((item: CardsProps) => (
              <SwiperSlide key={item.id}>
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
      whileHover={{ scale: 1.1 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-110">
      <Link href={`/pc-games/${slug}`}>
        <div className="card w-auto rounded-lg shadow-md max-sm:h-44 md:h-52 lg:h-60">
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
