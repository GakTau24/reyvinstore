import type { Metadata } from 'next'
import EditFormVoucher from '@/components/Dashboard/Voucher/EditFormVoucher'

export const metadata: Metadata = {
    title: `Dashboard Edit | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: `Dashboard Edit Voucher | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  }

function page() {
  return (
    <>
        <EditFormVoucher />
    </>
  )
}

export default page