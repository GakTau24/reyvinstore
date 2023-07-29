"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css/effect-fade";
import "swiper/css";
import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";

async function getCarousel() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel`, {
    cache: "no-store",
  });
  return data.json();
}

type CarouselItem = {
  slug: string;
  title: string;
  image: string;
};

type CarouselProps = {
  trending: CarouselItem[];
};

export default function Carousel() {
  const [carousel, setCarousel] = useState<CarouselItem[]>([]);
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
      ) : (
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
          {carousel.map((item: CarouselItem, index: number) => (
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
                  priority
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
