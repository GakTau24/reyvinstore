"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

function FormApps() {
  const [image, setImage] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if(!image) {
      alert("Slug, Image, Title dan Price harus diisi!")
      return
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/carousel`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ image })
      })
      if(res.ok) {
        router.push("/dashboard/admin/apps")
      } else {
        throw new Error("Gagal membuat data")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[40rem]">
        <Link href={"/dashboard/admin/carousel"}>
          <button className="bg-sky-400 px-5 p-3 rounded-xl max-lg:mt-[4em]">Back</button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 mt-2 text-center">
          Create Carousel
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium">
              Image
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://example.com"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              type="text"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormApps;
