"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css/effect-fade";
import "swiper/css";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CardsProps } from "@/helper";

export default function Carousel() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["carousel"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel`
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
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={3}
        loop={true}
        grabCursor={true}
        speed={1000}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          700: {
            slidesPerView: 1.2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="rounded-lg shadow-2xl">
        {data?.carousel.map((item: CardsProps, index: number) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible">
              {isFetching || isLoading ? (
                <Skeleton height={210} />
              ) : (
                <Image
                  src={item?.image}
                  width={500}
                  height={500}
                  alt=""
                  priority
                  layout="responsive"
                  objectFit="cover"
                />
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
