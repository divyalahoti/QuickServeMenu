import express from "express";
import {
  createBooking,
  getBookings,
  getAllBookings,
  deleteBooking
} from "../controllers/bookingController.js";

const router = express.Router();

// user
router.post("/", createBooking);
router.get("/", getBookings);

// admin
router.get("/all", getAllBookings);
router.delete("/:id", deleteBooking);

export default router;