import express from "express";
import Menu from "../models/menu.js";

const router = express.Router();

// all items
router.get("/", async (req, res) => {
  const items = await Menu.find();
  res.json(items);
});

// smart recommendation
router.get("/recommend/:category", async (req, res) => {
  const items = await Menu.find({
    category: req.params.category,
    isPopular: true
  }).limit(4);

  res.json(items);
});

export default router;