import { connectToMongoDB } from "@/lib/mongodb";
import Trending from "@/models/trending";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import Nextauth from "../auth/[...nextauth]";
import * as https from 'https';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, Nextauth)
  const ipAddress = request.connection.remoteAddress

  
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).json({ error: "Anda belum Login" })
    }
    try {
      await connectToMongoDB();

      const { slug, image, title, price } = request.body;
      await Trending.create({ slug, image, title, price });

      response.status(201).json({ message: "Data telah berhasil dibuat!" });
      
      await sendToDiscord(ipAddress);
    } catch (error) {
      response.status(500).json({ message: "Kesalahan Server Internal" });
    }
  } else if (request.method === "GET") {
    try {
      await connectToMongoDB();

      const trending = await Trending.find();
      response.status(200).json({ trending });
      
      await sendToDiscord(ipAddress);
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

  async function sendToDiscord(ipAddress: any) {
    const webhook = process.env.WEBHOOK
    const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ipAddress}`);
    const data = await res.json();
    const embed = {
      title: "REQUEST",
      description: `
        **IP Address:** ${data.ip}
        **Country:** ${data.country_name}
        **City:** ${data.city}
      `,
      color: 16711680
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    }
    const req = https.request(webhook!, options, (res) => {
      console.log('Discord Webhook response status:', res.statusCode);
    });

    req.write(JSON.stringify({ embeds: [embed] }));
    req.end();
  }
}
