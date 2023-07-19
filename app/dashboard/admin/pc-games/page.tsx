import type { Metadata } from 'next'
import PcGamesDashboard from '@/components/Dashboard/GamesPc/PcDashboard'

export const metadata: Metadata = {
    title: `Pc Games Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Pc Games Dashboard Admin ReyinStore',
  }

function page() {
  return (
    <div>
      <PcGamesDashboard />
    </div>
  )
}

export default page