import mongoose, { Schema } from "mongoose";

const pcGamesSchema = new Schema(
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
        timestamps: true
    }
)

const PcGames = mongoose.models.PcGames || mongoose.model("PcGames", pcGamesSchema)

export default PcGames