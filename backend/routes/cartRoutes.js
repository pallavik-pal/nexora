import express from "express";
import Cart from "../models/cartModel.js";
import axios from "axios";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty) return res.status(400).json({ message: "productId and qty required" });

    
    let existing = await Cart.findOne({ productId, userId: "mockUser123" });
    if (existing) {
      existing.qty += qty;
      await existing.save();
      return res.json(existing);
    }

    const item = await Cart.create({ productId, qty, userId: "mockUser123" });
    res.status(201).json(item);
  } catch (err) {
    console.error("POST /cart error:", err.message);
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});


router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: "mockUser123" });

    const cartWithProducts = await Promise.all(
      cart.map(async (item) => {
        try {
          const { data: product } = await axios.get(
            `https://fakestoreapi.com/products/${item.productId}`
          );
          return { ...item.toObject(), product };
        } catch (err) {
          console.error("Failed to fetch product:", item.productId, err.message);
          return { ...item.toObject(), product: null }; 
        }
      })
    );

    const total = cartWithProducts.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.qty,
      0
    );

    console.log("Cart API response:", { cart: cartWithProducts, total });
    res.json({ cart: cartWithProducts, total });
  } catch (err) {
    console.error(err);
    next(err);
  }
});




router.patch("/:id", async (req, res, next) => {
  try {
    const { qty } = req.body;
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    next(err);
  }
});

export default router;
