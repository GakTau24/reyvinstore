import mongoose, { Schema } from "mongoose";

const appsSchema = new Schema(
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

const Apps = mongoose.models.Apps || mongoose.model("Apps", appsSchema)

export default Apps