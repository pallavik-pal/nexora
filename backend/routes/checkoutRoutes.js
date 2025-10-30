import express from "express";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

const router = express.Router();


router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;


    const user = await User.create({ name, email });

   
    const cart = await Cart.find().populate("productId");

    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cart.reduce((sum, item) => sum + item.productId.price * item.qty, 0);

   
    const receipt = {
      user,
      total,
      timestamp: new Date().toISOString(),
    };

    await Cart.deleteMany();

    res.json({ message: "Checkout successful", receipt });
  } catch (err) {
    next(err);
  }
});

export default router;
