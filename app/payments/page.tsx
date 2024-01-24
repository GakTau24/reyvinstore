import Payment from "@/components/Payments/Payment"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Payments | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: "Payments Page ReyinStore",
    manifest: "/manifest.json",
  };

const page = () => {
  return (
    <>
    <Payment />
    </>
  )
}

export default page