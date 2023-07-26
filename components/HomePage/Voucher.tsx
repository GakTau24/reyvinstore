"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import { RotatingLines } from "react-loader-spinner";

type VoucherItem = {
  slug: string;
  title: string;
  image: string;
};

type VoucherProps = {
  voucher: VoucherItem[];
};

export default function Voucher() {
  const [voucher, setVoucher] = useState<VoucherItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/voucher`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error("Data not found!");
        }
        const data = await res.json();
        setVoucher(Array.isArray(data.voucher) ? data.voucher : []);
        setIsLoading(false);
      } catch (error) {
        console.log("Error loading Data:", error);
        setVoucher([]);
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section>
      <hr className="my-6 sm:mx-auto border-gray-500 lg:my-4 opacity-30" />
      <h1 className="mb-3 font-semibold text-xl">● Voucher</h1>
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
          {voucher.map((item, index) => (
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
  data: VoucherItem;
};

function Cards({ data }: CardsProps) {
  const { slug, title, image } = data;
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}>
      <div className="w-full rounded-lg shadow-xl lg:max-w-sm max-lg:h-[200px] md:h-[235px]">
        <Link href={`/voucher/${slug}`}>
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
          <Link href={`/voucher/${slug}`}>
            <h2 className="text-lg text-center font-medium tracking-tight">
              {title}
            </h2>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
