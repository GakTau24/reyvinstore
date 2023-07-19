import { connectToMongoDB } from "@/lib/mongodb";
import Apps from "@/models/apps";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      await connectToMongoDB();

      const { slug, image, title, price } = request.body;
      await Apps.create({ slug, image, title, price });

      response.status(201).json({ message: "Data telah berhasil dibuat!" });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      await connectToMongoDB();

      const apps = await Apps.find();
      response.status(200).json({ apps });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "DELETE") {
    try {
      const { id } = request.query;
      await connectToMongoDB();
      const deletedTrending = await Apps.findByIdAndDelete(id);

      if (!deletedTrending) {
        response.status(404).json({ message: "Data tidak ditemukan!" });
      } else {
        response.status(200).json({ message: "Data telah dihapus!" });
      }
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  }
}
