import Image from "next/image";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { Metadata } from "next";
import Handler from "@/components/Handler/Handler";

async function getDetailVoucher(slug: string) {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/voucher/detail/${slug}`,
      { cache: "no-store" }
    );
    return data.json();
  } catch (error) {
    return undefined;
  }
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {
  const { voucher } = await getDetailVoucher(params.slug);
  if(!voucher) {
    return {
      ...Handler
    }
  }
  const previousImages = (await parent)?.openGraph?.images || [];
    return {
      title: `${voucher.title} - Reyvin Store`,
      openGraph: {
        images: [
          {
            url: voucher.image,
            alt: voucher.title,
          },
          ...previousImages,
        ],
        title: `${voucher.title} - Reyvin Store`,
        description: `Beli top-up game online dengan harga paling murah hanya di Reyvin Store! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${voucher.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
        url: process.env.NEXT_PUBLIC_BASE_URL,
      },
      description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${voucher.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      robots: {
        index: false,
        follow: true,
        nocache: true,
      },
      manifest: "/manifest.json",
      icons: "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?width=284&height=402",
      keywords: [
        `${process.env.NEXT_PUBLIC_SITE_NAME}`,
        "reyvinstore",
        `topup game ${voucher.title} online murah`,
        `topup game terpercaya hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        `topup ${voucher.title}`,
        `beli diamond ${voucher.title} murah`,
        `${process.env.NEXT_PUBLIC_SITE_NAME} topup games ${voucher.title}`,
        "topup pubg mobile",
        "topup free fire",
        "topup valorant",
        "topup game termurah",
        `voucher ${voucher.title}`,
        `game online ${voucher.title}`,
      ],
    };

}

export default async function page({ params }: Props) {
  const { voucher } = await getDetailVoucher(params.slug);
    if(!voucher) {
      return <Handler title={params.slug} />;
    }
  return (
    <div className="flex justify-center items-center py-3">
      <div className="md:max-w-md max-sm:max-w-[375px] rounded-lg shadow-2xl">
        <Image
          className="rounded-md"
          src={voucher.image}
          width="100"
          height="100"
          layout="responsive"
          objectFit="cover"
          alt={voucher.title}
        />
        <div className="p-3 text-center">
          <h1 className="mb-2 text-xl font-bold tracking-tight">
            {voucher.title}
          </h1>
          <hr className="my-3 sm:mx-auto border-black lg:my-4 opacity-20" />
          <h2 className="text-left font:bold text-lg py-3">
            Price List:
          </h2>
          <p className="whitespace-pre font-mono leading-6 mb-3 font-normal text-left">
            {voucher.price}
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
}