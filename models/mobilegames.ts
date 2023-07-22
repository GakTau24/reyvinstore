import mongoose, { Schema } from "mongoose";

const mobileSchema = new Schema(
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

const MobileGames = mongoose.models.MobileGames || mongoose.model("MobileGames", mobileSchema)

export default MobileGames