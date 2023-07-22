import type { Metadata } from 'next'
import MobileGamesDashboard from '@/components/Dashboard/Mobile/MobileDashboard'

export const metadata: Metadata = {
    title: `Mobile Games Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Mobile Games Dashboard Admin ReyinStore',
    manifest: "/manifest.json",
  }

function page() {
  return (
    <div>
      <MobileGamesDashboard />
    </div>
  )
}

export default page