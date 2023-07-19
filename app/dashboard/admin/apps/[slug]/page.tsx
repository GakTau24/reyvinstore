import type { Metadata } from 'next'
import FormApps from '@/components/Dashboard/Apps/FormApps'

export const metadata: Metadata = {
    title: 'Create Dashboard - Reyvin Store',
    description: 'Generated by create next app',
  }

function page() {
  return (
    <div>
      <FormApps />
    </div>
  )
}

export default page