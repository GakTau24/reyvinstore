import type { Metadata } from 'next'
import FormTrending from '@/components/Dashboard/Trending/FormTrending'

export const metadata: Metadata = {
    title: `Create Trending - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Create Trending ReyvinStore',
    manifest: "/manifest.json",
  }

function page() {
  return (
    <>
        <FormTrending />
    </>
  )
}

export default page