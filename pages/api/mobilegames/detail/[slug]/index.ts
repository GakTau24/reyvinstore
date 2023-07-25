import { connectToMongoDB } from "@/lib/mongodb";
import MobileGames from "@/models/mobilegames";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "GET") {
    try {
      const { slug } = request.query;
      await connectToMongoDB();
      const mobileGame = await MobileGames.findOne({ slug });
      if (!mobileGame) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ mobileGame });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari database:", error);
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}
