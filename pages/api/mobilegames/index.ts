import { connectToMongoDB } from "@/lib/mongodb";
import MobileGames from "@/models/mobilegames";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToMongoDB();

      const { slug, image, title, price } = req.body;
      await MobileGames.create({ slug, image, title, price });

      res.status(201).json({ message: "Data telah berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (req.method === "GET") {
    try {
      await connectToMongoDB();

      const mobileGames = await MobileGames.find();
      res.status(200).json({ mobileGames });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await connectToMongoDB();
      const deletedMobileGames = await MobileGames.findByIdAndDelete(id);

      if (!deletedMobileGames) {
        res.status(404).json({ message: "Data tidak ditemukan!" });
      } else {
        res.status(200).json({ message: "Data telah dihapus!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Kesalahan Server Internal" });
    }
  }
}