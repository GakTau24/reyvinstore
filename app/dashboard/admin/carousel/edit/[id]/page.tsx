import { Metadata } from "next";
import EditFormCarousel from "@/components/Dashboard/Carousel/EditFormCarousel";

export const metadata: Metadata = {
  title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Dashboard Edit Carousel | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  manifest: "/manifest.json",
};

const getCarouselById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel/${id}`,
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

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { carousel } = await getCarouselById(id);
  const { image } = carousel;
  return (
    <>
      <EditFormCarousel id={id} image={image} />
    </>
  );
}

export default page;
