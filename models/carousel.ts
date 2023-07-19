import mongoose, { Schema } from "mongoose";

const carouselSchema = new Schema(
    {
        image: String,
    },
    {
        timestamps: true
    }
)

const Carousel = mongoose.models.Carousel || mongoose.model("Carousel", carouselSchema)

export default Carousel