import { connectToMongoDB } from "@/lib/mongodb";
import Apps from "@/models/apps";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
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
      await Apps.create({ slug, image, title, price });

      response.status(201).json({ message: "Data telah berhasil dibuat!" });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    const apiKey = request.headers['api-key'];
      if (!apiKey || apiKey !== API_KEY) {
        return response.status(401).json({ error: "Unauthorized" });
      }
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
