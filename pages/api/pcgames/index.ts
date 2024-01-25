import { connectToMongoDB } from "@/lib/mongodb";
import PcGames from "@/models/pcgames";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../auth/[...nextauth]";
import { generateApiKey } from "@/handler/header";

const res = generateApiKey()
const API_KEY = `${res}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, Nextauth)
  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ error: "Anda belum Login" })
    }
    try {
      await connectToMongoDB();

      const { slug, image, title, price } = req.body;
      await PcGames.create({ slug, image, title, price });

      res.status(201).json({ message: "Data telah berhasil dibuat!" });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (req.method === "GET") {
    try {
      const apiKey = req.headers['api-key'];
      if (!apiKey || apiKey !== API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      await connectToMongoDB();

      const pcgames = await PcGames.find();
      res.status(200).json({ pcgames });
    } catch (error) {
      res.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ error: "Anda belum Login" })
    }
    try {
      const { id } = req.query;
      await connectToMongoDB();
      const deletedPcGames = await PcGames.findByIdAndDelete(id);

      if (!deletedPcGames) {
        res.status(404).json({ message: "Data tidak ditemukan!" });
      } else {
        res.status(200).json({ message: "Data telah dihapus!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Kesalahan Server Internal" });
    }
  }
}
