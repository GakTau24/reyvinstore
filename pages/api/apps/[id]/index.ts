import { connectToMongoDB } from "@/lib/mongodb";
import Apps from "@/models/apps";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "PUT") {
    try {
      const { id } = request.query;
      const { slug, title, image, price } = request.body;

      await connectToMongoDB();
      await Apps.findByIdAndUpdate(id, { slug, title, image, price });

      return response.status(200).json({ message: "Apps telah diupdate!" });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengupdate data:", error);
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const { id } = request.query;
      await connectToMongoDB();
      const apps = await Apps.findById(id);
      if (!apps) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ apps });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari database:", error);
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}