"use client"
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';

async function getCarousel() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel`, { cache: 'no-store' });
  return data.json();
}

export default function Carousel() {
  const [carousel, setCarousel] = useState([]);

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
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
      >
        {carousel.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <Image src={item?.image} width={100} height={100} alt="" layout="responsive" objectFit="contain" />       
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}