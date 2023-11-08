import type { Metadata } from 'next'
import EditFormMobileGames from '@/components/Dashboard/Mobile/EditFormMobilGames'
import { CardsProps } from '@/helper';

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Mobile Games | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    manifest: "/manifest.json",
  }

  const getMobileById = async (id: CardsProps) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mobilegames/${id}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch trending");
      }

      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

async function page({ params }: { params: { id: any } }) {
  const { id } = params;
  const { mobileGame } = await getMobileById(id);
  const { slug, title, image, price } = mobileGame;
  return (
    <>
      <EditFormMobileGames
        id={id}
        slug={slug}
        title={title}
        image={image}
        price={price}
      />
    </>
  );
}

export default page