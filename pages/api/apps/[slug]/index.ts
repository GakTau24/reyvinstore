import { connectToMongoDB } from "@/lib/mongodb";
import Apps from "@/models/apps";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "PUT") {
    try {
      const { slug } = request.query;
      const { newSlug, newImage, newTitle, newPrice } = request.body;

      await connectToMongoDB();

      const updatedApps = await Apps.findOneAndUpdate(
        { slug },
        { slug: newSlug, image: newImage, title: newTitle, price: newPrice },
        { new: true }
      );

      if (!updatedApps) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }

      return response.status(200).json({ message: "Data berhasil diupdate!", Apps: updatedApps });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const { slug } = request.query;
      await connectToMongoDB();
      const apps = await Apps.findOne({ slug });
      if (!apps) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ apps });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}
