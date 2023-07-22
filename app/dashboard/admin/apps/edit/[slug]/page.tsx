import type { Metadata } from 'next'
import EditFormApps from '@/components/Dashboard/Apps/EditFormApps'

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Apps | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  }

function page() {
  return (
    <>
        <EditFormApps />
    </>
  )
}

export default page