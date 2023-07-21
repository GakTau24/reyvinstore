"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { motion } from "framer-motion";

async function getCarousel() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel`, {
    cache: "no-store",
  });
  return data.json();
}

export default function Carousel() {
  const [carousel, setCarousel] = useState([]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  useEffect(() => {
    const fetchCarousel = async () => {
      const res = await getCarousel();
      setCarousel(res.carousel);
    };

    fetchCarousel();
  }, []);

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={3}
        slidesPerView={3}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
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
    </>
  );
}
