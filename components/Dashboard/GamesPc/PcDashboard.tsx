"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../Sidebar";
import { useRouter } from "next/navigation";
import Alerts from "@/components/Notif/AlertsDelete";
import Modal from "@/components/Notif/Modals";
import { generateApiKey } from "@/handler/header";

const API_KEY = generateApiKey()

const PcGamesDashboard = () => {
  const [pcGames, setPcGames] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchPcGames = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames`, 
        {
          cache: "no-store",
          headers: {
            "api-key": `${API_KEY}`,
          },
        }
        );
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pcgames?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setShowAlert(true);
        router.refresh()
      }
  };

  const handleDeleteClick = (id: any) => {
    setShowModal(true);
    setDeleteId(id);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-2">
        <h1 className="text-3xl font-bold mb-5">PC Games</h1>
        {showAlert && (
          <div className="fixed top-16 right-5 max-md:h-10 max-md:right-0">
            <Alerts />
          </div>
        )}
        <Link href={"/dashboard/admin/pc-games/create"}>
          <button className="bg-yellow-500 px-5 p-3 rounded-xl my-5">
            Create
          </button>
        </Link>
        {/* Table */}
        <div className="overflow-x-auto max-md:max-h-[33rem] lg:max-h-[33rem]">
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
              {pcGames.map((item, index) => (
                <TableRow key={index} data={item} handleDeleteClick={handleDeleteClick} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleDeleteClick={() => handleDelete(deleteId)}
        />
      )}
    </div>
  );
};

function TableRow({ data, handleDeleteClick }: any) {
  const { _id, slug, image, title, price } = data;

  return (
    <tr>
      <td className="p-2 border-current border-b">{slug}</td>
      {/* <td className="p-2 border-b">{image}</td> */}
      <td className="p-2 border-current border-b">{title}</td>
      {/* <td className="p-2 border-b">{price}</td> */}
      <td className="p-2 border-current border-b">
        <div className="mx-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 max-md:px-4 max-md:my-1 rounded md:mr-2">
            <Link href={`/dashboard/admin/pc-games/edit/${_id}`}>Edit</Link>
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
            onClick={() => handleDeleteClick(_id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default PcGamesDashboard;
