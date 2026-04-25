import express from "express";
import {
  createBooking,
  getBookings,
  getAllBookings,
  deleteBooking,
  updateBookingStatus
} from "../controllers/bookingController.js";

const router = express.Router();

// user
router.post("/", createBooking);
router.get("/", getBookings);

// admin
router.get("/all", getAllBookings);
router.put("/:id", updateBookingStatus);
router.delete("/:id", deleteBooking);

export default router;