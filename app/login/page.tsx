import LoginForm from "@/components/SigninForm/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Login - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: 'Login Page ReyinStore',
}

function page() {
  return (
    <>
        <LoginForm />
    </>
  )
}

export default page