import Booking from "../models/Booking.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { tableNumber, date, name, phone } = req.body;

    const existing = await Booking.findOne({
      tableNumber,
      date,
      status: "active"
    });

    if (existing) {
      return res.json({
        success: false,
        message: "Table already booked"
      });
    }

    const booking = await Booking.create(req.body);

    console.log(`📩 Table ${tableNumber} confirmed for ${name}`);

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// GET BOOKINGS (by date)
export const getBookings = async (req, res) => {
  try {
    const { date } = req.query;

    const bookings = await Booking.find({
      date,
      status: "active"
    });

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ✅ GET ALL BOOKINGS (ADMIN)
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json({ success: true, bookings });
};

// ✅ DELETE BOOKING
export const deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};