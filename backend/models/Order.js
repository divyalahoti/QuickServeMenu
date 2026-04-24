import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderID: { type: String, default: () => "#GR-" + Math.floor(1000 + Math.random() * 9000) },
    items: [{
        name: String,
        price: Number,
        qty: Number,
        extras: Object // For your Customize.jsx data
    }],
    totalAmount: Number,
    orderType: { type: String, enum: ['EatIn', 'TakeAway'], required: true },
    tableNumber: { type: Number }, // Saved if EatIn
    paymentMethod: String,
    status: { type: String, default: 'Preparing' },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
