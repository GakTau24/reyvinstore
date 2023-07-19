import type { Metadata } from 'next'
import FormCarousel from '@/components/Dashboard/Carousel/FormCarousel'

export const metadata: Metadata = {
    title: `Create Carousel - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Create Carousel ReyvinStore',
  }

function page() {
  return (
    <>
        <FormCarousel />
    </>
  )
}

export default page