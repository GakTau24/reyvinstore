import { CardsProps, MetaProps } from "@/helper";
import { Metadata, ResolvingMetadata } from "next";
import Handler from "@/components/Handler/Handler";
import DetailPcGames from "@/components/DetailPage/PcGames";

async function getDetailMobile(slug: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames/detail/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
}

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { pcgames } = await getDetailMobile(params.slug);
  if (!pcgames) {
    return {
      ...Handler,
    };
  }
  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `${pcgames.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: pcgames.image,
          alt: pcgames.title,
        },
        ...previousImages,
      ],
      title: `${pcgames.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga murah. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga mura. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
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
      "Top Up dan Jual Voucher Game Termurah dan Lengkap",
      `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    ],
  };
}

export default async function page({ params }: MetaProps) {
  const { pcgames } = await getDetailMobile(params.slug);
  if (!pcgames) {
    return <Handler title={params.slug} />;
  }

  return <DetailPcGames slug={params.slug} />;
}
