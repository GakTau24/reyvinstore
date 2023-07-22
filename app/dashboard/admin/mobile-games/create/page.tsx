import type { Metadata } from 'next'
import FormMobile from '@/components/Dashboard/Mobile/FormMobile'

export const metadata: Metadata = {
    title: `Create Mobile Games - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Create Mobile Games ReyvinStore',
    manifest: "/manifest.json",
  }

function page() {
  return (
    <div>
      <FormMobile />
    </div>
  )
}

export default page