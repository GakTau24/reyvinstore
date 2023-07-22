import { Metadata } from "next";
import Contact from "@/components/Contact/Contact";

export const metadata: Metadata = {
  title: `Contact - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: "Contact Page ReyinStore",
  manifest: "/manifest.json",
};

export default function page() {
  
  return (
    <>
    <Contact />
    </>
  );
}
