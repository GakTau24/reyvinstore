import type { Metadata } from 'next'
import EditTrendingDashboard from '@/components/Dashboard/Trending/EditFormTrending'

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Trending | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    manifest: "/manifest.json",
  }

function page() {
  return (
    <>
        <EditTrendingDashboard />
    </>
  )
}

export default page