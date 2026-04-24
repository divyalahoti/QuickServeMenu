import Order from "../models/Order.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL ORDERS (ADMIN)
export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json({ success: true, orders });
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({ success: true, order });
};