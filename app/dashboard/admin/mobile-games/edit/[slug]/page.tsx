import type { Metadata } from 'next'
import EditFormMobileGames from '@/components/Dashboard/Mobile/EditFormMobilGames'

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Mobile Games | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  }

function page() {
  return (
    <>
        <EditFormMobileGames />
    </>
  )
}

export default page