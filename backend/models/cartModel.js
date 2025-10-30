import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: String, required: true }, // store FakeStore product ID
  qty: { type: Number, required: true, default: 1 },
  userId: { type: String, default: "mockUser123" },
});

export default mongoose.model("Cart", cartSchema);
