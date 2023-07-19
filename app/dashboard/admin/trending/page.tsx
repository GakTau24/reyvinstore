import type { Metadata } from 'next'
import TrendingDashboard from "@/components/Dashboard/Trending/TrendingDashboard"

export const metadata: Metadata = {
    title: `Trending Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Trending Dashboard Admin ReyinStore',
  }

function page() {
  return (
    <>
        <TrendingDashboard />
    </>
  )
}

export default page