import { connectToMongoDB } from "@/lib/mongodb";
import Carousel from "@/models/carousel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    try {
      await connectToMongoDB();

      const { image } = request.body;
      await Carousel.create({ image });

      response.status(201).json({ message: "Data telah berhasil dibuat!" });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      await connectToMongoDB();

      const carousel = await Carousel.find();
      response.status(200).json({ carousel });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "DELETE") {
    try {
      const { id } = request.query;
      await connectToMongoDB();
      const deletedTrending = await Carousel.findByIdAndDelete(id);

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
