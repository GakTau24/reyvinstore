import type { Metadata } from 'next'
import AppsDashboard from '@/components/Dashboard/Apps/AppsDashboard'

export const metadata: Metadata = {
    title: `Apps Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Apps Dashboard Admin ReyinStore',
  }

function page() {
  return (
    <div>
      <AppsDashboard />
    </div>
  )
}

export default page