import { connectToMongoDB } from "@/lib/mongodb";
import Voucher from "@/models/voucher";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "PUT") {
    try {
      const { slug } = request.query;
      const { newSlug, newImage, newTitle, newPrice } = request.body;

      await connectToMongoDB();

      const updatedVoucher = await Voucher.findOneAndUpdate(
        { slug },
        { slug: newSlug, image: newImage, title: newTitle, price: newPrice },
        { new: true }
      );

      if (!updatedVoucher) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }

      return response.status(200).json({ message: "Data berhasil diupdate!", voucher: updatedVoucher });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      const { slug } = request.query;
      await connectToMongoDB();
      const voucher = await Voucher.findOne({ slug });
      if (!voucher) {
        return response.status(404).json({ message: "Data tidak ditemukan" });
      }
      return response.status(200).json({ voucher });
    } catch (error) {
      return response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else {
    return response.status(405).json({ message: "Metode Tidak Diizinkan" });
  }
}
