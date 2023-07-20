import type { Metadata } from 'next'
import FormVoucher from '@/components/Dashboard/Voucher/FormVoucher'

export const metadata: Metadata = {
    title: `Create Voucher - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Create Voucher ReyvinStore',
  }

function page() {
  return (
    <div>
      <FormVoucher />
    </div>
  )
}

export default page