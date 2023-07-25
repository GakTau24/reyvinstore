import type { Metadata } from 'next'
import EditFormApps from '@/components/Dashboard/Apps/EditFormApps'

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Apps | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    manifest: "/manifest.json",
  }

  const getTrendingById = async (id: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apps/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch trending");
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

async function page({ params }: any) {
  const { id } = params
  const { apps } = await getTrendingById(id)
  const { slug, title, image, price } = apps
  return (
    <>
        <EditFormApps  id={id} slug={slug} title={title} image={image} price={price} />
    </>
  )
}

export default page