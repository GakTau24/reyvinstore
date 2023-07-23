import { connectToMongoDB } from "@/lib/mongodb";
import Trending from "@/models/trending";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "PUT") {
    try {
      const { slug: existingSlug } = request.query;
      const { newSlug, newImage, newTitle, newPrice } = request.body;

      await connectToMongoDB();

      const updatedTrending = await Trending.findOneAndUpdate(
        { slug: existingSlug },
        { slug: newSlug, image: newImage, title: newTitle, price: newPrice },
        { new: true }
      );

      if (!updatedTrending) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }

      return response.status(200).json({ message: "Data berhasil diupdate!", trending: updatedTrending });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const { slug } = request.query; // Menggunakan request.query untuk mendapatkan slug dari URL
      await connectToMongoDB();
      const trending = await Trending.findOne({ slug });
      if (!trending) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ trending });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}
