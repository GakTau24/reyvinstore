import Image from "next/image";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {
  const slug = params.slug;
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending/${slug}`
  ).then((res) => res.json());
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: `${product.trending.title} - Reyvin Store`,
    openGraph: {
      images: [
        {
          url: product.trending.image,
          alt: product.trending.title,
        },
        ...previousImages,
      ],
      title: `${product.trending.title} - Reyvin Store`,
      description: `Beli top-up game online dengan harga paling murah hanya di Reyvin Store! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${product.trending.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${product.trending.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
    manifest: "/manifest.json",
    keywords: [
      'reyvin store',
      'reyvinstore',
      `top-up game ${product.trending.title} online murah`,
      `beli diamond ${product.trending.title} murah`,
      `topup games ${product.trending.title}`,
      'topup pubg mobile',
      'topup free fire',
      'topup valorant',
      'topup game termurah',
      'game voucher',
      `game online ${product.trending.title}`,
    ],
  };
}

async function getDetailTrending(slug: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
}

export default async function page({ params }: any) {
  const res = await getDetailTrending(params.slug);
  return (
    <div className="flex justify-center items-center py-3 shadow-xl">
      <div className="max-w-sm rounded-lg shadow-2xl">
        <Image
          className="rounded-t-lg"
          src={res.trending.image}
          width="100"
          height="100"
          layout="responsive"
          objectFit="cover"
          alt={res.trending.title}
        />
        <div className="p-3 text-center">
          <h1 className="mb-2 text-xl font-bold tracking-tight">
            {res.trending.title}
          </h1>
          <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
          <h2 className="text-left font:bold text-lg py-3">
            Price List:
          </h2>
          <p className="whitespace-pre font-mono leading-6 mb-3 font-normal text-left ">
            {res.trending.price}
          </p>
          <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
          <Link
            href="https://wa.me/6285173125847"
            className="inline-flex dark:text-slate-600 items-center px-4 py-3 text-sm font-medium text-center bg-lime-500 rounded-lg hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <BsWhatsapp /> <span className="px-[5px]">Pesan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
