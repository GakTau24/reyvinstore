import mongoose, { Schema } from "mongoose";

const pcGamesSchema = new Schema(
    {
        slug: String,
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