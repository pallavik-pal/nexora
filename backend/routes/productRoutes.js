import express from "express";
import axios from "axios";

const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products?limit=12");

   
    const products = data.map((p) => ({
      productId: p.id,     
      name: p.title,
      price: p.price,
      image: p.image,
    }));

    res.json(products);
  } catch (err) {
    console.error("Failed to fetch products:", err.message);
    next(err);
  }
});

export default router;
