"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../Sidebar";
import { useRouter } from "next/navigation";

const TrendingDashboard = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trending`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error("Data not found!");
        }
        const data = await res.json();
        setTrending(Array.isArray(data.trending) ? data.trending : []);
      } catch (error) {
        console.log("Error loading Data:", error);
        setTrending([]);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-2">
        <h1 className="text-3xl font-bold mb-5">Trending</h1>
        <Link href={"/dashboard/admin/trending/create"}>
          <button className="bg-sky-400 px-5 p-3 rounded-xl my-5">Create</button>
        </Link>
        {/* Table */}
        <div className="overflow-x-auto max-md:max-h-[33rem]">
          <table className="w-full table-auto max-md:table-fixed border-collapse">
            <thead>
              <tr className="dark:bg-gray-800 dark:text-slate-300">
                <th className="p-2 border-b">Slug</th>
                {/* <th className="p-2 border-b">Image</th> */}
                <th className="p-2 border-b">Title</th>
                {/* <th className="p-2 border-b">Price</th> */}
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trending.map((item, index) => (
                <TableRow key={index} data={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function TableRow({ data }: any) {
  const { _id, slug, image, title, price } = data;
  const router = useRouter()

  const handleDelete = async () => {
    const remove = confirm("Apakah anda yakin untuk menghapus?");
    if (remove) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trending?id=${_id}`, {
        method: "DELETE"
      });
      if(res.ok) {
        router.refresh()
      }
    }
  };
  

  return (
    <tr>
      <td className="p-2 border-current border-b">{slug}</td>
      {/* <td className="p-2 border-b">{image}</td> */}
      <td className="p-2 border-current border-b">{title}</td>
      {/* <td className="p-2 border-b">{price}</td> */}
      <td className="p-2 border-current border-b">
        <div className="mx-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 max-md:px-5 rounded md:mr-2">
          <Link href={`/dashboard/admin/trending/edit/${_id}`}>Edit</Link>
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded" onClick={handleDelete}>
          Delete
        </button>
        </div>
      </td>
    </tr>
  );
}

export default TrendingDashboard;
