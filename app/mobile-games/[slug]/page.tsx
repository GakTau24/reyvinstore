import Image from "next/image";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {
  const slug = params.slug;
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mobilegames/${slug}`
  ).then((res) => res.json());
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: `${product.mobileGame.title} - Reyvin Store`,
    openGraph: {
      images: [
        {
          url: process.env.NEXT_PUBLIC_BASE_URL,
          alt: product.mobileGame.title,
        },
        product.mobileGame.image, ...previousImages,
      ],
      title: `${product.mobileGame.title} - Reyvin Store`,
      description: `Beli top-up game online dengan harga paling murah hanya di Reyvin Store! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${product.mobileGame.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Beli top-up game online dengan harga paling murah hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}! Dapatkan harga spesial untuk top-up game seperti Mobile Legends, PUBG Mobile, Free Fire, Valorant, dan game online lainnya. tersedia dengan harga ${product.mobileGame.price}. Pesan sekarang dan nikmati pengalaman bermain game online yang lebih menyenangkan.`,
    keywords: [
      'reyvin store',
      'reyvinstore',
      'top-up game online murah',
      'beli diamond murah',
      'topup mobile legends',
      'topup pubg mobile',
      'topup free fire',
      'topup valorant',
      'topup game termurah',
      'game voucher',
      'game online',
    ],
  };
}

async function getDetailMobile(slug: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mobilegames/${slug}`,
    { cache: "no-store" }
  );
  return data.json();
}

export default async function page({ params }: any) {
  const res = await getDetailMobile(params.slug);

  return (
    <div className="flex justify-center items-center py-3 shadow-xl">
      <div className="max-w-sm rounded-lg shadow-2xl">
        <Image
          className="rounded-t-lg"
          src={res.mobileGame.image}
          width="100"
          height="100"
          layout="responsive"
          objectFit="contain"
          alt={res.mobileGame.title}
        />
        <div className="p-3 text-center">
            <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-slate-300">
              {res.mobileGame.title}
            </h5>
          <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
          <h5 className="text-left font:bold text-lg dark:text-slate-300 py-3">
            Price List:
          </h5>
          <pre className="mb-3 font-normal text-left dark:text-slate-300">
            {res.mobileGame.price}
          </pre>
          <hr className="my-3 border-gray-700 sm:mx-auto dark:border-gray-300 lg:my-4 opacity-20" />
          <Link
            href={`https://wa.me/6285173125847`}
            className="inline-flex dark:text-slate-600 items-center px-4 py-3 text-sm font-medium text-center bg-lime-500 rounded-lg hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <BsWhatsapp /> <span className="px-[5px]">Pesan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
