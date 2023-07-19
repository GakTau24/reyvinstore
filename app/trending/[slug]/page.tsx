"use client"
import Image from 'next/image';
import Link from 'next/link';
import { BsWhatsapp } from 'react-icons/bs';
import { motion } from "framer-motion";

async function getDetailTrending(slug: string) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trending/${slug}`, {cache: "no-store"});
  return data.json();
}

export default async function page({ params, searchParams  }: any) {
  const res = await getDetailTrending(params.slug);
  return (
    <div className="flex justify-center items-center py-3 shadow-xl">
      <div className="max-w-sm rounded-lg shadow">
        <Image
          className="rounded-t-lg"
          src={res.trending.image}
          width="100"
          height="100"
          layout="responsive"
          objectFit="contain"
          alt={res.trending.title}
        />
        <div className="p-3 text-center">
          <Link href={`https://wa.me/6285173125847`}>
            <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-slate-300">{res.trending.title}</h5>
          </Link>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4 opacity-20" />
          <h5 className="text-left font:bold text-lg dark:text-slate-300 py-3">Price List:</h5>
          <pre className="mb-3 font-normal text-left dark:text-slate-300">{res.trending.price}</pre>
          <motion.div
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}>
          <Link href={`https://wa.me/6285173125847`} className="inline-flex dark:text-slate-600 items-center px-4 py-3 text-sm font-medium text-center bg-lime-500 rounded-lg hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <BsWhatsapp /> <span className="px-[5px]">Pesan</span>
          </Link>
            </motion.div>
        </div>
      </div>
    </div>
  );
}