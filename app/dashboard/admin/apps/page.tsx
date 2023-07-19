import type { Metadata } from 'next'
import AppsDashboard from '@/components/Dashboard/Apps/AppsDashboard'

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
  }

function page() {
  return (
    <div>
      <AppsDashboard />
    </div>
  )
}

export default page