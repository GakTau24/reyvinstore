import type { Metadata } from "next";
import Trending from "@/components/HomePage/Trending";
import MobileGames from "@/components/HomePage/MobileGames";
import PcGames from "@/components/HomePage/PcGames";
import Apps from "@/components/HomePage/Apps";
import Carousel from "@/components/HomePage/Carousel";
import Voucher from "@/components/HomePage/Voucher";

export const metadata: Metadata = {
  title: `Topup Game | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description:
    "Top-up game online dengan harga murah dan proses cepat. Dapatkan bonus menarik saat membeli game online di Reyvin Store.",
  manifest: "/manifest.json",
  icons:
    "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?width=284&height=402",
  keywords: [
    "reyvin store",
    "reyvinstore",
    "topup reyvinsotre",
    "Top Up dan Jual Voucher Game Termurah dan Lengkap",
    `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    "topup games",
    "topup game",
    "topup game online murah",
    "beli diamond murah",
    "topup mobile legends",
    "topup pubg mobile",
    "topup free fire",
    "topup valorant",
    "topup game termurah",
    "game voucher",
    "game online",
  ],
  openGraph: {
    images: [
      {
        url: "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?width=284&height=402",
        alt: "Reyvin Store",
      },
    ],
  },
};

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
