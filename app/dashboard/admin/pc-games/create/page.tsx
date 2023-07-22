import type { Metadata } from 'next'
import FormPcGames from '@/components/Dashboard/GamesPc/FormPcGames'

export const metadata: Metadata = {
    title: `Create Pc Games - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: 'Create Pc Games ReyvinStore',
    manifest: "/manifest.json",
  }

function page() {
  return (
    <div>
      <FormPcGames />
    </div>
  )
}

export default page