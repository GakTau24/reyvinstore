import { connectToMongoDB } from "@/lib/mongodb";
import PcGames from "@/models/pcgames";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "PUT") {
    try {
      const { slug: existingSlug } = request.query; // Menggunakan request.query untuk mendapatkan slug dari URL
      const { newSlug, newImage, newTitle, newPrice } = request.body;

      await connectToMongoDB();

      const updatedPcGames = await PcGames.findOneAndUpdate(
        { slug: existingSlug }, // Menggunakan existingSlug untuk mencari data yang akan diubah
        { slug: newSlug, image: newImage, title: newTitle, price: newPrice },
        { new: true }
      );

      if (!updatedPcGames) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }

      return response.status(200).json({ message: "Data berhasil diupdate!", pcgames: updatedPcGames });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const { slug } = request.query; // Menggunakan request.query untuk mendapatkan slug dari URL
      await connectToMongoDB();
      const pcgames = await PcGames.findOne({ slug });
      if (!pcgames) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ pcgames });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}
