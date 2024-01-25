import { connectToMongoDB } from "@/lib/mongodb";
import Trending from "@/models/trending";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import Nextauth from "../auth/[...nextauth]";
import { generateApiKey } from "@/handler/header";

const res = generateApiKey()
const API_KEY = `${res}`;

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, Nextauth)
  
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).json({ error: "Anda belum Login" })
    }
    try {
      await connectToMongoDB();

      const { slug, image, title, price } = request.body;
      await Trending.create({ slug, image, title, price });

      response.status(201).json({ message: "Data telah berhasil dibuat!" });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const apiKey = request.headers['api-key'];
      if (!apiKey || apiKey !== API_KEY) {
        return response.status(401).json({ error: "Unauthorized" });
      }

      await connectToMongoDB();
      const trending = await Trending.find();
      response.status(200).json({ trending });
    } catch (error) {
      response.status(500).json({ message: "Internal Server Error" });
    }

  } else if (request.method === "DELETE") {
    if (!session) {
      return response.status(401).json({ error: "Anda belum Login" })
    }
    try {
      const { id } = request.query;
      await connectToMongoDB();
      const deletedTrending = await Trending.findByIdAndDelete(id);

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
