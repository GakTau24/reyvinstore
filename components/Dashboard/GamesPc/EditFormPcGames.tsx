"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function EditFormPcGames() {
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter(); // Menggunakan useRouter() untuk mendapatkan router

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!slug || !image || !title || !price) {
      alert("Slug, Image, Title, and Price must be filled!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames/${slug}`, // Gunakan slug yang ada di state sebagai bagian dari URL
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ slug, newImage: image, newTitle: title, newPrice: price }), // Sertakan slug yang ada di state sebagai bagian dari payload
        }
      );
      if (res.ok) {
        router.push("/dashboard/admin/pc-games");
      } else {
        throw new Error("Failed to edit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[40rem]">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Pc Games</h1>
        <Link href={"/dashboard/admin/pc-games"}>
          <button className="bg-sky-400 px-5 p-3 rounded-xl my-5">Back</button>
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="slug" className="block mb-2 text-sm font-medium">
              Slug
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example-example-example"
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
              type="text"
              required
            />
          </div>
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
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium">
              Title
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium">
              Price
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none h-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFormPcGames;
