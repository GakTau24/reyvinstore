import type { Metadata } from 'next'
import VoucherDashboard from '@/components/Dashboard/Voucher/VoucherDashboard'

export const metadata: Metadata = {
    title: `Voucher Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Trending Dashboard Admin ReyinStore',
  }

function page() {
  return (
    <>
        <VoucherDashboard />
    </>
  )
}

export default page