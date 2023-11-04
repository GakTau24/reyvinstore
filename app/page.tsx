import type { Metadata, ResolvingMetadata } from "next";
import Trending from "@/components/HomePage/Trending";
import MobileGames from "@/components/HomePage/MobileGames";
import PcGames from "@/components/HomePage/PcGames";
import Apps from "@/components/HomePage/Apps";
import Carousel from "@/components/HomePage/Carousel";
import Voucher from "@/components/HomePage/Voucher";
import { CardsProps, MetaProps } from "@/helper";

const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/reyvinstore`
  );
  return res.json();
};

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getData();
  const title = data.map((game: CardsProps) => game.title);
  const keywords = title.map((title: string) => `topup games ${title}`);

  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `Topup Game | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?ex=6550c9c1&is=653e54c1&hm=23bb7b73327019d5a82078b30b4e0d2bb66c28e6caaecc57d2cffacdab601240&=&width=268&height=379",
          alt: "Reyvin Store",
        },
        ...previousImages,
      ],
      title: `Topup Game - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga murah. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga murah. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
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
