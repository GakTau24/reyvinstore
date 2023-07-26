import { connectToMongoDB } from "@/lib/mongodb";
import PcGames from "@/models/pcgames";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../../auth/[...nextauth]";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, Nextauth)
  if (request.method === "PUT") {
    if (!session) {
      return response.status(401).json({ error: "Anda belum Login" })
    }
    try {
      const { id } = request.query;
      const { slug, title, image, price } = request.body;

      await connectToMongoDB();
      await PcGames.findByIdAndUpdate(id, { slug, title, image, price });

      return response.status(200).json({ message: "PC Games telah diupdate!" });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengupdate data:", error);
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const { id } = request.query;
      await connectToMongoDB();
      const pcgames = await PcGames.findById(id);
      if (!pcgames) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ pcgames });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari database:", error);
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}