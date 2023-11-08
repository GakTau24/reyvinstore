import type { Metadata } from "next";
import EditTrendingDashboard from "@/components/Dashboard/Trending/EditFormTrending";
import { CardsProps } from "@/helper";

export const metadata: Metadata = {
  title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Dashboard Edit Trending | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  manifest: "/manifest.json",
};

const getTrendingById = async (id: CardsProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending/${id}`,
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
  const { trending } = await getTrendingById(id);
  const { slug, title, image, price } = trending;
  return (
    <>
      <EditTrendingDashboard
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
