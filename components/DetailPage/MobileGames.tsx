"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DetailProps } from "@/helper";

const DetailMobileGames = ({ slug }: DetailProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["detailMobileGames"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mobilegames/detail/${slug}`
      );
      return response.data;
    },
  });

  return (
    <div className="flex justify-center items-center py-3">
      <div className="md:max-w-md max-sm:max-w-[375px] rounded-lg shadow-2xl">
        {isLoading ? (
          <Skeleton height={300} width={400} />
        ) : (
          <Image
            className="rounded-md"
            src={data?.mobileGame?.image}
            width="100"
            height="100"
            layout="responsive"
            objectFit="cover"
            alt={data?.mobileGame?.title}
          />
        )}
        <div className="p-3 text-center">
          <h1 className="mb-2 text-xl font-bold tracking-tight">
            {isLoading ? <Skeleton /> : data?.mobileGame?.title}
          </h1>
          <hr className="my-3 border-black sm:mx-auto lg:my-4 opacity-20" />
          <h1 className="text-left font:bold text-lg py-3">Price List:</h1>
          <p className="whitespace-pre-line font-mono leading-6 mb-3 font-normal text-left">
            {isLoading ? <Skeleton height={30} /> : data?.mobileGame?.price}
          </p>
          <hr className="my-3 border-black sm:mx-auto lg:my-4 opacity-20" />
          <Link
            href="https://wa.me/6285173125847"
            className="inline-flex dark:text-slate-600 items-center px-4 py-3 text-sm font-medium text-center bg-lime-500 rounded-lg hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <BsWhatsapp /> <span className="px-[5px]">Pesan</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailMobileGames;
