"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css/free-mode";
import "swiper/css";
import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";

async function getCarousel() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel`, {
    cache: "no-store",
  });
  return data.json();
}

export default function Carousel() {
  const [carousel, setCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  useEffect(() => {
    const fetchCarousel = async () => {
      const res = await getCarousel();
      setCarousel(res.carousel);
    };
    setIsLoading(false);
    fetchCarousel();
  }, []);

  return (
    <>
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
    ): (

      <Swiper
      modules={[Autoplay]}
        spaceBetween={3}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 1.4,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="rounded-lg shadow-2xl">
        {carousel.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible">
              <Image
                src={item?.image}
                width={500}
                height={500}
                alt=""
                priority={true}
                layout="responsive"
                objectFit="cover"
                />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
    </>
  );
}
