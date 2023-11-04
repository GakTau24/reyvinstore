import { Metadata } from "next";
import Handler from "@/components/Handler/Handler";
import DetailApps from "@/components/DetailPage/Apps";

async function getDetailApps(slug: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/apps/detail/${slug}`,
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
  const { apps } = await getDetailApps(params.slug);
  if(!apps) {
    return {
      ...Handler
    }
  }
  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `${apps.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: apps.image,
          alt: apps.title,
        },
        ...previousImages,
      ],
      title: `${apps.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
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
    icons: "/reyvinstore.png",
    keywords: [
      `${process.env.NEXT_PUBLIC_SITE_NAME}`,
      "reyvinstore",
      `top-up game ${apps.title} online murah`,
      `topup game terpercaya hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      `topup ${apps.title}`,
      `${process.env.NEXT_PUBLIC_SITE_NAME} topup games ${apps.title}`,
      `beli diamond ${apps.title} murah`,
      `topup games ${apps.title}`,
      "topup pubg mobile",
      "topup free fire",
      "topup valorant",
      "topup game termurah",
      "game voucher",
      `game online ${apps.title}`,
      `games online ${apps.title}`,
      "Top Up dan Jual Voucher Game Termurah dan Lengkap",
      `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    ],
  };
}

export default async function page({ params }: Props) {
  const { apps } = await getDetailApps(params.slug);
  if(!apps) {
    return <Handler title={params.slug} />
  }
  return (
    <DetailApps slug={params.slug} />
  );
}