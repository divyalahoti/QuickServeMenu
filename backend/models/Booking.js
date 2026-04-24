import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "active" }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;