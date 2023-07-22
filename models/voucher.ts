import mongoose, { Schema } from "mongoose";

const voucherSchema = new Schema(
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

const Voucher = mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema)

export default Voucher