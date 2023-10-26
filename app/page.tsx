import type { Metadata } from "next";
import Trending from "@/components/HomePage/Trending";
import MobileGames from "@/components/HomePage/MobileGames";
import PcGames from "@/components/HomePage/PcGames";
import Apps from "@/components/HomePage/Apps";
import Carousel from "@/components/HomePage/Carousel";
import Voucher from "@/components/HomePage/Voucher";
import axios from "axios";

const getData = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reyvinstore`
  );
  return res.data;
};
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {
  const data = await getData();
  const title = data.map((game: any) => game.title);
  const keywords = title.map((title: string) => `topup games ${title}`);

  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `Topup Game | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: data.image,
          alt: data.title,
        },
        ...previousImages,
      ],
      title: `${data.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${data.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${data.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    manifest: "/manifest.json",
    icons:
      "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?width=284&height=402",
    keywords: [
      "reyvin store",
      "reyvinstore",
      "topup reyvinsotre",
      "Top Up dan Jual Voucher Game Termurah dan Lengkap",
      `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      ...title.map((title: string) => `games ${title}`),
      ...keywords,
      "topup game online murah",
      "beli diamond murah",
      "topup game termurah",
      ...title.map(
        (title: string) =>
          `${process.env.NEXT_PUBLIC_SITE_NAME} topup games ${title}`
      ),
    ],
  };
}

export default function Home() {
  return (
    <>
      <div className="mt-6 max-sm:p-3 md:px-3 bg-transparent">
        <Carousel />
      </div>
      <div className="p-5">
        <Trending />
        <MobileGames />
        <PcGames />
        <Apps />
        <Voucher />
      </div>
    </>
  );
}
