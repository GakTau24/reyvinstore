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
import { generateApiKey } from "@/handler/header";

const API_KEY = generateApiKey()

export default function Apps() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["apps"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/apps`,
        {
          headers: {
            'api-key': `${API_KEY}`
          }
        }
      );
      return response.data;
    },
  });

  return (
    <section>
      <hr className="my-3 sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
      <h1 className="mb-3 font-semibold text-xl">● Apps</h1>
      <Swiper
        modules={[FreeMode]}
        // spaceBetween={8}
        grabCursor={true}
        freeMode={true}
        breakpoints={{
          300: {
            slidesPerView: 3.4,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 10,
            spaceBetween: 15,
          },
        }}>
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <SwiperSlide key={index}>
                <Skeleton width="100%" className="md:h-40 max-sm:h-28" />
              </SwiperSlide>
            ))
          : data?.apps.map((item: CardsProps) => (
              <SwiperSlide key={item.id}>
                <Cards data={item} />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
}

interface DataProps {
  data: {
    slug: string;
    title: string;
    image: string;
  };
}

function Cards({ data }: DataProps) {
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
      className="rounded-lg bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-110 border border-yellow-500">
      <Link href={`/apps/${slug}`}>
        <div className="rounded-lg shadow-md max-sm:h-44 sm:h-60 md:h-52">
          <Image
            className="rounded-lg w-full max-w-sm lg:h-[120px] md:h-24"
            src={image}
            width={700}
            height={700}
            objectFit="cover"
            alt={title}
            quality={100}
            priority
          />
          <div className="md:p-3 max-md:py-2">
            <h1 className="md:text-md max-md:text-xs max-md:font-semibold max-md:font-sans text-center">
              {title}
            </h1>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
