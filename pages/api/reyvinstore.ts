import type { NextApiRequest, NextApiResponse } from "next";
import Trending from "@/models/trending";
import MobileGames from "@/models/mobilegames";
import PcGames from "@/models/pcgames";
import Apps from "@/models/apps";
import Voucher from "@/models/voucher";
import { connectToMongoDB } from "@/lib/mongodb";

type Data = {
  slug: string;
  image: string;
  title: string;
  price: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data[]>
) {
  if (request.method === "GET") {
    try {
      await connectToMongoDB();

      const trending = await Trending.find();
      const mobileGames = await MobileGames.find();
      const pcGames = await PcGames.find();
      const apps = await Apps.find();
      const vouchers = await Voucher.find();

      const allData = [
        ...trending.map((item) => ({
          slug: item.slug,
          image: item.image,
          title: item.title,
          price: item.price,
        })),
        ...mobileGames.map((item) => ({
          slug: item.slug,
          image: item.image,
          title: item.title,
          price: item.price,
        })),
        ...pcGames.map((item) => ({
          slug: item.slug,
          image: item.image,
          title: item.title,
          price: item.price,
        })),
        ...apps.map((item) => ({
          slug: item.slug,
          image: item.image,
          title: item.title,
          price: item.price,
        })),
        ...vouchers.map((item) => ({
          slug: item.slug,
          image: item.image,
          title: item.title,
          price: item.price,
        })),
      ];

      response.status(200).json(allData);
    } catch (error) {
      
    }
  }
}
