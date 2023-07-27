"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AlertsEditCarousel from "@/components/Notif/AlertEditCarousel";

interface EditFormCarouselProps {
  id: string;
  image: string;
}

export default function EditFormCarousel({
  id,
  image: initialImage,
}: EditFormCarouselProps) {
  const [image, setImage] = useState(initialImage);
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/carousel/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (!res.ok) {
        throw new Error("Failed to update data");
      }

      setShowAlert(true);
    } catch (error) {
      console.error("Error while updating data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[40rem] max-md:w-96">
        <h1 className="text-2xl max-md:text-md font-bold mb-4 max-md:mt-20 text-center">Edit Carousel</h1>
        {showAlert && (
          <div className="fixed top-16 right-5 max-md:h-10 max-md:right-0">
            <AlertsEditCarousel />
          </div>
        )}
        <Link href={"/dashboard/admin/carousel"}>
          <button className="bg-sky-400 px-5 p-3 rounded-xl my-5">Back</button>
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <caption className="caption-top">
            Perhatian!, Link Gambar tidak boleh sama dengan Link yang lama.
          </caption>
          <div>
            <label htmlFor="image" className="block mb-2 text-sm font-medium">
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
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
