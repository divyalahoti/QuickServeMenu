import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

// create order
router.post("/", createOrder);

// admin
router.get("/", getOrders);
router.put("/:id", updateOrderStatus);

export default router;