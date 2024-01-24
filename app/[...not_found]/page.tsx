"use client"
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { usePathname, useParams } from "next/navigation"

type Params = {
  not_found: string
}

export const metadata: Metadata = {
  title: `404 Not found - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  manifest: "/manifest.json",
};

export default function NotFoundCatchAll() {
  const params: any = useParams()

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <div className="max-w-md mx-auto text-center items-center justify-center">
        <div className="flex items-center justify-center">
          <Image src={"/assets/404.gif"} width={100} height={100} alt="" />
        </div>
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">
          <p>Oops!</p>
          <span className="text-yellow-500">{params.not_found}{" "}</span>Halaman tidak ditemukan
        </h2>
        <p className="mb-6">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Pastikan URL
          yang Anda masukkan benar.
        </p>
        <Link
          href={"/"}
          className="inline-block bg-yellow-500 py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out">
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}
