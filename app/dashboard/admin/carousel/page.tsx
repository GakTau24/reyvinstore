import type { Metadata } from 'next'
import CarouselDashboard from '@/components/Dashboard/Carousel/CarouselDashboard'

export const metadata: Metadata = {
    title: `Carousel Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Carousel Dashboard Admin ReyvinStore',
    manifest: "/manifest.json",
  }

function page() {
  return (
    <>
        <CarouselDashboard />
    </>
  )
}

export default page