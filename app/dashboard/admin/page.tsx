import type { Metadata } from 'next'
import Dashboard from "@/components/Dashboard/Dashboard"

export const metadata: Metadata = {
  title: `Home Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: 'Home Dashboard Admin ReyinStore',
  manifest: "/manifest.json",
}

function page() {
  return (
    <>
        <Dashboard />
    </>
  )
}

export default page