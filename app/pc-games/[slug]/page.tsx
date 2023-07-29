import Image from "next/image";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { Metadata } from "next";
import Handler from "@/components/Handler/Handler";

async function getDetailMobile(slug: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames/detail/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {
  const { pcgames } = await getDetailMobile(params.slug);
  if(!pcgames) {
    return {
      ...Handler
    }
  }
  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `${pcgames.title} - Reyvin Store`,
    openGraph: {
      images: [
        {
          url: pcgames.image,
          alt: pcgames.title,
        },
        ...previousImages,
      ],
      title: `${pcgames.title} - Reyvin Store`,
      description: `Beli top-up game online dengan harga paling murah hanya di Reyvin Store! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${pcgames.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${pcgames.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
    robots: {
      index: false,
      follow: true,
      nocache: true,
    },
    manifest: "/manifest.json",
    keywords: [
      `${process.env.NEXT_PUBLIC_SITE_NAME}`,
      "reyvinstore",
      `topup game ${pcgames.title} online murah`,
      `topup game terpercaya hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      `topup ${pcgames.title}`,
      `${process.env.NEXT_PUBLIC_SITE_NAME} topup games ${pcgames.title}`,
      `beli diamond ${pcgames.title} murah`,
      `topup games ${pcgames.title}`,
      "topup pubg mobile",
      "topup free fire",
      "topup valorant",
      "topup game termurah",
      "game voucher",
      `game online ${pcgames.title}`,
      `games online ${pcgames.title}`,
    ],
  };
}

export default async function page({ params }: Props) {
  const { pcgames } = await getDetailMobile(params.slug);
  if(!pcgames) {
    return <Handler title={params.slug} />
  }
  
  return (
    <div className="flex justify-center items-center py-3">
      <div className="md:max-w-md max-sm:max-w-[375px] rounded-lg shadow-2xl">
        <Image
          className="rounded-md"
          src={pcgames.image}
          width="100"
          height="100"
          layout="responsive"
          objectFit="cover"
          alt={pcgames.title}
        />
        <div className="p-3 text-center">
            <h5 className="mb-2 text-xl font-bold tracking-tight">
              {pcgames.title}
            </h5>
          <hr className="my-3 border-black sm:mx-auto lg:my-4 opacity-20" />
          <h5 className="text-left font:bold text-lg py-3">
            Price List:
          </h5>
          <p className="whitespace-pre font-mono leading-6 mb-3 font-normal text-left">
            {pcgames.price}
          </p>
          <hr className="my-3 border-black sm:mx-auto lg:my-4 opacity-20" />
          <Link
            href={`https://wa.me/6285173125847`}
            className="inline-flex dark:text-slate-600 items-center px-4 py-3 text-sm font-medium text-center bg-lime-500 rounded-lg hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <BsWhatsapp /> <span className="px-[5px]">Pesan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}