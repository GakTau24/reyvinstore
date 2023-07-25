import { connectToMongoDB } from "@/lib/mongodb";
import Carousel from "@/models/carousel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "PUT") {
    try {
      const { id } = request.query;
      const { image } = request.body;
      console.log("Received PUT request with ID:", id);
      console.log("Image data:", image);
      await connectToMongoDB();
      await Carousel.findByIdAndUpdate(id, { image });
      console.log("Carousel data updated successfully!");
      return response.status(200).json({ message: "Carousel telah diupdate!" });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengupdate data:", error);
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const { id } = request.query;
      await connectToMongoDB();
      const carousel = await Carousel.findById(id);
      if (!carousel) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ carousel });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari database:", error);
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}