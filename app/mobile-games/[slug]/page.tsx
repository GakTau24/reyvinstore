import { Metadata } from "next";
import Handler from "@/components/Handler/Handler";
import DetailMobileGames from "@/components/DetailPage/MobileGames";

async function getDetailMobile(slug: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mobilegames/detail/${slug}`,
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
  const { mobileGame } = await getDetailMobile(params.slug);
  if(!mobileGame) {
    return {
      ...Handler
    }
  }
  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `${mobileGame.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: mobileGame.image,
          alt: mobileGame.title,
        },
        ...previousImages,
      ],
      title: `${mobileGame.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${mobileGame.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${mobileGame.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    manifest: "/manifest.json",
    icons: "/reyvinstore.png",
    keywords: [
      `${process.env.NEXT_PUBLIC_SITE_NAME}`,
      "reyvinstore",
      `top-up game ${mobileGame.title} online murah`,
      `topup game terpercaya hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      `topup ${mobileGame.title}`,
      `${process.env.NEXT_PUBLIC_SITE_NAME} topup games ${mobileGame.title}`,
      `beli diamond ${mobileGame.title} murah`,
      `topup games ${mobileGame.title}`,
      "topup pubg mobile",
      "topup free fire",
      "topup valorant",
      "topup game termurah",
      `game online ${mobileGame.title}`,
      `games online ${mobileGame.title}`,
      "Top Up dan Jual Voucher Game Termurah dan Lengkap",
      `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    ],
  };
}

export default async function page({ params }: Props) {
  const { mobileGame } = await getDetailMobile(params.slug);
  if(!mobileGame) {
    return <Handler title={params.slug} />
  }

  return (
    <DetailMobileGames slug={params.slug} />
  );
}