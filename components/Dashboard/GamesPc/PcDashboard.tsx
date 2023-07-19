"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../Sidebar";
import { useRouter } from "next/navigation";

const PcGamesDashboard = () => {
  const [pcGames, setPcGames] = useState([]);

  useEffect(() => {
    const fetchPcGames = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error("Data not found!");
        }
        const data = await res.json();
        setPcGames(Array.isArray(data.pcgames) ? data.pcgames : []);
      } catch (error) {
        console.log("Error loading Data:", error);
        setPcGames([]);
      }
    };

    fetchPcGames();
  }, []);

  const router = useRouter();

  const handleDelete = async (id: any) => {
    const remove = confirm("Apakah anda yakin untuk menghapus?");
    if (remove) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        router.refresh()
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-2">
        <h1 className="text-3xl font-bold mb-5">Pc Games</h1>
        <Link href={"/dashboard/admin/pc-games/create"}>
          <button className="bg-sky-400 px-5 p-3 rounded-xl my-5">Create</button>
        </Link>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2 border-b">Slug</th>
                {/* <th className="p-2 border-b">Image</th> */}
                <th className="p-2 border-b">Title</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pcGames.map((item, index) => (
                <TableRow key={index} data={item} handleDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function TableRow({ data, handleDelete }: any) {
  const { _id, slug, image, title, price } = data;

  const handleDeleteClick = () => {
    handleDelete(_id);
  };

  return (
    <tr>
      <td className="p-2 border-b">{slug}</td>
      {/* <td className="p-2 border-b">{image}</td> */}
      <td className="p-2 border-b">{title}</td>
      <td className="p-2 border-b">{price}</td>
      <td className="p-2 border-b">
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
          <Link href={`/dashboard/admin/mobilegames/edit/${_id}`}>Edit</Link>
        </button> */}
        <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded ml-2" onClick={handleDeleteClick}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default PcGamesDashboard;
