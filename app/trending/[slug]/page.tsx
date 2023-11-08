import { Metadata, ResolvingMetadata } from "next";
import Handler from "@/components/Handler/Handler";
import DetailTrending from "@/components/DetailPage/Trending";
import { MetaProps } from "@/helper";

async function getDetailTrending(slug: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending/detail/${slug}`,
    { cache: "no-store" }
  );
  return data.json()
}

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { trending } = await getDetailTrending(params.slug);
  const previousImages = (await parent)?.openGraph?.images || [];
  if(!trending) {
    return {
      ...Handler
    }
  }
    return {
      title: `${trending.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      openGraph: {
        images: [
          {
            url: trending.image,
            alt: trending.title,
          },
          ...previousImages,
        ],
        title: `${trending.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
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
        `topup game ${trending.title} online murah`,
        `topup game terpercaya hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        `topup ${trending.title}`,
        `beli diamond ${trending.title} murah`,
        `${process.env.NEXT_PUBLIC_SITE_NAME} topup games ${trending.title}`,
        `topup games ${trending.title}`,
        "topup pubg mobile",
        "topup free fire",
        "topup valorant",
        "topup game termurah",
        "game voucher",
        `game online ${trending.title}`,
        `games online ${trending.title}`,
        "Top Up dan Jual Voucher Game Termurah dan Lengkap",
        `Tempat Top up Game murah cepat dan terpercaya - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      ],
    };
}

export default async function page({ params }: { params: { slug: string } }) {
  const { trending } = await getDetailTrending(params.slug);
  if (!trending) {
    return <Handler title={params.slug} />;
  }
  return <DetailTrending slug={params.slug} />;
}