
import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  userId: String,
  items: [{ productId: String, name: String, price: Number, qty: Number }],
  total: Number,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Receipt", receiptSchema);
