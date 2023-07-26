import { connectToMongoDB } from "@/lib/mongodb";
import Voucher from "@/models/voucher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../auth/[...nextauth]";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, Nextauth)
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).json({ error: "Anda belum Login" })
    }
    try {
      await connectToMongoDB();

      const { slug, image, title, price } = request.body;
      await Voucher.create({ slug, image, title, price });

      response.status(201).json({ message: "Data telah berhasil dibuat!" });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      await connectToMongoDB();

      const voucher = await Voucher.find();
      response.status(200).json({ voucher });
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "DELETE") {
    if (!session) {
      return response.status(401).json({ error: "Anda belum Login" })
    }
    try {
      const { id } = request.query;
      await connectToMongoDB();
      const deletedTrending = await Voucher.findByIdAndDelete(id);

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
