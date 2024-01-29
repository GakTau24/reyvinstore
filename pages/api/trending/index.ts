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
  const ip = request.socket.remoteAddress

  const getLocation = async () => {
    const res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`)
    const data = await res.json()
    await sendToDisocrd(data)
    return data
  }
  

  const sendToDisocrd = async (data: any) => {
    const wehookUrl: any = process.env.WEBHOOK
    const payload = {
      "username": "Reyvin Store",
      "avatar_url": "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?ex=6550c9c1&is=653e54c1&hm=23bb7b73327019d5a82078b30b4e0d2bb66c28e6caaecc57d2cffacdab601240&=&width=268&height=379",
      content: "@everyone",
      embeds: [
        {
          title: "Request Data",
          thumbnail: { url: `${data.country_flag}` },
          fields: [
            {
              name: "**Ip Address:**",
              value: `\`\`\`${data.ip}\`\`\``,
              inline: true,
            },
            {
              name: "**Negara:**",
              value: `\`\`\`${data.country_name}\`\`\``,
              inline: true,
            },
            {
              name: "**Kota:**",
              value: `\`\`\`${data.city}\`\`\``,
              inline: true,
            },
            {
              name: "Alamat",
              value: `\`\`\`${data.connection_type ? data.connection_type : data.isp || data.organization}\`\`\``,
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: data.ip,
            icon_url: "https://media.discordapp.net/attachments/987438938966872186/1135192344984043540/REYVN_LOGO.png?ex=6550c9c1&is=653e54c1&hm=23bb7b73327019d5a82078b30b4e0d2bb66c28e6caaecc57d2cffacdab601240&=&width=268&height=379",
          },
          color: 16711680
        }
      ]
    }
    const response = await fetch(wehookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
  }
  
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

      await getLocation()

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