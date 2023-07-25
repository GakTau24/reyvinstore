import type { Metadata } from 'next'
import EditFormVoucher from '@/components/Dashboard/Voucher/EditFormVoucher'

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Voucher | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    manifest: "/manifest.json",
  }

  const getVoucherById = async (id: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/voucher/${id}`, {
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

async function page({params}: any) {
  const { id } = params
  const { voucher } = await getVoucherById(id)
  const { slug, title, image, price } = voucher
  return (
    <>
        <EditFormVoucher  id={id} slug={slug} title={title} image={image} price={price} />
    </>
  )
}

export default page