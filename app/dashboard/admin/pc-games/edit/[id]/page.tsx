import type { Metadata } from "next";
import EditFormPcGames from "@/components/Dashboard/GamesPc/EditFormPcGames";
import { CardsProps } from "@/helper";

export const metadata: Metadata = {
  title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Dashboard Edit Pc Games | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  manifest: "/manifest.json",
};

const getPcGamesById = async (id: CardsProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames/${id}`,
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
  const { pcgames } = await getPcGamesById(id);
  const { slug, title, image, price } = pcgames;
  return (
    <>
      <EditFormPcGames
        id={id}
        slug={slug}
        title={title}
        image={image}
        price={price}
      />
    </>
  );
}

export default page;
