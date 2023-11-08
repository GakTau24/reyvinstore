"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AlertsCreateTrending from "@/components/Notif/AlertCreateTrending";
import slugify from "slugify";

function FormTrending() {
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const generateSlugFromTitle = (title: string) => {
    return slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  };

  useEffect(() => {
    if (title) {
      const generatedSlug = generateSlugFromTitle(title);
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image || !title || !price) {
      alert("Image, Title dan Price harus diisi!");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trending`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ slug, image, title, price }),
        }
      );
      if (res.ok) {
        setShowAlert(true);
      } else {
        throw new Error("Gagal membuat data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center max-sm:h-1/2 h-screen md:h-screen">
      <div className="w-[40rem] max-sm:w-96">
        <h1 className="text-2xl max-md:text-md font-bold mb-4 max-sm:mt-5 lg:mt-10 text-center">Create Trending</h1>
        {showAlert && (
          <div className="fixed top-16 right-5 max-md:h-10 max-md:right-0">
            <AlertsCreateTrending title={title} />
          </div>
        )}
        <Link href={"/dashboard/admin/trending"}>
        <button className="bg-sky-400 px-5 p-3 rounded-xl mb-3">Back</button>
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="slug"
              className="block mb-2 text-sm font-medium">
              slug
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example-example-example"
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
              type="text"
              required
              readOnly
            />
          </div>
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
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium">
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
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium">
              Price
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none lg:h-48 max-sm:h-60 md:h-96 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
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

export default FormTrending;
