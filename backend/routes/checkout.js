import express from "express";
import Cart from "../models/cartModel.js"; // optional, if you're using cart collection
import Receipt from "../models/receiptModel.js"; // new model for receipts

const router = express.Router();


router.post("/checkout", async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

  
    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const receipt = {
      userId: userId || "guest",
      items: cartItems,
      total,
      timestamp: new Date(),
    };

   
    const newReceipt = await Receipt.create(receipt);


    if (userId) {
      await Cart.deleteMany({ userId });
    }

    res.status(200).json({
      message: "Checkout successful",
      receipt: newReceipt,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
