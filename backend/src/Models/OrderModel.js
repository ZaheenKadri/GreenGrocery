import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Processing"
  },
  items: [
    {
      name: String,
      qty: Number,
      price: Number
    }
  ],
  total: Number
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);