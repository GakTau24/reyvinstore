import type { Metadata } from 'next'
import EditFormPcGames from '@/components/Dashboard/GamesPc/EditFormPcGames'

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Pc Games | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  }

function page() {
  return (
    <>
        <EditFormPcGames />
    </>
  )
}

export default page