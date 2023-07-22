import mongoose, { Schema } from "mongoose";

const trendingSchema = new Schema(
  {
    slug: {
      type: String,
      unique: true,
    },
    image: String,
    title: String,
    price: String,
  },
  {
    timestamps: true,
  }
);

const Trending = mongoose.models.Trending || mongoose.model("Trending", trendingSchema);

export default Trending;
