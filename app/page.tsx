import type { Metadata } from "next";
import Trending from "@/components/HomePage/Trending";
import MobileGames from "@/components/HomePage/MobileGames";
import PcGames from "@/components/HomePage/PcGames";
import Apps from "@/components/HomePage/Apps";
import Carousel from "@/components/HomePage/Carousel";

export const metadata: Metadata = {
  title: `Topup Games - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: 'Top-up game online dengan harga murah dan proses cepat. Dapatkan bonus menarik saat membeli game online di Reyvin Store.',
  keywords: [
    'top-up game online',
    'beli diamond murah',
    'topup mobile legends',
    'topup pubg mobile',
    'topup free fire',
    'topup valorant',
    'topup game termurah',
    'game voucher',
    'game online',
  ],
  openGraph: {
    images: [
      {
        url: 'https://media.discordapp.net/attachments/987438938966872186/1107444191669272666/IMG_20230515_060654.jpg?width=426&height=402',
        alt: 'Logo Reyvin Store',
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <div className="p-3 md:mt-10 lg:mt-10">
      </div>
      <div className="p-5 shadow-xl">
        <div className="dark:bg-slate-900 rounded-xl">
        <Carousel />
        </div>
        <Trending />
        <MobileGames />
        <PcGames />
        <Apps />
      </div>
    </>
  );
}
