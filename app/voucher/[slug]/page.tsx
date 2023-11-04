import { Metadata, ResolvingMetadata } from "next";
import Handler from "@/components/Handler/Handler";
import DetailVoucher from "@/components/DetailPage/Voucher";
import { MetaProps } from "@/helper";

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

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { voucher } = await getDetailVoucher(params.slug);
  if(!voucher) {
    return {
      ...Handler
    }
  }
  const previousImages = (await parent)?.openGraph?.images || [];
    return {
      title: `${voucher.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      openGraph: {
        images: [
          {
            url: voucher.image,
            alt: voucher.title,
          },
          ...previousImages,
        ],
        title: `${voucher.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
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
        "Top Up dan Jual Voucher Game Termurah dan Lengkap",
      ],
    };

}

export default async function page({ params }: MetaProps) {
  const { voucher } = await getDetailVoucher(params.slug);
    if(!voucher) {
      return <Handler title={params.slug} />;
    }
  return (
    <DetailVoucher slug={params.slug} />
  );
}